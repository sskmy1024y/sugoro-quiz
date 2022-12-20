import {useTime} from "hooks/useTime";
import {useMemo} from "react";
import {
  Button,
  HStack,
  Progress,
  Text,
  VStack
} from "@chakra-ui/react";
import {SkipButton} from "components/Game/GameModal/SkipButton";

interface Props {
  timeoutAt: number; // タイムアウトする時刻
  timeout: number; // 制限時間
  onNext: () => void;
}

export const TimeoutProgress = ({timeout, timeoutAt, onNext}: Props) => {
  const now = useTime(100)

  const diff = useMemo(() => {
    const diff = timeoutAt - now
    if (diff < 0) return 0
    return diff / 1000
  }, [now, timeoutAt])

  const progressValue = useMemo(() => {
    return Math.ceil(diff / timeout * 100)
  }, [diff, timeout]);

  if (diff === 0) {
    return (
      <VStack justifyContent={"center"}>
        <Text fontSize={"32px"} fontWeight={"bold"}>{"Timeout!"}</Text>
        <Button size={"lg"} colorScheme={"twitter"} onClick={onNext}>次へ</Button>
      </VStack>
    );
  }

  return (
    <>
      <HStack spacing={"24px"} w={"100%"}>
        <Progress hasStripe value={progressValue} flexGrow={1} />
        <HStack alignItems={"baseline"}>
          <Text w={"100px"} fontSize={"24px"} fontWeight={"bold"}>{`${diff.toFixed(3)}`}</Text>
          <Text>秒</Text>
        </HStack>
        <SkipButton onClick={onNext}>ミッション終了</SkipButton>
      </HStack>
    </>
  )
}
