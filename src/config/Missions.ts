import {Mission, MissionRule} from "models/Mission";

export const MISSIONS: Mission[] = [
  {
    id: 'math_mission1',
    mission: "英語禁止でUniposを紹介！",
    rule: MissionRule.VoteTo1YN,
    timeout: 60 * 3,
  },
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
