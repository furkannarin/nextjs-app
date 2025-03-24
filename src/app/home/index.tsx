/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useEffect } from 'react';
import { Product, QueryParamConfig } from '@/api/index.d';

import { useStore } from '@/store';

import { ProductList } from '@/components';

type Props = {
  cdata: QueryParamConfig['type'][] | null
  pdata: Product[] | null
}

export default function HomeComponent(props: Props) {
  const { cdata, pdata } = props;
  const { categories } = useStore();

  useEffect(() => {
    categories.save(cdata);
  }, []);

  return <ProductList cdata={cdata} pdata={pdata} />
}
