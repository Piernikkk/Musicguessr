import { paths } from '@/types/itunes';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

const fetchClient = createFetchClient<paths>({
    baseUrl: 'https://itunes.apple.com/',
});
export const $itunes = createClient(fetchClient);
