import axios from 'axios';
import Header from './auth-header'
import { AsyncStorage } from 'react-native';

const API_URL = 'http://192.168.0.23:3001/users'

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      // saving error
      console.log(error)
    }
  }

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log(error)
    }
}
const removeData = async () =>{
    try {
        await AsyncStorage.removeItem('user');
        return true;
    }
    catch(exception) {
        return false;
    }
}

const register = (pseudo, email, password) => {
    return axios.post(API_URL, {
        body: JSON.stringify({
            pseudo: pseudo,
            email: email,
            password: password,
        })
        
    })
};

const login = (email, password) => {
    return axios.post(API_URL + 'signin', {
        email: email,
        password: password
    }, Header)
    .then((response) => {
        if (response.data.accessToken) {
            storeData(response.data)
        }
        return response.data
    })
    .catch((error) => console.log(error))
};

const logout = () => {
    removeData('user')
};

const getCurrentUser = () => {
    return console.log(getData())
};

export default {
	register,
	login,
	logout,
	getCurrentUser
};