import {ReactNode} from "react";
import {useSynchronizeOrderPlayerIds} from "store/OrderPlayer";
import {useSynchronizeRoomMembers} from "store/Members";
import {useSyncronizedProgress} from "store/Progress";
import {useSynchronizePlayerPositions} from "store/PlayerPosition";
import {useSubscribeLatestGame} from "store/Game";

interface Props {
  roomId: string;
  children: ReactNode;
}

export const SubscribeProvider = ({roomId, children}: Props) => {
  useSynchronizeOrderPlayerIds(roomId);
  useSynchronizeRoomMembers(roomId);
  useSyncronizedProgress(roomId);
  useSynchronizePlayerPositions(roomId);
  useSubscribeLatestGame(roomId);

  return (
    <>
      {children}
    </>
  )
}
