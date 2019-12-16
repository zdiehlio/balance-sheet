import React, { useState } from 'react'
import EntryForm from '../Shared/EntryForm'

const Record = ({ entry, handleDelete, handleUpdate, toggleEdit, editing }) => {
  return (
    <div id={entry._id}>
      {editing === entry._id ? (
        <>
          <EntryForm type='Update' entry={entry} handleSubmit={handleUpdate} />
          <span>
            <button>Canncel</button>
          </span>
        </>
      ) : (
        <div className='table-row'>
          <span>{entry.name}</span>
          <span>{entry.type}</span>
          <span>{entry.balance}</span>
          <span>
            <button onClick={() => handleDelete(entry._id)}>Delete</button>
          </span>
          <span>
            <button onClick={() => toggleEdit(entry._id)}>Edit</button>
          </span>
        </div>
      )}
    </div>
  )
}

export default Record
