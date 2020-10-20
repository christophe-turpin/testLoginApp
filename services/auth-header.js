
import { AsyncStorage } from 'react-native';

export default async function authHeader() {
    const user = await JSON.parse(AsyncStorage.getItem('user'))

    return (user && user.accessToken) ? {'Authorization': 'Bearer' + user.accessToken} : {}
    
}