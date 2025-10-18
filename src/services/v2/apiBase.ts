import axios from 'axios'

const axiosInstanceV2 = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_V2}/v2/api`, // Use environment variable or a default
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here, e.g., Authorization
    Authorization: `Bearer ${localStorage.getItem('v2Token')}`,
  },
  timeout: 10000, // Request timeout in milliseconds
})

// Optional: Add request and response interceptors for global error handling, token refresh, etc.
axiosInstanceV2.interceptors.request.use(
  (config) => {
    // Modify request config before sending
    // e.g., add authorization token dynamically
    const token = localStorage.getItem('v2Token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstanceV2.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle global errors, e.g., redirect to login on 401
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access, redirecting to login...')
      // You might want to clear local storage and redirect here
    }
    return Promise.reject(error)
  },
)

export default axiosInstanceV2
