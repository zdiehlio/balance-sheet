import React, { useState } from 'react'

import Record from './Record'
import EntryForm from '../Shared/EntryForm'

const RecordTable = ({
  records,
  handleDelete,
  handleCreate,
  handleUpdate,
  toggleEdit,
  editing,
  total
}) => {
  return (
    <div className='table'>
      <div className='table-row'>
        <h3>Name</h3>
        <h3>Type</h3>
        <h3>Balance</h3>
      </div>
      {records.map(entry => {
        return (
          <Record
            entry={entry}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            key={entry._id}
            toggleEdit={toggleEdit}
            editing={editing}
          />
        )
      })}
      <div className='table-row'>
        <span>Total</span>
        <span></span>
        <span>{total}</span>
      </div>
      <h3>Add New Asset or Liablity</h3>
      <EntryForm type='Add' handleSubmit={handleCreate} />
    </div>
  )
}

export default RecordTable
