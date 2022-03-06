import React, { FC } from 'react'
import { ICandidate } from '../lib/type'

interface CandidateProps {
  candidate: ICandidate
  selectCandidate: (id: number, item: ICandidate) => void
}

export const Candidate: FC<CandidateProps> = ({candidate, selectCandidate}) => {
  const {id, name, description, imageName} = candidate

  // view
  return (
    <>
      <label htmlFor={name + id} className="block relative first:pt-px">
        <input
          type="radio"
          id={name + id}
          name="candidate"
          value="lee"
          className="invisible absolute"
          onChange={() => id && selectCandidate(id, candidate)}
        />
        <figure className="flex items-center rounded-xl p-4 border-white-100 h-32 bg-white bg-opacity-0 border border-opacity-0  peer-checked:bg-opacity-20 hover:cursor-pointer transition-all duration-300">
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
        <i className="h-px absolute left-4 right-4 bottom-0 bg-white bg-opacity-30 block peer-checked:bg-transparent" />
      </label>
    </>
  )
}
