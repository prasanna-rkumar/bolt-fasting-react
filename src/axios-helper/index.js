import axios from 'axios';

const SERVER = 'http://localhost:8042'

export const post = ({ url, data }) => {
  return axios({
    method: 'POST',
    url: SERVER + url,
    headers: {
      authorization: `Bearer ${localStorage.getItem('idToken')}`
    },
    data
  })
}