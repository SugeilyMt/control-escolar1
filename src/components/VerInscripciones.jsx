import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { formStyles, layoutStyles } from '../styles';
import { leerInscripcion } from '../api/inscripcion';

export default function VerInscripciones({ cambiarFormulario }) {
    const [inscripciones, setInscripciones] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const inscripciones = await leerInscripcion()
            setInscripciones(inscripciones)
        }
        fetchData()
    }, [])
    const ins = inscripciones.map(p => {
        const arreglo = p.grupo.split("/")
        const item = {
          "id": p.id,
          "alumno": p.alumno, 
          "grupo": {"materia": arreglo[0], "profesor": arreglo[1], "semestre": arreglo[2], "grupo": arreglo[3]}
        };
        return item})
    return (
        <ScrollView>
            <View style={layoutStyles.container}>
                <Text style={layoutStyles.title}>Inscripciones Registradas</Text>
                <DataTable>
                    <DataTable.Header style={formStyles.tableHead}>
                        <DataTable.Title>Alumno</DataTable.Title>
                        <DataTable.Title>Materia</DataTable.Title>
                        <DataTable.Title>Profesor</DataTable.Title>
                        <DataTable.Title>Semestre</DataTable.Title>
                        <DataTable.Title>Grupo</DataTable.Title>
                        <DataTable.Title>Acciones</DataTable.Title>
                    </DataTable.Header>
                    {ins.map((item) => (
                        <DataTable.Row key={item.id} style={formStyles.tableRow}>
                            <DataTable.Cell>{item.alumno}</DataTable.Cell>
                            <DataTable.Cell>{item.grupo.materia}</DataTable.Cell>
                            <DataTable.Cell>{item.grupo.profesor}</DataTable.Cell>
                            <DataTable.Cell>{item.grupo.semestre}</DataTable.Cell>
                            <DataTable.Cell>{item.grupo.grupo}</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                        </DataTable.Row>
                    ))
                    }
                </DataTable>
                <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Alta de Inscripciones</Button>
            </View>
        </ScrollView>
    )
}