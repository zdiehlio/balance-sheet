import React, { useState } from 'react'

const EntryForm = ({ handleSubmit, type, entry = {} }) => {
  const [nameState, setNameState] = useState(entry.name || '')
  const [typeState, setTypeState] = useState(entry.type || '')
  const [balanceState, setBalanceState] = useState(entry.balance || '')

  return (
    <form
      onSubmit={() => {
        setBalanceState('')
        setNameState('')
        setTypeState('')
        handleSubmit(
          event,
          {
            type: typeState,
            name: nameState,
            balance: parseInt(balanceState)
          },
          entry._id || null
        )
      }}
      className='table-row'
    >
      <select
        required
        onChange={() => setTypeState(event.target.value)}
        value={typeState}
        name='type'
      >
        <option></option>
        <option>Asset</option>
        <option>Liability</option>
      </select>
      <input
        required
        onChange={() => setNameState(event.target.value)}
        name='name'
        value={nameState}
        placeholder='name'
      />
      <input
        required
        onChange={() => setBalanceState(event.target.value)}
        type='number'
        name='balance'
        value={balanceState}
        placeholder='balance'
      />
      <button type='submit'>{type}</button>
    </form>
  )
}

export default EntryForm
