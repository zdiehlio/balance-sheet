import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const handleSubmit = () => axios.get('http://localhost:5000/')

  return (
    <div>
      <button onClick={() => handleSubmit()}></button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
