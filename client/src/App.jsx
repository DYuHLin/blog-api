import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import login from "./Pages/login"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element = {<login/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
