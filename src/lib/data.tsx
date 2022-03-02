import { ethers } from 'ethers'
import { ICandidate } from './type'

const candidate1: ICandidate = {
  name: ethers.utils.formatBytes32String('방탄소년단(BTS)'),
  description: ethers.utils.formatBytes32String('Songs: Butter, Dy,namite'),
  imageName: ethers.utils.formatBytes32String('bts.png')
}
const candidate2: ICandidate = {
  name: ethers.utils.formatBytes32String('아이유'),
  description: ethers.utils.formatBytes32String('Songs: 잔소리, 밤편지'),
  imageName: ethers.utils.formatBytes32String('iu.png')
}
const candidate3: ICandidate = {
  name: ethers.utils.formatBytes32String('블랙핑크'),
  description: ethers.utils.formatBytes32String('Songs: STAY, How You Like That'),
  imageName: ethers.utils.formatBytes32String('blackpink.png')
}
const candidate4: ICandidate = {
  name: ethers.utils.formatBytes32String('이무진'),
  description: ethers.utils.formatBytes32String('Songs: 산책, 신호등'),
  imageName: ethers.utils.formatBytes32String('leemujin.png')
}
const candidate5: ICandidate = {
  name: ethers.utils.formatBytes32String('임영웅'),
  description: ethers.utils.formatBytes32String('Songs: 미워요, HERO'),
  imageName: ethers.utils.formatBytes32String('leemhero.png')
}
const candidate6: ICandidate = {
  name: ethers.utils.formatBytes32String('에스파'),
  description: ethers.utils.formatBytes32String('Songs: Next Level, Savage'),
  imageName: ethers.utils.formatBytes32String('spa.png')
}
const candidate7: ICandidate = {
  name: ethers.utils.formatBytes32String('트와이스'),
  description: ethers.utils.formatBytes32String('Songs: TT, Signal, Yes or Yes'),
  imageName: ethers.utils.formatBytes32String('twice.png')
}
const candidate8: ICandidate = {
  name: ethers.utils.formatBytes32String('악뮤(AKMU)'),
  description: ethers.utils.formatBytes32String('Songs: 라면인건가, Galaxy'),
  imageName: ethers.utils.formatBytes32String('akmu.png')
}
const candidate9: ICandidate = {
  name: ethers.utils.formatBytes32String('태연'),
  description: ethers.utils.formatBytes32String('Songs: 만약에, I, Rain'),
  imageName: ethers.utils.formatBytes32String('taeyeon.png')
}
const candidate10: ICandidate = {
  name: ethers.utils.formatBytes32String('브레이브걸스'),
  description: ethers.utils.formatBytes32String(`Songs: Rollin', 운전만해`),
  imageName: ethers.utils.formatBytes32String('brave.png')
}

export const candidateList: ICandidate[] = [
  candidate1,
  candidate2,
  candidate3,
  candidate4,
  candidate5,
  candidate6,
  candidate7,
  candidate8,
  candidate9,
  candidate10,
]
