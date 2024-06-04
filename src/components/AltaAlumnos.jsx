import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Dialog, HelperText, Portal, TextInput, RadioButton } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react';
import { formStyles, layoutStyles } from '../styles';
import { registrarApi } from '../api/alumno'

export default function AltaAlumnos({ cambiarFormulario }) {
  const [checked, setChecked] = useState('F')
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
      numeroCuenta: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correo: "",
      genero: checked
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
        <Text style={layoutStyles.title}>Registro de Alumnos</Text>
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
              <Text variant="bodyMedium">El alumno se ha agregado con éxito</Text>
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