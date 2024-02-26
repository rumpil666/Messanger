import Image from 'next/image';
import styles from './ImgContainer.module.scss';

interface ImgContainerProps {
    imgs: string[];
}

export const ImgContainer: React.FC<ImgContainerProps> = ({ imgs }) => {
    return (
        <div className={styles.imgContainer}>
            {imgs
                ? imgs?.map((img, i) => (
                    <div
                        className={styles.img}
                        key={i}>
                        <Image src={img} alt={'Отправленная картинка'} fill={true} style={{ objectFit: 'cover' }} />
                    </div>
                ))
                : ""
            }
        </div>
    )
}