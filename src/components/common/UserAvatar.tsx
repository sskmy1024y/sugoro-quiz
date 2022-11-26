import {User} from "models/User";
import {Avatar, AvatarProps} from "@chakra-ui/react";

type Props = AvatarProps & {
  user: User;
}

export const UserAvatar = ({user, ...props}: Props) => {
  return (
    <Avatar name={user.name} src={user.iconUrl} bg={user.iconUrl ? "white" : undefined} {...props}  />
  )
}
