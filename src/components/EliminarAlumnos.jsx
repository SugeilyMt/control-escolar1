import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, DataTable, Dialog, IconButton, Portal } from 'react-native-paper';
import { formStyles, layoutStyles } from '../styles';
import { leerApi, consultarApi, eliminarApi } from '../api/alumno';
import ActualizacionAlumnos from './ActualizacionAlumnos';

export default function EliminarAlumnos({ cambiarFormulario, navigation }) {
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
                                    <IconButton icon={require('../../assets/eliminar.png')} size={20} onPress={async () => {
                                        await eliminarApi(item.id)
                                        showDialog()
                                    }} />
                                </DataTable.Cell>
                            </DataTable.Row>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog}>
                                    <Dialog.Content>
                                        <Text variant="bodyMedium" style={layoutStyles.dialogText}>El alumno se ha eliminado con éxito</Text>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button onPress={hideDialog}>Aceptar</Button>
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