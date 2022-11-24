import {atom, atomFamily, selectorFamily} from "recoil";
import {Progress} from "models/ProgressState";
import {User} from "models/User";
import {ProgressState} from "store/Progress/atoms";
import {MembersState} from "store/Members/atoms";

export const CurrentPlayerState = selectorFamily<User | null, string>({
  key: "CurrentPlayerState",
  get: (roomId) => ({get}) => {
    const progress = get(ProgressState(roomId));
    const members = get(MembersState(roomId));
    const currentPlayerId = progress.currentPlayerId;
    return members.find(member => member.id === currentPlayerId) || null;
  }
})


