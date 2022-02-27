import React, { FC } from 'react'

export const Candidate: FC = () => {
  return (
    <>
      <label htmlFor="lee">
        <input
          type="radio"
          id="lee"
          name="candidate"
          value="lee"
          className="peer"
        />
        <figure className="flex items-center rounded-xl p-4 mt-4 bg-slate-100/10 border-slate-100/60 peer-checked:border-2 border-white-100 transition-all h-32 hover:cursor-pointer">
          <img className="w-24 h-24 rounded-full" src="images/lee.png" alt="" />
          <div className="pl-6 space-y-2">
            <blockquote>
              <p className="text-base text-white leading-5">
                “국민의 요구를 듣고 실천하는 것 이것이 이재명의
                경제대통령입니다.”
              </p>
            </blockquote>
            <figcaption>
              <div className="text-sm font-bold text-sky-200">이재명</div>
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
