'use client'

import { Product, QueryParamConfig } from '@/api/index.d';

import { useStore } from '@/store';
import { useRouter } from 'next/navigation'

import { Card } from '@/components';
import styles from './index.module.css'

type Props = {
  cdata?: QueryParamConfig['type'][] | null
  pdata: Product[] | null
}

export default function ProductList(props: Props) {
    const { pdata } = props;
    let { cdata } = props;

    const router = useRouter();
    const { categories } = useStore();

    if (!cdata) cdata = categories.types;

    const onCategoryClicked = (category: QueryParamConfig['type']) => {
        router.push(`/home/${category}`);
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerCont}>
                {cdata?.map((c, i) => <p key={i} onClick={() => onCategoryClicked(c)} className={styles.categoryTitle}>{c}</p>)}
            </div>
            <div className={styles.listCont}>
                {pdata?.map((p, i) => <Card key={i} data={p} />)}
            </div>
        </div>
    );
}
