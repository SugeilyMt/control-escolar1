import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { layoutStyles } from '../styles';
import AltaCalificaciones from '../components/AltaCalificaciones';
import VerCalificaciones from '../components/VerCalificaciones';

export default function Calificaciones() {
    const [showForm, setShowForm] = useState(true)
    const cambiarFormulario = () => setShowForm(!showForm)
    return (
        <View>
            {showForm ? <AltaCalificaciones cambiarFormulario={cambiarFormulario} /> : <VerCalificaciones cambiarFormulario={cambiarFormulario} />}
        </View>
    )
}