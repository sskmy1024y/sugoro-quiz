import {ReactNode} from "react";
import {useSynchronizeOrderPlayerIds} from "store/OrderPlayer";
import {useSynchronizeRoomMembers} from "store/Members";
import {useSyncronizedProgress} from "store/Progress";

interface Props {
  roomId: string;
  children: ReactNode;
}

export const SubscribeProvider = ({roomId, children}: Props) => {
  useSynchronizeOrderPlayerIds(roomId);
  useSynchronizeRoomMembers(roomId);
  useSyncronizedProgress(roomId);

  return (
    <>
      {children}
    </>
  )
}
