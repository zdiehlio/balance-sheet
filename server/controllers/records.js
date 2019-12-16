const mongoose = require('mongoose').set('debug', true)
require('../models/Record')

const getRecords = async (req, res) => {
  const { Record } = mongoose.models
  try {
    const records = await Record.find({})
    const balanceDiff = records.reduce((acc, doc) => {
      return acc + doc.balance
    }, 0)
    res.status(200).send({ success: true, result: records, balanceDiff })
  } catch (error) {
    res
      .status(500)
      .send({ error, result: 'Something went wrong with our server' })
  }
}

const createRecord = async (req, res) => {
  const { Record } = mongoose.models
  try {
    const { body } = req
    const balanceDiff = calculateBalanceDiff(body)
    body.balance = balanceDiff
    const record = await Record.create(req.body)
    res.status(200).send({ success: true, result: record, balanceDiff })
  } catch (error) {
    res
      .status(500)
      .send({ error, result: 'Something went wrong with our server' })
  }
}

const updateRecord = async (req, res) => {
  const { Record } = mongoose.models
  try {
    const { body } = req
    const balanceDiff = calculateBalanceDiff(body)
    const record = await Record.findByIdAndUpdate(req.params.id, body, {
      new: true
    })
    body.balance = balanceDiff
    res.status(200).send({ success: true, result: record, balanceDiff })
  } catch (error) {
    res
      .status(500)
      .send({ error, result: 'Something went wrong with our server' })
  }
}

const deleteRecord = async (req, res) => {
  const { Record } = mongoose.models
  try {
    const { id } = req.params
    const record = await Record.findByIdAndDelete(id).exec()
    const balanceDiff = calculateBalanceDiff(record)
    res.status(200).send({
      success: true,
      result: `${record} deleted successfully`,
      balanceDiff
    })
  } catch (error) {
    res
      .status(500)
      .send({ error, result: 'Something went wrong with our server' })
  }
}

const calculateBalanceDiff = doc => {
  return doc.type === 'Liability' && Math.sign(doc.balance) > 0
    ? doc.balance * -1
    : doc.balance
}

module.exports = { getRecords, createRecord, updateRecord, deleteRecord }
