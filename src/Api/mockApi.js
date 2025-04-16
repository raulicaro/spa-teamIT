import axios from "axios";
const API_URL = 'http://localhost:5000/items';
const FAKE_JWT = 'fake-jwt-token-123';

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === '123') {
        resolve({ token: FAKE_JWT });
      } else {
        reject('Usuário ou senha inválidos');
      }
    }, 1000);
  });
};

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar os dados');
  }
};

export const addItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao adicionar o item');
  }
};

export const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao deletar o item');
  }
};

export const editItem = async (id, updatedItem) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedItem, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FAKE_JWT}`
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao editar o item');
  }
};

