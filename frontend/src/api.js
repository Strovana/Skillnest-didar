import axios from 'axios'

const api = axios.create({
  baseURL: "https://skillnest-didar.onrender.com",
});

// Attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sn_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global response error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sn_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
