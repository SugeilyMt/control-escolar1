import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, DataTable, Dialog, HelperText, IconButton, Portal, TextInput, RadioButton } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useReducer, useState } from 'react';
import { formStyles, layoutStyles } from '../styles';
import { actualizarProfesor, consultarProfesor, leerProfesor, registrarApi } from '../api/profesor'

export default function ActualizacionProfesores({ cambiarFormulario }) {
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
    const [id, setId] = useState('')
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await actualizarProfesor(id, formData)
        console.log(formData)
        showDialog()
      } catch(error) {
        console.log(error)
      }
    }
  })
  function initialValues() {
    return {
      nombre: null,
      apellidoPaterno: null,
      apellidoMaterno: null,
      correo: null
    }
  }
  function validationSchema() {
    return {
      nombre: Yup.string().matches(/^([A-Za-zÀ-ÿÑñ\u0020]*)$/).required(true),
      apellidoPaterno: Yup.string().matches(/^([A-Za-zÀ-ÿÑñ\u0020]*)$/).required(true),
      apellidoMaterno: Yup.string().matches(/^([A-Za-zÀ-ÿÑñ\u0020]*)$/).required(true),
      correo: Yup.string().email().required(true),
    }
  }
    return (
        <ScrollView>
            <View style={layoutStyles.container}>
                <Text style={layoutStyles.title}>Modificación de Profesores</Text>
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
                            <IconButton icon={require('../../assets/editar.png')} size={20} onPress={async () => {
                                        const data = await consultarProfesor(item.id)
                                        setData(data)
                                        setId(data.id)
                                        formik.setFieldValue("nombre", data.nombre)
                                        formik.setFieldValue("apellidoPaterno", data.apellidoPaterno)
                                        formik.setFieldValue("apellidoMaterno", data.apellidoMaterno)
                                        formik.setFieldValue("correo", data.correo)
                                    }}/>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </>
                    ))
                    }
                </DataTable>
                <HelperText type="error" visible={formik.errors.nombre !== undefined}>No debe contener números o caracteres especiales</HelperText>
      <TextInput label="Nombre" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("nombre", text)} value={formik.values.nombre} error={formik.errors.nombre}></TextInput>
      <HelperText type="error" visible={formik.errors.apellidoPaterno !== undefined}>No debe contener números o caracteres especiales</HelperText>
      <TextInput label="Apellido Paterno" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("apellidoPaterno", text)} value={formik.values.apellidoPaterno} error={formik.errors.apellidoPaterno}></TextInput>
      <HelperText type="error" visible={formik.errors.apellidoMaterno !== undefined}>No debe contener números o caracteres especiales</HelperText>
      <TextInput label="Apellido Materno" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("apellidoMaterno", text)} value={formik.values.apellidoMaterno} error={formik.errors.apellidoMaterno}></TextInput>
      <HelperText type="error" visible={formik.errors.correo !== undefined}>Dirección de correo no válida</HelperText>
      <TextInput label="Correo Electrónico" style={formStyles.input} keyboardType="email-address" onChangeText={(text) => formik.setFieldValue("correo", text)} value={formik.values.correo} error={formik.errors.correo}></TextInput>
      <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit}>Guardar</Button>
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">El profesor se ha modificado con éxito</Text>
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