/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useEffect, useState } from "react";
import { Image } from "@heroui/image";
import Link from "next/link";

import { Product } from "@/api/index.d";

import { useStore } from "@/store";

import styles from './index.module.css';

export default function DetailsComponent() {
    const { product, cart } = useStore();
    const [ isAlreadyAdded, setIsAdded ] = useState(false);

    useEffect(() => {
        setIsAdded(cart.items.find(i => i.id === id) !== undefined);
    }, [cart.items.length]);

    if (!product.selectedProduct) return <Link style={{ fontSize: 36, fontWeight: 600 }} href="/home">To Home Page</Link>

    const { category, image, description, title, price, discount, id } = product.selectedProduct;
    const calcPrice = Math.trunc(price * (1 - (discount / 100)));

    const onItemAdded = () => {
        cart.add(product.selectedProduct as Product); // force-cast
        setIsAdded(true);
    }

    const onItemRemoved = () => {
        cart.remove(id);
        setIsAdded(false);
    }

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Image
                    alt={title}
                    className={styles.image}
                    src={image}
                    width="50%"
                />
                <div className={styles.info}>
                    <p className={styles.title}>{category?.toUpperCase()}</p>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.title}>{description}</p>
                    <p className={styles.price}>${discount ? calcPrice : price} - %{discount || 0} off</p>
                    <button
                        onClick={isAlreadyAdded ? onItemRemoved : onItemAdded}
                        style={{ marginTop: 10 }}
                        color="primary"
                    >
                        { isAlreadyAdded ? 'Remove From Cart' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
