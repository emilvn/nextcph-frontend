import axios, {AxiosResponse} from 'axios';

async function SetFetchApi(url: string, requestData?: any): Promise<any> {
    try {
        const response: AxiosResponse = await axios.get(url, {
            params: requestData,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            console.error('Error fetching data:', response.statusText);
            return null;
        }
    } catch (error: unknown) {
        // @ts-ignore
        console.error('Error fetching data:', error.message);
        return null;
    }
}

export default SetFetchApi;
