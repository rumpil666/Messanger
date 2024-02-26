'use client'
import styles from "./page.module.scss";
import { Header } from "@/components/Header/Header";
import { MessageWindow } from "@/components/MessageWindow/MessageWindow";
import { NewMessage } from "@/components/NewMessage/NewMessage";

import { useMessageStore } from "@/stores/useMessageStore";

export default function Home() {
  const [sendMessage,
    updateMessage,
  ] = useMessageStore(state => [
    state.sendMessage,
    state.updateMessage,
  ]);

  return (
    <div className={styles.page}>
      <Header />
      <MessageWindow />
      <NewMessage 
      onUpdate={(id: string, title: string) => {
        updateMessage(id, title)
      }}
      onSend={(userId: string, title: string, fileList?: string[]) => {
        sendMessage(userId, title, fileList);
      }} />
    </div>
  );
}
