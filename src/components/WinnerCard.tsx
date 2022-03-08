import React, { FC } from 'react'
// import { ethers } from 'ethers'
// import { Candidate } from '../components/Candidate'
// import { votingContract } from '../web3Config'

interface WinnerCardProps {
  // account: string
}

export const WinnerCard: FC<WinnerCardProps> = () => {
  const ptFullStyle = { paddingTop: '100%' }
  const bgStyle = { backgroundImage: 'url(/images/winner-bg.png)'}
  const iconStyle = { backgroundImage: 'url(/images/trophy.png)'}

  // view
  return (
    <div className="rounded-xl bg-indigo-800 w-full h-0 pt-px relative overflow-hidden" style={ptFullStyle}>
      <div className="absolute top-0 bottom-0 left-0 right-0 text-opacity-20">
        <div className="bg-cover bg-no-repeat bg-bottom h-2/5 flex flex-col justify-center" style={bgStyle}>
          <i style={iconStyle} className="bg-contain bg-no-repeat w-14 h-20 block mx-auto" />
          {/* <img src="/images/trophy.png" alt="트로피 이미지" className="w-14 h-auto" /> */}
          <p className="text-center font-mono text-white font-bold">Artist Of Your Choice</p>
        </div>
        <div className="h-3/5 px-1 py-4 flex items-end justify-center -mx-1">
          <div className="px-2 text-center order-2">
            <img src="./images/iu.png" alt="iu" className="rounded-full w-4/5 mx-auto transform scale-150 origin-bottom" />
            <span className="block text-xs text-blue-400 mt-2">BTS</span>
            <span className="block text-lg text-white font-bold">1000</span>
          </div>
          <div className="px-2 text-center order-1">
            <img src="./images/bts.png" alt="bts" className="rounded-full w-4/5 mx-auto" />
            <span className="block text-xs text-blue-400 mt-2">BTS</span>
            <span className="block text-lg text-white font-bold">800</span>
          </div>
          <div className="px-2 text-center order-3">
            <img src="./images/spa.png" alt="spa" className="rounded-full w-4/5 mx-auto" />
            <span className="block text-xs text-blue-400 mt-2">BTS</span>
            <span className="block text-lg text-white font-bold">700</span>
          </div>
        </div>
      </div>
    </div>
  )
}

