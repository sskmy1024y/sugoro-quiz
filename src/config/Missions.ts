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
    mission: "3Qで一番、もしくは今年で一番、感情が動いた仕事のエピソードを教えて（一人ずつ話してね）",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60 * 5,
  },
  {
    id: 'mission2',
    mission: "早口言葉を順番に言っていけ！",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60 * 3,
  },
  {
    id: 'mission3',
    mission: "一人ずつ上長（あるいはチームメンバー）の紹介をカタカナ語禁止で話せ！",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60 * 5,
  },
  {
    id: 'mission4',
    mission: "今年一番の感謝を伝えたい人は？（一人ずつ話してね）",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60 * 5,
  },
  {
    id: 'mission5',
    mission: "一人ずつ、今年一番の成功を話してね",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60 * 5,
  },
  {
    id: 'mission6',
    mission: "一人ずつ、今年一番のハッピーを話してね",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60 * 5,
  },
  {
    id: 'mission7',
    mission: "一人ずつ地元紹介選手権。故郷の魅力をプレゼンしろ！",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60 * 5,
  },
  {
    id: 'mission8',
    mission: "一発芸、一番面白かった人に投票！",
    rule: MissionRule.VoteTo1,
    timeout: 30,
  }
]

export const ALL_MISSIONS = [...FORCE_MISSIONS, ...MISSIONS];
