import React from 'react'
import ReactDOM from 'react-dom'
import { MoralisProvider } from 'react-moralis'
import 'tailwindcss/tailwind.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const appId = 'P2qbmbZ0vnsYI9ipGvZhK510VJs8UVZyh7wSHJKp'
const serverUrl = 'https://xowcffi7vsce.usemoralis.com:2053/server'

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
