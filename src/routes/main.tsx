import React, { FC } from 'react'
import { Candidate } from '../components/Candidate'

const Main: FC = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full p-4">
        <Candidate />
      </div>
    </>
  )
}

export default Main
