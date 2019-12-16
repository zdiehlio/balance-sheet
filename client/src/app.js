import React from 'react'
import ReactDOM from 'react-dom'

import BalanceSheet from './BalanceSheet'

const App = () => {
  return (
    <div>
      <BalanceSheet />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
