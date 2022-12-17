type Math = {
  x: number,
  y: number,
  w: number,
  h: number,
} & MathType

type PointMath = {
  type: "point",
  point: number,
}

type EventMath = {
  type: "event",
  missionId: string,
}

type NormalMath = {
  type: "normal",
}

type MathType = PointMath | EventMath | NormalMath

export const MathPosition: Math[] = [
  {
    x: 2,
    y: 9,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 2,
    y: 20,
    w: 16,
    h: 11,
    type: "event",
    missionId: "mission1"
  },
  {
    x: 2,
    y: 31,
    w: 16,
    h: 11,
    type: "event",
    missionId: "mission2"
  },
]



const test = [
  {
    x: 2,
    y: 9,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 2,
    y: 20,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 2,
    y: 31,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 2,
    y: 42,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 2,
    y: 53,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 2,
    y: 64,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 2,
    y: 75,
    w: 24,
    h: 17,
    type: "event",
    missionId: "math_mission1"
  },
  {
    x: 26,
    y: 82,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 42,
    y: 82,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 58,
    y: 82,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 74,
    y: 74,
    w: 24,
    h: 19,
    type: "event",
    missionId: "math_mission2"
  },
  {
    x: 82,
    y: 63,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 82,
    y: 52,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 82,
    y: 41,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 82,
    y: 30,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 74,
    y: 9,
    w: 24,
    h: 22,
    type: "event",
    missionId: "math_mission3"
  },
  {
    x: 58,
    y: 9,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 42,
    y: 9,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 26,
    y: 9,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 26,
    y: 20,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 26,
    y: 31,
    w: 16,
    h: 14,
    type: "normal"
  },
  {
    x: 26,
    y: 45,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 26,
    y: 56,
    w: 24,
    h: 18,
    type: "event",
    missionId: "math_mission4"
  },
  {
    x: 50,
    y: 63,
    w: 16,
    h: 11,
    type: "normal"
  },
  {
    x: 66,
    y: 63,
    w: 8,
    h: 11,
    type: "normal"
  },
  {
    x: 66,
    y: 52,
    w: 8,
    h: 11,
    type: "normal"
  },
  {
    x: 58,
    y: 31,
    w: 16,
    h: 21,
    type: "event",
    missionId: "math_mission5"
  },
  {
    x: 50,
    y: 31,
    w: 8,
    h: 11,
    type: "normal"
  },
]
