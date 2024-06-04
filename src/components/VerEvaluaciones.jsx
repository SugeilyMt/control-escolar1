import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { formStyles, layoutStyles } from '../styles';
import { leerEvaluacion } from '../api/evaluacion';

export default function VerEvaluaciones({ cambiarFormulario }) {
    const [evaluaciones, setEvaluaciones] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const evaluaciones = await leerEvaluacion()
            setEvaluaciones(evaluaciones)
        }
        fetchData()
    }, [])
    return (
        <ScrollView>
            <View style={layoutStyles.container}>
                <Text style={layoutStyles.title}>Evaluaciones Registradas</Text>
                <DataTable>
                    <DataTable.Header style={formStyles.tableHead}>
                        <DataTable.Title>Tipo</DataTable.Title>
                        <DataTable.Title>Nombre</DataTable.Title>
                        <DataTable.Title>Acciones</DataTable.Title>
                    </DataTable.Header>
                    {evaluaciones.map((item) => (
                        <DataTable.Row key={item.id} style={formStyles.tableRow}>
                            <DataTable.Cell>{item.tipo}</DataTable.Cell>
                            <DataTable.Cell>{item.nombre}</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                        </DataTable.Row>
                    ))
                    }
                </DataTable>
                <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Alta de Evaluaciones</Button>
            </View>
        </ScrollView>
    )
}