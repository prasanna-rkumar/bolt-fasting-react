import axios from 'axios';

const SERVER = process.env.REACT_APP_PROD_SERVER

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