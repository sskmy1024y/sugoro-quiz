export interface User {
  id: string;
  name: string;
  iconUrl?: string;
}

export interface LoginUser extends User {
  roomId: string;
}
