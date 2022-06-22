import axios from 'axios';

class HttpClient {

	constructor() {
		this.http = axios.create({ baseURL: process.env.REACT_APP_AZURE_URL });
		this.http.interceptors.request.use(async (request) => {
			request.params = { ...request.params, code: process.env.REACT_APP_AZURE_CODE };
			return request;
		});
	}
}

export const http = new HttpClient().http;