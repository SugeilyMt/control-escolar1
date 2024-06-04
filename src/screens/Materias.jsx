import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { layoutStyles } from '../styles';
import AltaMaterias from '../components/AltaMaterias';
import VerMaterias from '../components/VerMaterias';

export default function Materias() {
    const [showForm, setShowForm] = useState(true)
    const cambiarFormulario = () => setShowForm(!showForm)
    return (
        <View>
            {showForm ? <AltaMaterias cambiarFormulario={cambiarFormulario} /> : <VerMaterias cambiarFormulario={cambiarFormulario} />}
        </View>
    )
}