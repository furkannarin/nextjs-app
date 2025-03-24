import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosDefaultErrorType, QueryParamConfig } from './index.d';
  
const DEFAULT_TIMEOUT = 5 * 1000;
const ERROR_LOGS_DISABLED = false;
const SEARCH_PARAMS = new URLSearchParams();
const BASE_URL = 'https://fakestoreapi.in/api/products';

const DEFAULT_CONFIG: AxiosRequestConfig = {
    timeout: DEFAULT_TIMEOUT,
    timeoutErrorMessage: 'REQUEST_TIMED_OUT'
};

export const enum ENDPOINTS {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    GET_ALL_CATEGORIES,
    GET_PRODUCTS_BY_CATEGORY,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
}

const HandleError = (error?: AxiosError) => {
    if (!error) {
        console.warn('ERROR OBJECT IS INVALID');
        return;
    }

    if (error.message === DEFAULT_CONFIG.timeoutErrorMessage) {
        const CastError = error as AxiosDefaultErrorType;
        console.warn('REQUEST TIMED OUT. URL: ' + CastError.config.url);
        return;
    }

    const errObj = error.response as AxiosResponse<Error>;

    if (!errObj || !errObj.data) return;

    if (!ERROR_LOGS_DISABLED) {
        const headers = error.request._headers || 'undef-headers';
        const data = errObj.data || 'undef-data';

        console.warn(
            'Errors \n' +
            'ErrorData    -> ' + JSON.stringify(data) + '\n' +
            'ErrorHeader  -> ' + JSON.stringify(headers) + '\n'
        );
    }
};

export async function fetchData<ResponseType>(endpoint: ENDPOINTS, params?: QueryParamConfig, data?: Record<string, unknown>) {
    try {
        const usesCategory = endpoint === ENDPOINTS.GET_PRODUCTS_BY_CATEGORY || endpoint === ENDPOINTS.GET_ALL_CATEGORIES;
        let url = BASE_URL;
    
        if (usesCategory) url += '/category';
    
        if (params) {
            if (params.id) url += `/${params.id}`;
            else {
                if (params.page) SEARCH_PARAMS.set('page', `${params.page}`);
                if (params.limit) SEARCH_PARAMS.set('limit', `${params.limit}`);

                if (usesCategory) {
                    if (params.type) SEARCH_PARAMS.set('type', `${params.type}`);
                    if (params.sort) SEARCH_PARAMS.set('sort', `${params.sort}`);
                }
            }
        }

        const constructedSearchParams = SEARCH_PARAMS.toString();
        if (constructedSearchParams) url += `?${constructedSearchParams}`;

        DEFAULT_CONFIG.url = url;
        DEFAULT_CONFIG.data = data;
        DEFAULT_CONFIG.signal = new AbortController().signal;

        const result = await axios.request(DEFAULT_CONFIG);
        if (result.data) return result.data as ResponseType;
        else return null;
    } catch (error) {
        HandleError(error as AxiosError);
        return null;
    }
};
