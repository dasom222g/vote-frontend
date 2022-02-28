import React, { FC } from 'react'
import { Candidate } from '../components/Candidate'

const Main: FC = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-700 to-purple-700 h-full p-4 flex flex-col">
        <h1 className="text-slate-100 text-lg font-bold py-2 pb-4">Vote the Winner</h1>
        <div className="h-full overflow-auto">
          <Candidate />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-2 mt-auto"
          >
            Vote
          </button>
        </div>
      </div>
    </>
  )
}

export default Main
