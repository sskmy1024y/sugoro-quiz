export interface User {
  id: string;
  name: string;
}

export interface LoginUser extends User {
  roomId: string;
}
