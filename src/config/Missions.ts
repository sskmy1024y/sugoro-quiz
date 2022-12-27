import {Mission, MissionRule} from "models/Mission";

export const EVENT_MATH_MISSIONS: Mission[] = [
  {
    id: 'math_mission1',
    mission: "英語禁止で上長を紹介して！（英語使わず紹介できてたら投票してね）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission2',
    mission: "早口言葉言えるかな？　3回繰り返してね「バナナの謎はまだ謎なのだぞ」　（言えてた！と思ったら投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission3',
    mission: "今年１番自分を褒めたくなった瞬間は？（いい話と思ったら投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission4',
    mission: "自分の動きの中で、今年一番顧客の未来を変えたと思えた瞬間は？（それは顧客の行動を変えてると思ったらいいねに投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission5',
    mission: "今年やり残したことは？（来年がんばれ！って思ったら投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission6',
    mission: "仕事のこだわりを教えて！（いいね、って思ったら投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission7',
    mission: "一生これしか食べられないなら、何を死ぬまで食べる？（わかる！って思ったら投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission8',
    mission: "もしも自分が総理大臣だったらどんな法律を作る？（その法律欲しい！と思ったら投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission9',
    mission: "自分の好きな言葉は？（わかる！って思ったら投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission10',
    mission: "今年1番かなしかった出来事は？（なぐさめたくなったら投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  },
  {
    id: 'math_mission11',
    mission: "この会社にUniposが入ったら嬉しい！って思う会社は？（いいね！と思ったら投票してね！）",
    rule: MissionRule.VoteTo1YN,
    timeout: 60,
  }
];


export const MISSIONS: Mission[] = [
  // {
  //   id: 'mission1',
  //   mission: "ミッション順番1番目の人の、昨日の晩御飯は何だった！？ 周りのみんなで順番に質問して当てよう！（見事当てた人に、みんなで投票してね！）",
  //   rule: MissionRule.VoteTo1,
  //   timeout: 60,
  // },
  {
    id: 'mission2',
    mission: "今年一番やらかした話を教えて！仕事以外でもOKだよ。　（一番「来年がんばれ！」と思った人に投票してね！）",
    rule: MissionRule.VoteTo1,
    timeout: 60,
  },
  {
    id: 'mission3',
    mission: "推しのお菓子をプレゼンして！（一番食べたくなった人に投票してね！）",
    rule: MissionRule.VoteTo1,
    timeout: 60,
  },
  {
    id: 'mission4',
    mission: "五七五で自己紹介をしてください！（一番「うまいな〜」と思った人に投票してね！）",
    rule: MissionRule.VoteTo1,
    timeout: 60,
  },
  {
    id: 'mission5',
    mission: "「俺が考える最強の休日の過ごし方」をプレゼンして！　（「その休日を体験したい…」と思った人に投票してね！）",
    rule: MissionRule.VoteTo1,
    timeout: 60,
  },
  {
    id: 'mission6',
    mission: "みんなの今年買ってよかったものを教えて！（一番「いいな〜！ほしい！」と思った人に投票してね！）",
    rule: MissionRule.VoteTo1,
    timeout: 60,
  },
  {
    id: 'mission7',
    mission: "今年一番成長したことは何でしょうか？（一番成長したと思う人に投票してね！）",
    rule: MissionRule.VoteTo1,
    timeout: 60,
  },
  {
    id: 'mission8',
    mission: "今年の自分的ビッグニュースを発表！（一番驚いたニュースを発表した人に投票してね！）",
    rule: MissionRule.VoteTo1,
    timeout: 60,
  },
  {
    id: 'mission9',
    mission: "今年一番お世話になった人を紹介して！（いい話だなと思った人全員に投票してね！）",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60,
  },
  {
    id: 'mission10',
    mission: "来年の抱負を一言で！（一人ずつ話して、いいと思った人全員に投票してね！）",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60,
  },
  {
    id: 'mission11',
    mission:　"英語禁止で今年よかった出来事を教えて！（１人ずつ話して、いいと思った人全員に投票してね！）",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60,
  },
  {
    id: 'mission12',
    mission: "今年一年を一漢字で例えるなら？（１人ずつ話して、いいと思った人全員に投票してね！）",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60,
  },
  {
    id: 'mission13',
    mission: "オフィス周辺で一番オススメのご飯屋さんを教えて！（１人ずつ話して、行きたいと思った人全員に投票してね！）",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60,
  },
  {
    id: 'mission14',
    mission: "英語禁止で来年会社でやってみたいことを教えて！（１人ずつ話して、いいと思った人全員に投票してね！）",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60,
  },
  {
    id: 'mission15',
    mission: "今年仕事してて一番嬉しかった瞬間は？（１人ずつ話して、いいと思った人全員に投票してね！）",
    rule: MissionRule.VoteToOtherYN,
    timeout: 60,
  }
]

export const ALL_MISSIONS = [...EVENT_MATH_MISSIONS, ...MISSIONS];
