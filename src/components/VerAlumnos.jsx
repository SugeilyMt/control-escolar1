import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, DataTable, Dialog, IconButton, Portal } from 'react-native-paper';
import { formStyles, layoutStyles } from '../styles';
import { leerApi, consultarApi } from '../api/alumno';
import ActualizacionAlumnos from './ActualizacionAlumnos';

export default function VerAlumnos({ cambiarFormulario, navigation }) {
    const [alumnos, setAlumnos] = useState([])
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    useEffect(() => {
        const fetchData = async () => {
            const alumnos = await leerApi()
            setAlumnos(alumnos)
        }
        fetchData()
    }, [])
    return (
        <ScrollView>
            <View style={layoutStyles.container}>
                <Text style={layoutStyles.title}>Alumnos Registrados</Text>
                <DataTable>
                    <DataTable.Header style={formStyles.tableHead}>
                        <DataTable.Title>Número de Cuenta</DataTable.Title>
                        <DataTable.Title>Nombre</DataTable.Title>
                        <DataTable.Title>Apellido Paterno</DataTable.Title>
                        <DataTable.Title>Apellido Materno</DataTable.Title>
                        <DataTable.Title>Acciones</DataTable.Title>
                    </DataTable.Header>
                    {alumnos.map((item) => (
                        <>
                            <DataTable.Row key={item.id} style={formStyles.tableRow}>
                                <DataTable.Cell>{item.numeroCuenta}</DataTable.Cell>
                                <DataTable.Cell>{item.nombre}</DataTable.Cell>
                                <DataTable.Cell>{item.apellidoPaterno}</DataTable.Cell>
                                <DataTable.Cell>{item.apellidoMaterno}</DataTable.Cell>
                                <DataTable.Cell>
                                    <IconButton icon={require('../../assets/ver.png')} size={20} onPress={async () => {
                                        const data = await consultarApi(item.id)
                                        setData(data)
                                        showDialog()
                                    }} />
                                </DataTable.Cell>
                            </DataTable.Row>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog} style={layoutStyles.dialog}>
                                    <Dialog.Title>Consulta de Alumno</Dialog.Title>
                                    <Dialog.Content>
                                        <Text variant="bodyMedium" style={layoutStyles.dialogText}>NÚMERO DE CUENTA: {data.numeroCuenta}</Text>
                                        <Text variant="bodyMedium" style={layoutStyles.dialogText}>NOMBRE: {data.nombre}</Text>
                                        <Text variant="bodyMedium" style={layoutStyles.dialogText}>APELLIDO PATERNO: {data.apellidoPaterno}</Text>
                                        <Text variant="bodyMedium" style={layoutStyles.dialogText}>APELLIDO MATERNO: {data.apellidoMaterno}</Text>
                                        <Text variant="bodyMedium" style={layoutStyles.dialogText}>CORREO ELECTRÓNICO: {data.correo}</Text>
                                        <Text variant="bodyMedium" style={layoutStyles.dialogText}>GÉNERO: {data.genero}</Text>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button onPress={hideDialog}>Cerrar</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </>
                    ))
                    }
                </DataTable>
            </View>
        </ScrollView>
    )
}