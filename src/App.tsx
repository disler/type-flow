import { useEffect, useState } from 'react'
import './App.css'
import useApp from "./hooks/useApp"
import { TypeFlow } from './components/TypeFlow'
import useWords from './hooks/useWords'
import { Provider } from 'jotai'



function App() {

  return (
    <Provider>
      <div className="App">
        <div style={{fontSize: "200px"}}>
          ⌨️
        </div>
        <h1>TypeFlow</h1>

        <TypeFlow />
      </div>
    </Provider>
  )
}

export default App
