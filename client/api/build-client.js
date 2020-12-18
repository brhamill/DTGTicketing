import axios from 'axios'

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // On the server
    return axios.create({
      baseURL: 'http://www.datatogo.xyz/',
      headers: req.headers,
    })
  } else {
    // On the browser
    return axios.create({
      baseURL: '/',
    })
  }
}

export default buildClient
