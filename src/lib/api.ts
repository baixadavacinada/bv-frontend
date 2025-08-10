import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { parseCookies } from 'nookies';

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

const onResponseError = (error: any): Promise<any> => {
  console.error('API Response Error:', error);
  return Promise.reject(error);
};

export function setupAPIClient(ctx: NextPageContext | GetServerSidePropsContext | undefined = undefined): AxiosInstance {

  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.response.use(onResponse, onResponseError);

  const token = cookies['auth-token'];
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
  

  if (typeof window !== 'undefined') {
    api.interceptors.request.use((config) => {
      const clientToken = localStorage.getItem('authToken');
      if (clientToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${clientToken}`;
      }
      return config;
    });
  }

  return api;
}

export const api = setupAPIClient();