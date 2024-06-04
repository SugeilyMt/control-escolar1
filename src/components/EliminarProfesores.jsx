import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, DataTable, Dialog, IconButton, Portal } from 'react-native-paper';
import { formStyles, layoutStyles } from '../styles';
import { leerProfesor, eliminarProfesor } from '../api/profesor';

export default function EliminarProfesores({ cambiarFormulario, navigation }) {
    const [profesores, setProfesores] = useState([]);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    useEffect(() => {
        const fetchData = async () => {
            const profesores = await leerProfesor()
            setProfesores(profesores)
        }
        fetchData()
    }, [])
    return (
        <ScrollView>
            <View style={layoutStyles.container}>
                <Text style={layoutStyles.title}>Profesores Registrados</Text>
                <DataTable>
                    <DataTable.Header style={formStyles.tableHead}>
                        <DataTable.Title>Nombre</DataTable.Title>
                        <DataTable.Title>Apellido Paterno</DataTable.Title>
                        <DataTable.Title>Apellido Materno</DataTable.Title>
                        <DataTable.Title>Acciones</DataTable.Title>
                    </DataTable.Header>
                    {profesores.map((item) => (
                        <>
                        <DataTable.Row key={item.id} style={formStyles.tableRow}>
                            <DataTable.Cell>{item.nombre}</DataTable.Cell>
                            <DataTable.Cell>{item.apellidoPaterno}</DataTable.Cell>
                            <DataTable.Cell>{item.apellidoMaterno}</DataTable.Cell>
                            <DataTable.Cell>
                            <IconButton icon={require('../../assets/eliminar.png')} size={20} onPress={async () => {
                                        await eliminarProfesor(item.id)
                                        showDialog()
                                    }} />
                                </DataTable.Cell>
                            </DataTable.Row>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog}>
                                    <Dialog.Content>
                                        <Text variant="bodyMedium" style={layoutStyles.dialogText}>El profesor se ha eliminado con éxito</Text>
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