import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/user',
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function getAllUsers() {
    const response = await api.get('/all');

    return response.data;
}

export async function getUsersByName(name) {
    const response = await api.get(`/byName?name=${name}`);

    return response.data;
}

export async function createUser(user) {
    const response = await api.post('/create', user);

    return response.data;
}

export async function updateUser(user) {
    const response = await api.put('/update', user);

    return response.data;
}
