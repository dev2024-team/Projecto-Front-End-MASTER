// pages/page1.tsx
import Layout1 from '../layout/unlogedUser';
import { ReactElement } from 'react';

const Page1 = () => {
  return <div>Content for Page 1</div>;
};

Page1.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

export default Page1;
