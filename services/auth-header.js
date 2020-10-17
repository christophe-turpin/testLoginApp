import CacheStore from 'react-native-cache-store';

export default function authHeader() {
    const user = JSON.parse(CacheStore.get('user'))

    return (user && user.accessToken) ? {'x-access-token': user.accessToken} : {}
    
}