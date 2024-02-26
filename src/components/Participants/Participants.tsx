import styles from "./Participants.module.scss";
import Image from 'next/image';
import userAvatar from '@/utils/helpers'
import { UserDate } from '../../../types.d';

export const Participants: React.FC = () => {

  const avatars: UserDate[] = userAvatar.filter((_, i) => i < 4);

  return (
    <div className={styles.participants}>
        {avatars.map((option: UserDate) => (<div className={styles.participants__avatar} key={option.id}><Image src={option.image} alt={option.name} width={24.5} height={24.5}/></div>))}
    </div>
  );
};