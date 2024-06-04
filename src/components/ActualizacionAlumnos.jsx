import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, DataTable, Dialog, HelperText, IconButton, Portal, TextInput, RadioButton } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useReducer, useState } from 'react';
import { formStyles, layoutStyles } from '../styles';
import { actualizarApi, consultarApi, leerApi, registrarApi } from '../api/alumno'

export default function ActualizacionAlumnos({ cambiarFormulario }) {
  const [alumnos, setAlumnos] = useState([]);
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
  const [checked, setChecked] = useState('')
  const [id, setId] = useState('')
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await actualizarApi(id, formData)
        console.log(formData)
        showDialog()
      } catch(error) {
        console.log(error)
      }
      forceRender
    }
  })
  function initialValues() {
    return {
      numeroCuenta: null,
      nombre: null,
      apellidoPaterno: null,
      apellidoMaterno: null,
      correo: null,
      genero: null
    }
  }
  function validationSchema() {
    return {
      numeroCuenta: Yup.string().matches(/^([0-9]{7})$/).required(true),
      nombre: Yup.string().matches(/^([A-Za-zÀ-ÿÑñ\u0020]*)$/).required(true),
      apellidoPaterno: Yup.string().matches(/^([A-Za-zÀ-ÿÑñ\u0020]*)$/).required(true),
      apellidoMaterno: Yup.string().matches(/^([A-Za-zÀ-ÿÑñ\u0020]*)$/).required(true),
      correo: Yup.string().email().required(true),
    }
  }
  return (
    <ScrollView>
      <View style={layoutStyles.container}>
        <Text style={layoutStyles.title}>Modificación de Alumnos</Text>
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
                                    <IconButton icon={require('../../assets/editar.png')} size={20} onPress={async () => {
                                        const data = await consultarApi(item.id)
                                        setData(data)
                                        setId(data.id)
                                        setChecked(data.genero)
                                        formik.setFieldValue("numeroCuenta", data.numeroCuenta)
                                        formik.setFieldValue("nombre", data.nombre)
                                        formik.setFieldValue("apellidoPaterno", data.apellidoPaterno)
                                        formik.setFieldValue("apellidoMaterno", data.apellidoMaterno)
                                        formik.setFieldValue("correo", data.correo)
                                        formik.setFieldValue("genero", data.genero)
                                    }}/>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </>
                    ))
                    }
                </DataTable>
        <HelperText type="error" visible={formik.errors.numeroCuenta !== undefined}>El número de cuenta debe contener 7 dígitos</HelperText>
        <TextInput label="Número de Cuenta" style={formStyles.input} keyboardType="numeric" onChangeText={(text) => formik.setFieldValue("numeroCuenta", text)} value={formik.values.numeroCuenta} error={formik.errors.numeroCuenta}></TextInput>
        <HelperText type="error" visible={formik.errors.nombre !== undefined}>No debe contener números o caracteres especiales</HelperText>
        <TextInput label="Nombre" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("nombre", text)} value={formik.values.nombre} error={formik.errors.nombre}></TextInput>
        <HelperText type="error" visible={formik.errors.apellidoPaterno !== undefined}>No debe contener números o caracteres especiales</HelperText>
        <TextInput label="Apellido Paterno" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("apellidoPaterno", text)} value={formik.values.apellidoPaterno} error={formik.errors.apellidoPaterno}></TextInput>
        <HelperText type="error" visible={formik.errors.apellidoMaterno !== undefined}>No debe contener números o caracteres especiales</HelperText>
        <TextInput label="Apellido Materno" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("apellidoMaterno", text)} value={formik.values.apellidoMaterno} error={formik.errors.apellidoMaterno}></TextInput>
        <HelperText type="error" visible={formik.errors.correo !== undefined}>Dirección de correo no válida</HelperText>
        <TextInput label="Correo Electrónico" style={formStyles.input} keyboardType="email-address" onChangeText={(text) => formik.setFieldValue("correo", text)} value={formik.values.correo} error={formik.errors.correo}></TextInput>
        <View style={formStyles.radioGroup}>
          <Text style={formStyles.radioLabel}>Género</Text>
          <View style={formStyles.radioButton}>
            <RadioButton value="F" status={checked === 'F' ? 'checked' : 'unchecked'} onPress={() => {
              setChecked('F')
              formik.setFieldValue("genero", 'F')
            }} />
            <Text>Femenino</Text>
          </View>
          <View style={formStyles.radioButton}>
            <RadioButton value="M" status={checked === 'M' ? 'checked' : 'unchecked'} onPress={() => {
              setChecked('M')
              formik.setFieldValue("genero", 'M')
            }} />
            <Text>Masculino</Text>
          </View>
        </View>
        <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit}>Guardar</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">El alumno se ha modificado con éxito</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </ScrollView>
  );
}