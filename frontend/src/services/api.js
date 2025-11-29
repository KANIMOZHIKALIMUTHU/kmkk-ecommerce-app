import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }).then(res => res.data),
  getById: (id) => api.get(`/products/${id}`).then(res => res.data)
}

export const authAPI = {
  register: (user) => api.post('/auth/register', user).then(res => res.data),
  login: (credentials) => api.post('/auth/login', credentials).then(res => res.data)
}

export const cartAPI = {
  add: (item) => api.post('/cart/add', item),
  get: () => api.get('/cart').then(res => res.data),
  update: (item) => api.put('/cart/update', item),
  remove: (item) => api.delete('/cart/remove', { data: item }),
  mergeGuestCart: (items) => api.post('/cart/merge', { items })
}

export default api
