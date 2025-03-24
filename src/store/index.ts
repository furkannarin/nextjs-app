import { create } from 'zustand';

import { Product, QueryParamConfig } from '@/api/index.d';

type Store = {
    categories: {
        types: QueryParamConfig['type'][] | null
        save: (data: QueryParamConfig['type'][] | null) => void
    },
    product: {
        selectedProduct: Product | null
        selectProduct: (data: Product | null) => void
    },
    cart: {
        items: Product[]
        count: number
        add: (item: Product) => void
        remove: (id: number) => void
    },
}

export const useStore = create<Store>(set => ({
        categories: {
            types: null,
            save: data => set(s => {
                s.categories.types = data;
                return s;
            })
        },
        product: {
            selectedProduct: null,
            selectProduct: data => set(s => {
                s.product.selectedProduct = data;
                return s;
            })
        },
        cart: {
            items: [],
            count: 0,
            add: item => set(s => {
                const itemExists = s.cart.items.includes(item);
                if (itemExists) return s;

                s.cart.items.push(item);
                s.cart.count = s.cart.items.length;

                // this is a very bad code but otherwise zustand wont trigger a re-render.
                // so we have to create a new js object for zustand to be able to compare object mem. refs
                return { ...s }; 
            }),
            remove: id => set(s => {
                if (s.cart.items.length < 1) return s;

                s.cart.items = s.cart.items.filter(p => p.id !== id);
                s.cart.count = s.cart.items.length;
                return { ...s };
            })
        }
    })
);
