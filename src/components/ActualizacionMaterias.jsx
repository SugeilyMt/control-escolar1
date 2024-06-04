import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, DataTable, Dialog, HelperText, IconButton, Portal, TextInput, RadioButton } from 'react-native-paper';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { formStyles, layoutStyles } from '../styles';
import { actualizarMateria, consultarMateria, leerMateria } from '../api/materia';

export default function ActualizacionMaterias({ cambiarFormulario }) {
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
    const [id, setId] = useState('')
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
          try {
            await actualizarMateria(id, formData)
            console.log(formData)
            showDialog()
          } catch(error) {
            console.log(error)
          }
        }
      })
      function initialValues() {
        return {
          nombre: null
        }
      }
      function validationSchema() {
        return {
          nombre: Yup.string().required(true)
        }
      }
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
                            <DataTable.Cell>
                            <IconButton icon={require('../../assets/editar.png')} size={20} onPress={async () => {
                                        const data = await consultarMateria(item.id)
                                        setData(data)
                                        setId(data.id)
                                        formik.setFieldValue("nombre", data.nombre)
                                    }}/>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </>
                    ))
                    }
                </DataTable>
                <HelperText type="error" visible={formik.errors.nombre !== undefined}>Campo requerido</HelperText>
      <TextInput label="Nombre" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("nombre", text)} value={formik.values.nombre} error={formik.errors.nombre}></TextInput>
      <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit}>Guardar</Button>
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">La materia se ha modificado con éxito</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
            </View>
        </ScrollView>
    )
}