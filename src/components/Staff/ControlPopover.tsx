import {
  Button, Flex,
  Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal, useDisclosure
} from "@chakra-ui/react";
import {DeleteAllData} from "components/Staff/DeleteAllData";
import React from "react";

export const ControlPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Popover>
      <PopoverTrigger>
        <Button w={"fit-content"}>コントロールパネル</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Flex>
              <Button colorScheme='red' onClick={onOpen}>データ初期化</Button>
              <DeleteAllData isOpen={isOpen} onClose={onClose} />
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}


