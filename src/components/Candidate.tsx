import React, { FC } from 'react'
import { ICandidate } from '../lib/type'

interface CandidateProps {
  candidate: ICandidate
}

export const Candidate: FC<CandidateProps> = ({candidate}) => {
  const {id, name, description, imageName} = candidate
  return (
    <>
      <label htmlFor={name + id} className="block mt-4 first:mt-0 relative">
        <input
          type="radio"
          id={name + id}
          name="candidate"
          value="lee"
          className="peer invisible absolute"
        />
        <figure className="flex items-center rounded-xl p-4 bg-blue-500 bg-opacity-20 peer-checked:border-2 border-white-100 h-32 hover:cursor-pointer hover:border-indigo-50 border border-transparent transition-all duration-300">
          <img className="w-24 h-24 rounded-full" src={`images/${imageName}`} alt="" />
          <div className="pl-6 space-y-2">
            <blockquote>
              <p className="text-sm text-white leading-4">
                {description}
              </p>
            </blockquote>
            <figcaption>
              <div className="text-sm font-bold text-blue-400">{name}</div>
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
