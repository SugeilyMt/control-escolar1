import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { layoutStyles } from '../styles';
import AltaProfesores from '../components/AltaProfesores';
import VerProfesores from '../components/VerProfesores';

export default function Profesores() {
    const [showForm, setShowForm] = useState(true)
    const cambiarFormulario = () => setShowForm(!showForm)
    return (
        <View>
            {showForm ? <AltaProfesores cambiarFormulario={cambiarFormulario} /> : <VerProfesores cambiarFormulario={cambiarFormulario} />}
        </View>
    )
}