import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { layoutStyles } from '../styles';
import FormularioInicioSesion from '../components/auth/FormularioInicioSesion';
import FormularioRegistro from '../components/auth/FormularioRegistro';

export default function Auth() {
    const [showLogin, setShowLogin] = useState(false)
    const cambiarFormulario = () => setShowLogin(!showLogin)
    return (
        <View style={layoutStyles.container}>
            <Image source={logo} style={layoutStyles.logo}></Image>
            {showLogin ? <FormularioInicioSesion cambiarFormulario={cambiarFormulario}/> : <FormularioRegistro cambiarFormulario={cambiarFormulario}/>}
        </View>
    )
}