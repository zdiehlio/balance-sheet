import React, { useState, useEffect } from 'react'
import axios from 'axios'

import RecordTable from './RecordTable'

import './index.css'

const BalanceSheet = () => {
  const [recordsState, setRecordsState] = useState([])
  const [editingState, setEditingState] = useState(false)
  const [totalState, setTotalState] = useState()

  const api_url = process.env.API_URL || 'http://localhost:5000'

  useEffect(() => {
    const getRecords = () => {
      return axios
        .get(api_url)
        .then(res => {
          setRecordsState(res.data.result)
          setTotalState(res.data.balanceDiff)
        })
        .catch(error =>
          console.error({ error, message: 'records could not be retrieved' })
        )
    }
    getRecords()
  }, [])

  const handleCreate = (event, entry) => {
    event.preventDefault()
    console.log(entry)
    axios
      .post(api_url, entry)
      .then(res => {
        setRecordsState(recordsState.concat(res.data.result))
        setTotalState(totalState + res.data.balanceDiff)
      })
      .catch(error =>
        console.error({ error, message: 'record could not be created' })
      )
  }

  const handleUpdate = (event, entry, id) => {
    event.preventDefault()
    axios
      .put(`${api_url}/${id}`, entry)
      .then(res => {
        const copyRecords = [...recordsState]
        const recordToUpdate = copyRecords.findIndex(entry => entry._id === id)
        copyRecords[recordToUpdate] = res.data.result
        setRecordsState(copyRecords)
        setTotalState(totalState + res.data.balanceDiff)
      })
      .catch(error =>
        console.error({ error, message: 'record could not be updated' })
      )
    setEditingState(false)
  }

  const handleDelete = id => {
    axios
      .delete(`${api_url}/${id}`)
      .then(res => {
        setRecordsState(recordsState.filter(entry => entry._id !== id))
        setTotalState(totalState - res.data.balanceDiff)
      })
      .catch(error =>
        console.error({ error, message: 'record could not be deleted' })
      )
  }
  return (
    <div>
      <RecordTable
        records={recordsState}
        handleDelete={handleDelete}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        toggleEdit={id => setEditingState(id)}
        editing={editingState}
        total={totalState}
      />
    </div>
  )
}

export default BalanceSheet
