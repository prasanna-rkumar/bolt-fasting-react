import axios from 'axios';
import { auth } from '../firebase';

const getIdToken = async () => {
  const idToken = await auth.currentUser?.getIdToken();
  return idToken;
}

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export const post = async ({ url, data }) => {
  return client({
    method: 'POST',
    url: url,
    headers: {
      authorization: `Bearer ${await getIdToken()}`
    },
    data
  })
};

export const get = async ({ url, data }) => {
  return client({
    method: 'GET',
    url: url,
    headers: {
      authorization: `Bearer ${await getIdToken()}`
    },
    data
  })
};
