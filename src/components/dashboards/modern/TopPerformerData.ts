import img1 from '@/assets/images/profile/user-1.jpg';
import img2 from '@/assets/images/profile/user-2.jpg';
import img3 from '@/assets/images/profile/user-3.jpg';
import img4 from '@/assets/images/profile/user-4.jpg';

interface PerformerType {
  id: string;
  imgsrc: string;
  name: string;
  post: string;
  pname: string;
  status: string;
  budget: string;
}

const TopPerformerData: PerformerType[] = [
  {
    id: '1',
    imgsrc: img1,
    name: 'Sunil Joshi',
    post: 'Web Designer',
    pname:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status: 'Low',
    budget: '3.9',
  },
  {
    id: '2',
    imgsrc: img2,
    name: 'John Deo',
    post: 'Web Developer',
    pname:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status: 'Medium',
    budget: '24.5',
  },
  {
    id: '3',
    imgsrc: img3,
    name: 'Mathew Anderson',
    post: 'Web Manager',
    pname:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status: 'High',
    budget: '12.8',
  },
  {
    id: '4',
    imgsrc: img4,
    name: 'Yuvraj Sheth',
    post: 'Project Manager',
    pname:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status: 'Very High',
    budget: '2.4',
  },
];

export default TopPerformerData;
