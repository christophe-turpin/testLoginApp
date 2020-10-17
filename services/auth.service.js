import axios from 'axios';
import { AsyncStorage } from 'react-native';

const API_URL = 'http://localhost:3001/api/auth/'

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        // Error saving data
    }
}

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // Our data is fetched successfully
            console.log(value);
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}

const removeData = async (key) =>{
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}

const register = (pseudo, email, password) => {
    return axios.post(`${API_URL}signup`, {
        pseudo,
        email,
        password
    })
};

const login = (email, password) => {
    return axios.post(`${API_URL}signin`, {
        email,
        password
    })
    .then((response) => {
        if (response.data.accessToken) {
            storeData('user', JSON.stringify(response.data))
        }
        return response.data
    })
    .catch((error) => console.log(error))
};

const logout = (props) => {
    removeData('user')
};

const getCurrentUser = () => {
    return console.log(getData('user'))
};

export default {
	register,
	login,
	logout,
	getCurrentUser
};