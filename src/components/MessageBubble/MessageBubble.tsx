import styles from "./MessageBubble.module.scss";
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Image from 'next/image';
import img from '../../image/avatar1.png'
import dayjs, { Dayjs } from "dayjs";
import { myId } from '@/utils/helpers';
import { useMessageStore } from "@/stores/useMessageStore";
import { Button, Space } from "antd";

interface MessageBubbleProps {
  userId: string;
  id: string;
  title: string;
  createdAt: Dayjs;
  dataImg?: string[];
  onRemoved: (id: string) => void;
}

interface Message {
  id: string;
  title: string;
  createdAt: Dayjs;
  userId: string;
  fileList?: string[];
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ userId, id, title, createdAt, dataImg, onRemoved, }) => {
  const checkMessageBelongsMy = (id: string): boolean => {
    if (id === myId) return true;
    return false;
  }

  const checkSenderLastMessage = (id: string, arr: Message[]) => {
    const index: number = arr.findIndex((i: Message) => i.id === id);
    if (arr[index]?.userId !== arr[index - 1]?.userId) return false;
    return true;
  };

  const [messages,
    toggleEditMode,
  ] = useMessageStore(state => [
    state.messages,
    state.toggleEditMode
  ]);

  return (
    <li className={`${styles.messageBubble}  ${checkMessageBelongsMy(userId) ? styles.messageBubble__right : styles.messageBubble__left}`}>
      {checkMessageBelongsMy(userId)
        ? ''
        : <div className={styles.messageBubble__avatar}>
          <Image src={img} alt={'Avatar'} width={32} height={32} />
        </div>}
      <div className={`${styles.messageBubble__container} ${checkMessageBelongsMy(userId)
        ? styles.messageBubble__container_right
        : styles.messageBubble__container_left} ${checkSenderLastMessage(id, messages)
          && userId === myId
          ? styles.messageBubble__container_border
          : ''}`}>
        {checkMessageBelongsMy(userId)
          ? ''
          : <div className={styles.user}><h2 className={styles.user__title}>Valli</h2><p className={styles.user__subitle}>Bot</p></div>}
        <div className={styles.message}>
          {dataImg ? <div className={styles.message__imgContainer}>
            {dataImg.map((img, i) => (<Image src={img} alt={'Отправленная картинка'} width={100} height={100} key={i} />))}
          </div>
            : ''
          }
          <div className={styles.message__textContainer}>
            <p className={`${styles.message__text} ${checkMessageBelongsMy(userId) ? '' : styles.message__text_left}`}>{title}</p>
            <div className={styles.message__container}>
              <p className={`${styles.message__time} ${checkMessageBelongsMy(userId) ? '' : styles.message__time_left}`}>{dayjs(createdAt).format('hh:mm A')}</p>
              <div className={`${checkMessageBelongsMy(userId) ? '' : styles.message__container_time}`}>
                <CheckOutlined type="message" style={{ fontSize: '12px', color: '#81e299' }} />
                <CheckOutlined type="message" style={{ fontSize: '12px', color: '#81e299', position: 'relative', right: '4px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {checkMessageBelongsMy(userId)
        ? <Space className={styles.messageBubble__icons}>
          <Button
            onClick={() => {
              toggleEditMode(true, id, title, dataImg)
            }}
            type="link"
            style={{ fontSize: '12px', border: 'none', height: '10px', width: '10px' }}
            icon={<EditOutlined style={{ fontSize: '12px', color: '#fff' }} />}
          />
          <Button
            onClick={() => {
              onRemoved(id)
            }}
            type="link"
            style={{ fontSize: '12px', border: 'none', height: '10px', width: '10px' }}
            icon={<DeleteOutlined style={{ fontSize: '12px', color: '#fff' }} />}
          />
        </Space>
        : <Space className={styles.messageBubble__icons}>
          <Button
            onClick={() => {
              onRemoved(id)
            }}
            type="link"
            style={{ fontSize: '12px', border: 'none', height: '10px', width: '10px' }}
            icon={<DeleteOutlined style={{ fontSize: '12px', color: '#000' }} />}
          />
        </Space>}
    </li>
  )
};
