'use client'

import { useState } from "react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";

import { Image } from "@heroui/image";
import { Product } from "@/api/index.d";

import styles from './index.module.css';

type Props = {
    item: Product
}

function CartItem(props: Props) {
    const { item } = props;
    const { cart, product } = useStore();

    const router = useRouter();

    const onItemClicked = () => {
        product.selectProduct(item);
        router.push(`/details/${item.id}`);
    }

    const onRemoveClicked = () => {
        cart.remove(item.id);
    }

    return (
        <div className={styles.item}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Image
                    onClick={onItemClicked}
                    alt={item.model}
                    className={styles.itemImage}
                    src={item.image}
                    width="50%"
                />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                    <span className={styles.itemText}>{item.model}</span>
                    <span className={styles.itemText}>${item.price}</span>
                </div>
            </div>
            <span className={styles.removeBtn} onClick={onRemoveClicked}>X</span>
        </div>
    );
}

export default function ShoppingCart() {
    const { cart } = useStore();
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div>
            <button className={styles.button} onClick={() => setIsOpen(p => !p)}>
                { cart.items.length > 0 && <div className={styles.badge}>{cart.count}</div>}
            </button>
            {
                isOpen && cart.items.length < 1 && (
                    <div className={styles.content}>
                        <p>Your cart is empty.</p>
                    </div>
                )
            }

            {
                isOpen && cart.items.length > 0 && (
                    <div className={styles.content}>
                        { cart.items.map((c, i) => <CartItem key={i} item={c} />) }
                    </div>
                )
            }
        </div>
    );
}
