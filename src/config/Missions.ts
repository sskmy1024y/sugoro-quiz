import {Mission, MissionRule} from "models/Mission";

export const FORCE_MISSIONS: Mission[] = [
  {
    id: 'math_mission1',
    mission: "普段家族に言わないけれど…",
    rule: MissionRule.VoteTo1YN,
    timeout: 60 * 3,
  },
  {
    id: 'math_mission2',
    mission: "英語（カタカナ用語）禁止でUniposを紹介しろ！",
    rule: MissionRule.VoteTo1YN,
    timeout: 60 * 3,
  },
  {
    id: 'math_mission3',
    mission: "20秒瞬きしちゃダメ！",
    rule: MissionRule.VoteTo1YN,
    timeout: 20,
  },
  {
    id: 'math_mission4',
    mission: "山手線渋谷駅から新宿駅までの駅名を言え！",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission5',
    mission: "先月のカード請求額をいえ！",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  }
];


export const MISSIONS: Mission[] = [
  {
    id: 'mission1',
    mission: "3Qで一番、もしくは今年で一番、感情が動いた仕事のエピソードを教えて",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60 * 5,
  },
  {
    id: 'mission2',
    mission: "早口言葉を順番に言っていけ！",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60 * 3,
  },
]

export const ALL_MISSIONS = [...FORCE_MISSIONS, ...MISSIONS];
