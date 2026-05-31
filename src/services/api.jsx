import axios from "axios";

const api = axios.create({
  baseURL: "https://petadopt.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@PetAdopt:token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/user/login", { email, password });
    
    if (response.data && response.data.token) {
      localStorage.setItem("@PetAdopt:token", response.data.token);
      
      const nameToSave = response.data.user?.name || response.data.name || "Usuário Logado";
      localStorage.setItem("@PetAdopt:userName", nameToSave);
    }
    
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "E-mail ou senha incorretos.";
    throw new Error(errorMsg);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/user/register", userData);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Erro ao realizar o cadastro.";
    throw new Error(errorMsg);
  }
};

export const getPets = async (page = 1) => {
  try {
    const response = await api.get(`/pet/pets?page=${page}`);
    
    return response.data.pets || [];
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Erro ao buscar a lista de pets.";
    throw new Error(errorMsg);
  }
};

export const getPetById = async (id) => {
  try {
    const response = await api.get(`/pet/${id}`);
    return response.data.pet || response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Erro ao buscar os detalhes do pet.";
    throw new Error(errorMsg);
  }
};

export const createPet = async (petData) => {
  try {
const response = await api.post('/pet/create', petData);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Erro ao cadastrar o pet.';
    throw new Error(errorMsg);
  }
};