import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:5513',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
})

export const login = async (data: {email: string, password: string}) => {
    return api.post('/api/v0/users/login', data)
}