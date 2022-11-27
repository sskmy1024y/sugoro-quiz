import {ModalBody, ModalFooter} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {MissionRule} from "models/Mission";
import {VoteToOne} from "./VoteToOne";
import {useCallback, useMemo} from "react";
import {TimeoutProgress} from "./TimeoutProgress";
import {ref, set} from "firebase/database";
import {db} from "config/firebase";
import {useUpdateProgress} from "store/Progress";

interface Props {
  loginUser: LoginUser;
  latestGame: CombinedGame;
}

export const Vote = ({loginUser, latestGame}: Props) => {
  const updateProgress = useUpdateProgress(loginUser.roomId);
  const targetUser = useMemo(() => latestGame?.gamePlayers.filter(v => v.isTarget).map(v => v.player) ?? [], [latestGame]);

  const onNext = useCallback(async () => {
    await updateProgress({state: "game-end"})
  }, [updateProgress])

  return (
    <>
      <ModalBody>
        {latestGame.mission.rule === MissionRule.VoteTo1YN ? (
          <VoteToOne loginUser={loginUser} targetUser={targetUser[0]} game={latestGame} />
        ) : null}
      </ModalBody>
      <ModalFooter justifyContent={"center"}>
        <TimeoutProgress timeout={latestGame.mission.timeout} timeoutAt={latestGame.timeoutAt} onNext={onNext} />
      </ModalFooter>
    </>
  )
}
