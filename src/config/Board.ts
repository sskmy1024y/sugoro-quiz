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

]
