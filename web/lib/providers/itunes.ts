import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

const fetchClient = createFetchClient({
    baseUrl: 'https://itunes.apple.com/',
});
export const $itunes = createClient(fetchClient);