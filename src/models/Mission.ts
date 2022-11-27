export enum MissionRule {
  VoteTo1 = 'VoteTo1', // 自分以外の誰か一人を選んで投票する
  VoteTo1YN = 'VoteTo1YN', // 自分以外の誰かに良し悪しを投票する
  VoteToOtherYN = 'VoteToOtherYN', // 自分以外の全員に良し悪しを投票する
}

export interface Mission {
  id: string;
  mission: string;
  /* 制限時間(sec) */
  timeout: number;
  rule: MissionRule;
}
