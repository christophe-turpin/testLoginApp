import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator }  from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './context'
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import Search from './screens/Search';
import Home from './screens/Home';
import Details from './screens/Details';
import Search2 from './screens/Search2';
import Profile from './screens/Profile'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios'

const API_URL = 'http://192.168.0.23:3001/api/auth/'
const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name='Home' component={Home}/>
    <HomeStack.Screen name='Details' component={Details} options={({route})=>({
      title: route.params.name
    })}
    />
  </HomeStack.Navigator>
)

const SearchStack = createStackNavigator();

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name='Search' component={Search}/>
    <SearchStack.Screen name='Search2' component={Search2}/>
  </SearchStack.Navigator>
)

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name='Profile' component={Profile}/>
  </ProfileStack.Navigator>
)

const Tab = createBottomTabNavigator();

const TabsScreen = () => (
  <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen}/>
      <Tab.Screen name="Search" component={SearchStackScreen}/>
  </Tab.Navigator>
)

const Drawer = createDrawerNavigator()

const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName='Profile'>
    <Drawer.Screen name='Home' component={TabsScreen} />
    <Drawer.Screen name='Profile' component={ProfileStackScreen} />
  </Drawer.Navigator>
)

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode='none'>
    <AuthStack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In'}}/>
    <AuthStack.Screen name='CreateAccount' component={CreateAccount} options={{ title: 'Create Account'}}/>
  </AuthStack.Navigator>
)

const RootStack = createStackNavigator()

const RootStackScreen = ({token}) => (
  <RootStack.Navigator headerMode='none'>
    {token ? (
    <RootStack.Screen name='App' component={DrawerScreen} options={{ animationEnabled: false}}/>
    ) : (
    <RootStack.Screen name='Auth' component={AuthStackScreen} options={{ animationEnabled: false}}/>
    )}
  </RootStack.Navigator>
)

export default () => {
  // initialLoginState = {
    const [isLoading,setIsLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [token, setToken] = useState(null)
  // }

  // const loginReducer = (prevState, action) => {
  //   switch (action.type) {
  //     case 'RETRIEVE_TOKEN':
  //       return {
  //         ...prevState,
  //         username: action.pseudo,
  //         email: action.email, 
  //         token: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGIN':
  //       return {
  //         ...prevState,
  //         username: action.pseudo,
  //         email: action.email, 
  //         token: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGOUT':
  //       return {
  //         ...prevState,
  //         username: null,
  //         email: null, 
  //         token: null,
  //         isLoading: false,
  //       };
  //     case 'REGISTER':
  //       return {
  //         ...prevState,
  //         username: action.pseudo,
  //         email: action.email, 
  //         token: action.token,
  //         isLoading: false,
  //       };
  //   }
  // }

  // const [ loginState, dispatch ] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: (email, password) => {
      let user = null
      return axios.post(API_URL + 'signin', {
        email,
        password
      })
		.then(async(response) => {
			if (response.data) {
        try {
          setUsername(response.data.pseudo)
          setUserEmail(response.data.email)
          setToken(response.data.accessToken)
          user = JSON.stringify(response.data)
          // pseudo = response.data.pseudo
          // mail = response.data.email
          // token = response.data.accessToken
          await AsyncStorage.setItem('user', user)
        }catch (e) {
          // saving error
          console.log(e)
        }
			}
      return response.data;
		})
    },
    signUp: (pseudo, email, password) => {
      // setUserToken('asdf')
      return axios.post(API_URL + 'signup', {
        pseudo,
        email,
        password
      }).then(() => signIn(email, password))
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('user')
      } catch(e) {
        console.log(e);
      }
      setUsername(null)
      setUserEmail(null)
      setToken(null)
      setIsLoading(false);
    },
  }), [])

  useEffect(() => {
    setTimeout(async()=>{
      let user = null;
      try {
        let jsonGetValue = await AsyncStorage.getItem('user')
        if (jsonGetValue != null) {
          user = JSON.parse(jsonGetValue)
          setUsername(user.pseudo)
          setUserEmail(user.email)
          setToken(user.accessToken)
         }
      } catch(e) {
        console.log(e);
      }
     
      setIsLoading(false)
    }, 1000)
    
  }, [username, userEmail, token])

  if (isLoading) {
    return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size='large'/>
    </SafeAreaView>
    )
  }
  return (
    <AuthContext.Provider value={authContext}> 
      <NavigationContainer>
        <RootStackScreen token = {token} />
      </NavigationContainer>
    </AuthContext.Provider>
  )}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
})