import { useEffect, useRef } from 'react'
import styles from "./MessageWindow.module.scss";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { useMessageStore } from "@/stores/useMessageStore";
import dayjs from "dayjs";

export const MessageWindow: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const scroll = () => {
    const {scrollHeight} = container.current as HTMLDivElement;
    container.current?.scrollTo({
      top: scrollHeight, 
      left: 0,
      behavior: 'smooth',
    })
  };

  const [messages,
    removeMessage,
  ] = useMessageStore(state => [
    state.messages,
    state.removeMessage,
  ]);

  useEffect(() => {
    scroll()
  }, [messages])

  return (
    <div className={styles.messageWindow} ref={container}>
      <p className={styles.messageWindow__time}>{dayjs().format('D/MM/YYYY')}</p>
      <ul id="container" className={styles.messageWindow__container}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            userId={message.userId}
            id={message.id}
            title={message.title}
            dataImg={message.fileList}
            createdAt={message.createdAt}
            onRemoved={removeMessage}
          />
        ))}
      </ul>
    </div>
  )
};