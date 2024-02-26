import img1 from '../image/avatar1.png';
import img2 from '../image/avatar2.png';
import img3 from '../image/avatar3.png';
import img4 from '../image/avatar4.png';
import { UserDate } from '../../types.d';

const userAvatar: (UserDate)[] = [
  { name: 'Alex', image: img4, id: 1},
  { name: 'Jane', image: img3, id: 2},
  { name: 'Oliver', image: img2, id: 3},
  { name: 'Max', image: img1, id: 4},
]

export default userAvatar;

export const genUUID = (): string => {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now();
  }
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export const myId: string = 'sdfsdgw23534fsdf';