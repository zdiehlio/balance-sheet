const mongoose = require('mongoose').set('debug', true)
require('../models/Record')

const getRecords = async (req, res) => {
  const { Record } = mongoose.models
  try {
    const records = await Record.find({})
    const total = records.reduce((acc, doc) => doc.balance + acc, 0)
    res.status(200).send({ records, total })
  } catch (error) {
    res
      .status(500)
      .send({ error, result: 'Something went wrong with our server' })
  }
}

const createRecord = async (req, res) => {
  const { Record } = mongoose.models
  try {
    const record = await Record.create(req.body)
    res.status(200).send({ success: true, result: record })
  } catch (error) {
    res
      .status(500)
      .send({ error, result: 'Something went wrong with our server' })
  }
}

const updateRecord = async (req, res) => {
  const { Record } = mongoose.models
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).exec()
    res.status(200).send({ success: true, result: record })
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
    await Record.findByIdAndDelete(id)
    res
      .status(200)
      .send({ success: true, result: `${id} deleted successfully` })
  } catch (error) {
    res
      .status(500)
      .send({ error, result: 'Something went wrong with our server' })
  }
}

module.exports = { getRecords, createRecord, updateRecord, deleteRecord }
