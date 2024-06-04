import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, DataTable, Dialog, IconButton, Portal } from 'react-native-paper';
import { formStyles, layoutStyles } from '../styles';
import { consultarMateria, leerMateria } from '../api/materia';

export default function VerMaterias({ cambiarFormulario }) {
    const [materias, setMaterias] = useState([]);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    useEffect(() => {
        const fetchData = async () => {
            const materias = await leerMateria()
            setMaterias(materias)
        }
        fetchData()
    }, [])
    return (
        <ScrollView>
            <View style={layoutStyles.container}>
                <Text style={layoutStyles.title}>Materias Registradas</Text>
                <DataTable>
                    <DataTable.Header style={formStyles.tableHead}>
                        <DataTable.Title>Nombre</DataTable.Title>
                        <DataTable.Title>Acciones</DataTable.Title>
                    </DataTable.Header>
                    {materias.map((item) => (
                        <>
                        <DataTable.Row key={item.id} style={formStyles.tableRow}>
                            <DataTable.Cell>{item.nombre}</DataTable.Cell>
                            <DataTable.Cell><IconButton icon={require('../../assets/ver.png')} size={20} onPress={async () => {
                                        const data = await consultarMateria(item.id)
                                        setData(data)
                                        showDialog()
                                    }} />
                                </DataTable.Cell>
                            </DataTable.Row>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog} style={layoutStyles.dialog}>
                                    <Dialog.Title>Consulta de Materia</Dialog.Title>
                                    <Dialog.Content>
                                        <Text variant="bodyMedium" style={layoutStyles.dialogText}>NOMBRE: {data.nombre}</Text>
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