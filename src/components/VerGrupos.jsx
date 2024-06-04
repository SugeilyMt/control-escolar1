import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { formStyles, layoutStyles } from '../styles';
import { leerGrupo } from '../api/grupo';

export default function VerGrupos({ cambiarFormulario }) {
    const [grupos, setGrupos] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const grupos = await leerGrupo()
            setGrupos(grupos)
        }
        fetchData()
    }, [])
    return (
        <ScrollView>
            <View style={layoutStyles.container}>
                <Text style={layoutStyles.title}>Grupos Registrados</Text>
                <DataTable>
                    <DataTable.Header style={formStyles.tableHead}>
                        <DataTable.Title>Profesor</DataTable.Title>
                        <DataTable.Title>Materia</DataTable.Title>
                        <DataTable.Title>Ciclo Escolar</DataTable.Title>
                        <DataTable.Title>Semestre</DataTable.Title>
                        <DataTable.Title>Grupo</DataTable.Title>
                        <DataTable.Title>Acciones</DataTable.Title>
                    </DataTable.Header>
                    {grupos.map((item) => (
                        <DataTable.Row key={item.id} style={formStyles.tableRow}>
                            <DataTable.Cell>{item.profesor}</DataTable.Cell>
                            <DataTable.Cell>{item.materia}</DataTable.Cell>
                            <DataTable.Cell>{item.cicloEscolar}</DataTable.Cell>
                            <DataTable.Cell>{item.semestre}</DataTable.Cell>
                            <DataTable.Cell>{item.grupo}</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                        </DataTable.Row>
                    ))
                    }
                </DataTable>
                <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Alta de Grupos</Button>
            </View>
        </ScrollView>
    )
}