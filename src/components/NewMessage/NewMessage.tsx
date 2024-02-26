import { useCallback, useState, useRef, useEffect } from "react";
import styles from "./NewMessage.module.scss";
import { SmileOutlined, SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { myId } from '@/utils/helpers';
import { PopupPreview } from "@/components/PopupPreview/PopupPreview";
import { Upload } from "../Upload/Upload";
import { CustomInput } from "../CustomInput/CustomInput";
import { useMessageStore } from "@/stores/useMessageStore";

interface NewMessageProps {
  onUpdate: (id: string, title: string) => void;
  onSend: (userId: string, title: string, fileList?: string[]) => void;
}

export const NewMessage: React.FC<NewMessageProps> = ({ onSend, onUpdate }) => {
  const [editableMessage, editMode, toggleEditMode] = useMessageStore(state =>
    [state.editableMessage, state.editMode, state.toggleEditMode]
  );

  const inputRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [popupOpened, setPopupOpened] = useState(false)

  const sendMessage = useCallback(() => {
    onSend(myId, inputValue);
    onSend('Bot', 'Hello World!')
    setInputValue('')
    if (inputRef.current !== null) inputRef.current.textContent = '';

  }, [inputValue, onSend]);

  const buttonDisabled = (): boolean => {
    if (inputValue === "") return true;
    return false
  };

  const onInput = (e: any): void => {
    e.preventDefault();
    let eventTarget = e.target as HTMLElement;
    setInputValue(eventTarget.textContent || '');
  };

  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && inputValue !== "") {
      e.preventDefault();
      sendMessage();
    };
    if (e.key === 'Enter') return e.preventDefault();
  };

  const onClose = (): void => {
    setPopupOpened(false)
    setImageUrl([])
  }

  const onChangeUpload = (e: any) => {
    const files = e.target.files;
    const arr: string[] = [];

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onload = () => {
        arr.push(reader.result as string)
        if(i === files.length - 1) setImageUrl(arr);
      };
      reader.readAsDataURL(files[i]);

    }

    setPopupOpened(true);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [sendMessage])

  useEffect(() => {
    if (editableMessage) setInputValue(editableMessage.title);
    if (inputRef.current !== null && editableMessage) inputRef.current.textContent = editableMessage.title;
  }, [editMode, editableMessage])

  return (
    <>
      <section className={styles.newMessage}>
        <Button style={{ border: 'none', height: '48px' }} icon={<SmileOutlined width={'16px'} height={'16px'} />} />
        <CustomInput
          buttonDisabled={buttonDisabled()}
          onInput={onInput}
          handleEnter={handleEnter}
          inputRef={inputRef}
        />
        <Upload
          onChange={onChangeUpload}
        />
        <Button
          type="link"
          onClick={() => {
            if (editMode) {
              onUpdate(editableMessage.id, inputValue);
              toggleEditMode(false, '', '', [])
              setInputValue('')
              if (inputRef.current !== null) inputRef.current.textContent = '';
            } else {
              sendMessage()
            }
          }
          }
          disabled={buttonDisabled()}
          style={{ border: 'none', height: '48px', cursor: 'unset' }}
          icon={<SendOutlined width={'16px'} height={'16px'} />}
        />
      </section>
      <PopupPreview
        opened={popupOpened}
        dataImg={imageUrl}
        onSend={onSend}
        onClose={onClose}
      />
    </>
  )
};