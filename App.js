import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator }  from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'

import { AuthContext } from './context'
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import Search from './screens/Search';
import Home from './screens/Home';
import Details from './screens/Details';
import Search2 from './screens/Search2';
import Profile from './screens/Profile'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';


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
  <AuthStack.Navigator>
    <AuthStack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In'}}/>
    <AuthStack.Screen name='CreateAccount' component={CreateAccount} options={{ title: 'Create Account'}}/>
  </AuthStack.Navigator>
)

const RootStack = createStackNavigator()

const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator headerMode='none'>
    {userToken ? (
    <RootStack.Screen name='App' component={DrawerScreen} options={{ animationEnabled: false}}/>
    ) : (
    <RootStack.Screen name='Auth' component={AuthStackScreen} options={{ animationEnabled: false}}/>
    )}
  </RootStack.Navigator>
)

export default () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState(null)

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('asdf')
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('asdf')
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null)
      },
    }
  }, [])

  useEffect(() => {
    setTimeout(()=>{
      setIsLoading(false)
    }, 1000)
  }, [])

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
        <RootStackScreen userToken={userToken}/>
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