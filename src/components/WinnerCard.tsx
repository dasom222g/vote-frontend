import React, { FC, useEffect } from 'react'
import { ICountItem } from '../lib/type'
// import { ethers } from 'ethers'
// import { Candidate } from '../components/Candidate'
// import { votingContract } from '../web3Config'

interface WinnerCardProps {
  winnerList: ICountItem[]
  path: string
  // account: string
}

export const WinnerCard: FC<WinnerCardProps> = ({ winnerList, path }) => {
  const ptFullStyle = { paddingTop: '100%' }
  const bgStyle = { backgroundImage: 'url(/images/winner-bg.png)' }
  const trophyStyle = { backgroundImage: 'url(/images/trophy.png)' }

  useEffect(() => {
    console.log('path', path)
  }, [path])

  // view
  return (
    <div>
      {path === '/complete' && (
        <div className="w-4/5 fixed -right-12 -top-14 transform rotate-12 mix-blend-hard-light">
          <img src="./images/wing2.png" alt="" className="w-full h-auto" />
        </div>
      )}
      <div
        className="rounded-xl bg-indigo-800 w-full mt-9 h-0 shadow-xl relative overflow-hidden"
        style={ptFullStyle}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 text-opacity-20">
          <div
            className="bg-cover bg-no-repeat bg-bottom h-2/5 flex flex-col justify-center mix-blend-hard-light"
            style={bgStyle}
          >
            <i
              style={trophyStyle}
              className="bg-contain bg-no-repeat w-14 h-20 block mx-auto"
            />
            <p className="text-center font-mono text-white font-bold">
              Artist Of Your Choice
            </p>
          </div>
          <div className="h-3/5 px-1 py-4 flex items-end justify-center -mx-1">
            {winnerList.map((item, index) => (
              <div
                className={`px-2 text-center order-${
                  index === 0 ? '2' : index === 1 ? '1' : '3'
                }`}
                key={item.id}
              >
                <div
                  className={`bg-purple-400 rounded-full overflow-hidden w-4/5 mx-auto ${
                    !index && 'transform scale-150 origin-bottom'
                  }`}
                >
                  <img src={`./images/${item.imageName!}`} alt="iu" />
                </div>
                <span className="block text-xs text-blue-400 mt-2">
                  {item.name}
                </span>
                <span className="block text-lg text-white font-bold">
                  {item.count}
                </span>
              </div>
            ))}
            {/* <div className="px-2 text-center">
              <img src="./images/bts.png" alt="bts" className="rounded-full w-4/5 mx-auto" />
              <span className="block text-xs text-blue-400 mt-2">BTS</span>
              <span className="block text-lg text-white font-bold">800</span>
            </div>
            <div className="px-2 text-center">
              <img src="./images/spa.png" alt="spa" className="rounded-full w-4/5 mx-auto" />
              <span className="block text-xs text-blue-400 mt-2">BTS</span>
              <span className="block text-lg text-white font-bold">700</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
