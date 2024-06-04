import { Button, Image, StyleSheet, View, Text } from 'react-native'
import React from 'react'

export default function CierreSesion({authData}) {
    return (
        <View style={styles.container}>
            <Text>Zona de Usuarios: {authData.auth.nombreUsuario}</Text>
            <Button title="Cerrar Sesión" onPress={authData.logout}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})