import styles from "./Header.module.scss";
import { EllipsisOutlined } from '@ant-design/icons';
import { Participants } from "../Participants/Participants"

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Participants />
      <div className={styles.header__container}><h1 className={styles.header__title}>🦄 Team Unicorns</h1><h2 className={styles.header__subtitle}>last seen 45 minutes ago</h2></div>
      <EllipsisOutlined />
    </header>
  )
};