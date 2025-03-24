export type AxiosDefaultErrorType = {
    message: string,
    code: string,
    config: {
        url: string,
        timeout: number, // timeout we set for the request
        headers: Record<string, unknown> // this has the request headers we sent
    }
}

export type QueryParamConfig = {
    id?: number,
    page?: number,
    limit?: number,
    type?: 'mobile' | 'tv' | 'audio' | 'laptop' | 'gaming' | 'appliances',
    sort?: 'desc' | 'asc'
}

export type Product = {
    id: number,
    title: string,
    image: string,
    price: number,
    discount: number,
    description: string,
    brand: string,
    model: string,
    color: string,
    category: QueryParamConfig['type']
}
