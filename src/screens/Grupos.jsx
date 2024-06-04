import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { layoutStyles } from '../styles';
import AltaGrupos from '../components/AltaGrupos';
import VerGrupos from '../components/VerGrupos';

export default function Grupos() {
    const [showForm, setShowForm] = useState(true)
    const cambiarFormulario = () => setShowForm(!showForm)
    return (
        <View>
            {showForm ? <AltaGrupos cambiarFormulario={cambiarFormulario} /> : <VerGrupos cambiarFormulario={cambiarFormulario} />}
        </View>
    )
}