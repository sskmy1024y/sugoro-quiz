export interface User {
  key: string; // firebase key
  id: string;
  name: string;
  iconUrl?: string;
  point: number;
}

export interface LoginUser extends User {
  roomId: string;
}
