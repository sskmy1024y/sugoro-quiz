import {Button, InputGroup} from "@chakra-ui/react";
import {ChangeEvent, ReactNode, useRef} from "react";
import {FaPlus} from "react-icons/all";

type FileUploadProps = {
  accept?: string
  multiple?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  children?: ReactNode
}

export const FileUpload = ({ accept, multiple, children, onChange }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <InputGroup onChange={onChange} w={"auto"}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        onChange={onChange}
        ref={inputRef}
      />
      <Button leftIcon={<FaPlus />} variant='solid' onClick={() => inputRef.current?.click()}>
        アイコンを追加
      </Button>
    </InputGroup>
  )
}
