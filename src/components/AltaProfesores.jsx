import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Dialog, HelperText, Portal, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react';
import { formStyles, layoutStyles } from '../styles';
import { registrarApi } from '../api/profesor'

export default function AltaProfesores({ cambiarFormulario }) {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await registrarApi(formData)
        console.log(formData)
        showDialog()
      } catch(error) {
        console.log(error)
      }
    }
  })
  function initialValues() {
    return {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correo: ""
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
      <Text style={layoutStyles.title}>Registro de Profesores</Text>
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
              <Text variant="bodyMedium">El profesor se ha agregado con éxito</Text>
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