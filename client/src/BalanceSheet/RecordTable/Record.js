import React, { useState } from 'react'
import EntryForm from '../Shared/EntryForm'

const Record = ({ entry, handleDelete, handleUpdate, toggleEdit, editing }) => {
  return (
    <div id={entry._id}>
      {editing === entry._id ? (
        <>
          <EntryForm
            type='Update'
            entry={entry}
            handleCancel={toggleEdit}
            handleSubmit={handleUpdate}
          />
        </>
      ) : (
        <div className='table-row'>
          <span className={entry.type === 'Liability' ? 'red' : 'green'}>
            {entry.name}
          </span>
          <span className={entry.type === 'Liability' ? 'red' : 'green'}>
            {entry.type}
          </span>
          <span className={entry.type === 'Liability' ? 'red' : 'green'}>
            {entry.balance}
          </span>
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
