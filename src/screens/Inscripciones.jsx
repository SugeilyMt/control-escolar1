import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { layoutStyles } from '../styles';
import AltaInscripciones from '../components/AltaInscripciones';
import VerInscripciones from '../components/VerInscripciones';

export default function Inscripciones() {
    const [showForm, setShowForm] = useState(true)
    const cambiarFormulario = () => setShowForm(!showForm)
    return (
        <View>
            {showForm ? <AltaInscripciones cambiarFormulario={cambiarFormulario} /> : <VerInscripciones cambiarFormulario={cambiarFormulario} />}
        </View>
    )
}