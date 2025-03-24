import { fetchData, ENDPOINTS } from '@/api';
import { Product, QueryParamConfig } from '@/api/index.d';

import HomeComponent from '.';

export default async function Home() {
  const RANDOM_PAGE = Math.trunc(Math.random() * 10);

  const pdata = await fetchData<{products: Product[]}>(ENDPOINTS.GET_ALL_PRODUCTS, { page: RANDOM_PAGE, limit: 10 });
  const cdata = await fetchData<{categories: QueryParamConfig['type'][]}>(ENDPOINTS.GET_ALL_CATEGORIES);

  return <HomeComponent cdata={cdata?.categories || null} pdata={pdata?.products || null} />;
}
