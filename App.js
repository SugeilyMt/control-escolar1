import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { PaperProvider, Provider } from 'react-native-paper';
import { jwtDecode } from 'jwt-decode';
import Auth from './src/screens/Auth';
import AuthContext from './src/context/AuthContext';
import { getToken, setToken, removeToken } from './src/api/token';
import Screen from './src/screens/Screen';

export default function App() {
  const [auth, setAuth] = useState(undefined)
  useEffect(() => {
    async function fetchData() {
      const token = await getToken()
      if (token) {
        setAuth({
          token,
          id: jwtDecode(token).id
          //nombreUsuario: 
        })
        console.log("Sesión iniciada")
        console.log(token)
        console.log(authData)
      } else {
        setAuth(null)
      }
    }
    fetchData()
  }, [])
  const login = (usuario) => {
    console.log(usuario.user.username)
    setToken(usuario.jwt)
    setAuth({
      token: usuario.jwt,
      id: usuario.user._id,
      //nombreUsuario: usuario.user.username
    })
  }
  const logout = () => {
    if (auth) {
      removeToken()
      setAuth(null)
    }
  }
  const authData = useMemo( 
    () => ({
      auth,
      login,
      logout
  }),
  [auth])
  if (auth === undefined) return null
  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? <Screen authData={authData}></Screen> : <Auth></Auth>}
      </PaperProvider>
    </AuthContext.Provider>
  );
}