import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { formStyles, layoutStyles } from '../styles';
import { leerCalificacion } from '../api/calificacion';

export default function VerCalificaciones({ cambiarFormulario }) {
    const [calificaciones, setCalificaciones] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const calificaciones = await leerCalificacion()
            setCalificaciones(calificaciones)
        }
        fetchData()
    }, [])
    const calif = calificaciones.map(p => {
        const arreglo = p.inscripcion.split("/")
        const item = {
          "id": p.id,
          "calificacion": p.calificacion, 
          "inscripcion": {"materia": arreglo[0], "profesor": arreglo[1], "semestre": arreglo[2], "grupo": arreglo[3], "alumno": arreglo[4]}
        };
        return item})
    return (
        <ScrollView>
            <View style={layoutStyles.container}>
                <Text style={layoutStyles.title}>Calificaciones Registradas</Text>
                <DataTable>
                    <DataTable.Header style={formStyles.tableHead}>
                        <DataTable.Title>Alumno</DataTable.Title>
                        <DataTable.Title>Materia</DataTable.Title>
                        <DataTable.Title>Profesor</DataTable.Title>
                        <DataTable.Title>Semestre</DataTable.Title>
                        <DataTable.Title>Grupo</DataTable.Title>
                        <DataTable.Title>Calificación</DataTable.Title>
                        <DataTable.Title>Acciones</DataTable.Title>
                    </DataTable.Header>
                    {calif.map((item) => (
                        <DataTable.Row key={item.id} style={formStyles.tableRow}>
                            <DataTable.Cell>{item.inscripcion.alumno}</DataTable.Cell>
                            <DataTable.Cell>{item.inscripcion.materia}</DataTable.Cell>
                            <DataTable.Cell>{item.inscripcion.profesor}</DataTable.Cell>
                            <DataTable.Cell>{item.inscripcion.semestre}</DataTable.Cell>
                            <DataTable.Cell>{item.inscripcion.grupo}</DataTable.Cell>
                            <DataTable.Cell>{item.calificacion}</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                        </DataTable.Row>
                    ))
                    }
                </DataTable>
                <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Alta de Calificaciones</Button>
            </View>
        </ScrollView>
    )
}