import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { layoutStyles } from '../styles';
import AltaEvaluaciones from '../components/AltaEvaluaciones';
import VerEvaluaciones from '../components/VerEvaluaciones';

export default function Evaluaciones() {
    const [showForm, setShowForm] = useState(true)
    const cambiarFormulario = () => setShowForm(!showForm)
    return (
        <View>
            {showForm ? <AltaEvaluaciones cambiarFormulario={cambiarFormulario} /> : <VerEvaluaciones cambiarFormulario={cambiarFormulario} />}
        </View>
    )
}