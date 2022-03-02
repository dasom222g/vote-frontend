import React, { FC } from 'react'
import { ICandidate } from '../lib/type'

interface CandidateProps {
  candidate: ICandidate
}

export const Candidate: FC<CandidateProps> = ({candidate}) => {
  const {name, description} = candidate
  return (
    <>
      <label htmlFor="lee" className="block mt-4 first:mt-0">
        <input
          type="radio"
          id="lee"
          name="candidate"
          value="lee"
          className="peer invisible absolute"
        />
        <figure className="flex items-center rounded-xl p-4 bg-slate-100/10 border-slate-100/60 peer-checked:border-2 border-white-100 transition-all h-32 hover:cursor-pointer">
          <img className="w-24 h-24 rounded-full" src="images/lee.png" alt="" />
          <div className="pl-6 space-y-2">
            <blockquote>
              <p className="text-sm text-white leading-4">
                {description}
              </p>
            </blockquote>
            <figcaption>
              <div className="text-sm font-bold text-sky-200">{name}</div>
              {/* <div className="text-slate-300">
                득표수: ??
              </div> */}
            </figcaption>
          </div>
        </figure>
      </label>
    </>
  )
}
