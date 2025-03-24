import { fetchData, ENDPOINTS } from '@/api';
import { Product, QueryParamConfig } from '@/api/index.d';

import { ProductList } from '@/components';

type Params = { params: Promise<{ category: QueryParamConfig['type'] }> };

export default async function Category({ params }: Params) {
    const { category } = await params;

    const pdata = await fetchData<{products: Product[]}>(ENDPOINTS.GET_PRODUCTS_BY_CATEGORY, { limit: 20, type: category, sort: 'desc' });

    return <ProductList pdata={pdata?.products || null} />
}
