import axios from '@/lib/axios';
import Endpoints from './endpoints';
import { AxiosRequestConfig } from 'axios';
import { PackageSearchResponse } from '@/types/package';

const adapter: RequestAdapter = axios;

async function SearchPackage(name: string, limit: number = 10, page = 1) {

    if(page <= 0) page = 1;
    console.log('SearchPackage', name, page, limit * (page-1))
    const { data } = await adapter.get<PackageSearchResponse>(Endpoints.NPMRegistry + 'search', {
        params: {
            text: name,
            size: limit,
            from: limit * (page-1),
        }
    } as AxiosRequestConfig)

    return data;
}

export default {
    SearchPackage,
}