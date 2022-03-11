export interface IVotingCadidates {
  candidate: string,
  count: number
}

export interface ICandidate {
  id?: number
  name: string
  description: string
  imageName: string
}

export interface ICandidateNoId {
  name: string
  subText: string
  description: string
  imageName: string
}

export interface ICountItem {
  id: number
  name: string
  imageName?: string
  count: number
}
