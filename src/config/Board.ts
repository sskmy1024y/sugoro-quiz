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
  missionId: string | null,
}

type NormalMath = {
  type: "normal",
}

type StarMath = {
  type: "star",
  point: number,
}

type MathType = PointMath | EventMath | NormalMath | StarMath

export const MathPosition: Math[] = [
  {
    x: 77,
    y: 65,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 70,
    y: 68,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 63,
    y: 73,
    w: 8,
    h: 15,
    type: "point",
    point: -1,
  },
  {
    x: 56,
    y: 67,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 49.2,
    y: 72,
    w: 8,
    h: 15,
    type: "event",
    missionId: null,
  },
  {
    x: 42.5,
    y: 76,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 35.5,
    y: 71,
    w: 8,
    h: 15,
    type: "point",
    point: -1,
  },
  {
    x: 28.7,
    y: 69,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 22,
    y: 74,
    w: 8,
    h: 15,
    type: "event",
    missionId: null
  },
  {
    x: 15,
    y: 69,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 12,
    y: 53,
    w: 8,
    h: 15,
    type: "event",
    missionId: null
  },
  {
    x: 10.5,
    y: 37,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 12.5,
    y: 21,
    w: 8,
    h: 15,
    type: "point",
    point: -1,
  },
  {
    x: 19,
    y: 14,
    w: 8,
    h: 15,
    type: "star",
    point: 5,
  },
  {
    x: 25.5,
    y: 8,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 32,
    y: 8,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 39,
    y: 11,
    w: 8,
    h: 15,
    type: "point",
    point: -1,
  },
  {
    x: 45.5,
    y: 6,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 52,
    y: 12,
    w: 8,
    h: 15,
    type: "event",
    missionId: null,
  },
  {
    x: 58.5,
    y: 8,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 65.1,
    y: 12,
    w: 8,
    h: 15,
    type: "point",
    point: -1,
  },
  {
    x: 72.1,
    y: 10,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 79,
    y: 19,
    w: 8,
    h: 15,
    type: "event",
    missionId: null,
  },
  {
    x: 81.5,
    y: 33,
    w: 8,
    h: 15,
    type: "point",
    point: 1,
  },
  {
    x: 79.5,
    y: 50,
    w: 8,
    h: 15,
    type: "point",
    point: -1,
  },
]
