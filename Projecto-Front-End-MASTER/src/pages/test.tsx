// pages/page2.tsx
import Layout2 from '../layout/logedUser';
import { ReactElement } from 'react';

const Page2 = () => {
  return <div>Content for Page 2</div>;
};

Page2.getLayout = function getLayout(page: ReactElement) {
  return <Layout2>{page}</Layout2>;
};

export default Page2;
