export enum Rooms {
  Room1 = "room1",
  Room2 = "room2",
  Room3 = "room3",
  Room4 = "room4",
  Room5 = "room5",
  Room6 = "room6",
}

type Math = {
  x: number,
  y: number,
  w: number,
  h: number,
} & ({
  forceStop: false,
} | {
  forceStop: true,
  missionId: string,
})

type PointPlus = {
  type: "pointPlus",
  point: number,
}

type MathEventType = {}

export const MathPosition: Math[] = [
  {
    x: 2,
    y: 9,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 2,
    y: 20,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 2,
    y: 31,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 2,
    y: 42,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 2,
    y: 53,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 2,
    y: 64,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 2,
    y: 75,
    w: 24,
    h: 17,
    forceStop: true,
    missionId: "math_mission1"
  },
  {
    x: 26,
    y: 82,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 42,
    y: 82,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 58,
    y: 82,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 74,
    y: 74,
    w: 24,
    h: 19,
    forceStop: true,
    missionId: "math_mission2"
  },
  {
    x: 82,
    y: 63,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 82,
    y: 52,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 82,
    y: 41,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 82,
    y: 30,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 74,
    y: 9,
    w: 24,
    h: 22,
    forceStop: true,
    missionId: "math_mission3"
  },
  {
    x: 58,
    y: 9,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 42,
    y: 9,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 26,
    y: 9,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 26,
    y: 20,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 26,
    y: 31,
    w: 16,
    h: 14,
    forceStop: false
  },
  {
    x: 26,
    y: 45,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 26,
    y: 56,
    w: 24,
    h: 18,
    forceStop: true,
    missionId: "math_mission4"
  },
  {
    x: 50,
    y: 63,
    w: 16,
    h: 11,
    forceStop: false
  },
  {
    x: 66,
    y: 63,
    w: 8,
    h: 11,
    forceStop: false
  },
  {
    x: 66,
    y: 52,
    w: 8,
    h: 11,
    forceStop: false
  },
  {
    x: 58,
    y: 31,
    w: 16,
    h: 21,
    forceStop: true,
    missionId: "math_mission5"
  },
  {
    x: 50,
    y: 31,
    w: 8,
    h: 11,
    forceStop: false
  },
]

export const ENABLE_UNISEPON = process.env.NODE_ENV === "development" ??  false

export const PT = "pt"
