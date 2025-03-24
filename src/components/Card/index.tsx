'use client'

import { useStore } from '@/store';
import { useRouter } from 'next/navigation'

import { Product } from "@/api/index.d";
import { Image } from "@heroui/image";

import styles from './index.module.css';

type Props = {
    data: Product
}

export default function Card(props: Props) {
    const { data } = props;
    const { product } = useStore();

    const router = useRouter();

    const handleClicked = () => {
        product.selectProduct(data);
        router.push(`/details/${data.id}`);
    }

    return (
        <div onClick={handleClicked} className={styles.container}>
            <Image
                alt={data.title}
                className={styles.image}
                src={data.image}
                width="50%"
            />
            <div className={styles.info}>
                <p className={styles.model}>{data.model}</p>
                <p className={styles.brand}>{data.brand.toUpperCase()}</p>
                <p className={styles.price}>${data.price}</p>
            </div>
        </div>
    );
}
