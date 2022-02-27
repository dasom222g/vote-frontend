import React, { FC, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './routes/main'

const App: FC = () => {

  useEffect(() => {
    console.log('render!!')
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
