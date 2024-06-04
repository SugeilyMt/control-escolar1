import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, HelperText, TextInput } from 'react-native-paper'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { formStyles } from '../../styles'
import { registrarApi } from '../../api/usuario'
import { API_URL } from '../../utils/constantes'

export default function FormularioRegistro({cambiarFormulario}) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData)
      console.log(API_URL)
      try {
        await registrarApi(formData)
        console.log('Usuario registrado')
      } catch(error) {
        console.log(error)
      }
    }
  })
  function initialValues() {
    return {
      email: "",
      username: "",
      password: "",
      repetirContr: ""
    }
  }
  function validationSchema() {
    return{
      email: Yup.string().email().required(true),
      username: Yup.string().required(true),
      password: Yup.string().required(true),
      repetirContr: Yup.string().required(true).oneOf([Yup.ref("password")], true)
    }
  }
  return (
    <View>
      <HelperText type="error" visible={formik.errors.email !== undefined}>Dirección de correo no válida</HelperText>
      <TextInput label="Correo Electrónico" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("email", text)} value={formik.values.email} error={formik.errors.email}></TextInput>
      <HelperText type="error" visible={formik.errors.username !== undefined}>Nombre de usuario requerido</HelperText>
      <TextInput label="Nombre de Usuario" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("username", text)} value={formik.values.username} error={formik.errors.username}></TextInput>
      <HelperText type="error" visible={formik.errors.password !== undefined}>Contraseña requerida</HelperText>
      <TextInput label="Contraseña" style={formStyles.input} secureTextEntry onChangeText={(text) => formik.setFieldValue("password", text)} value={formik.values.password} error={formik.errors.password}></TextInput>
      <HelperText type="error" visible={formik.errors.repetirContr !== undefined}>Las contraseñas no coinciden</HelperText>
      <TextInput label="Repetir Contraseña" style={formStyles.input} secureTextEntry onChangeText={(text) => formik.setFieldValue("repetirContr", text)} value={formik.values.repetirContr} error={formik.errors.repetirContr}></TextInput>
      <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit}>Registrarse</Button>
      <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Iniciar Sesión</Button>
    </View>
  )
}

const styles = StyleSheet.create({})