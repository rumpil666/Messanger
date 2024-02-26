import styles from "./Upload.module.scss";
import { FileImageOutlined } from '@ant-design/icons';

interface UploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Upload: React.FC<UploadProps> = ({ onChange }) => {

  return (
    <label className={styles.upload} >
    <FileImageOutlined width={'16px'} height={'16px'} style={{ color: "#2982FF" }} />
    <input
      className={styles.upload__input}
      type="file"
      multiple
      onChange={onChange}
    />
  </label>
  );
};