import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { layoutStyles } from '../styles';
import ActualizacionAlumnos from '../components/ActualizacionAlumnos';
import VerAlumnos from '../components/VerAlumnos';

export default function Alumnos() {
    const [showForm, setShowForm] = useState(true)
    const [data, setData] = useState([]);
    const cambiarFormulario = () => setShowForm(!showForm)
    return (
        <View>
            {showForm ? <VerAlumnos cambiarFormulario={cambiarFormulario} /> : <ActualizacionAlumnos cambiarFormulario={{cambiarFormulario, data}} />}
        </View>
    )
}