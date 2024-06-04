import { StyleSheet, Text, View } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { formStyles } from '../../styles'
import { loginApi } from '../../api/usuario'
import useAuth from '../../hooks/useAuth'

export default function FormularioInicioSesion({cambiarFormulario}) {
  const {login} = useAuth()
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData)
      try {
        const respuesta = await loginApi(formData)
        if (respuesta.statusCode) throw "Error"
        login(respuesta)
      } catch(error) {
        console.log(error)
      }
    }
  })
  function initialValues() {
    return {
      identifier: "",
      password: ""
    }
  }
  function validationSchema() {
    return{
      identifier: Yup.string().email().required(true),
      password: Yup.string().required(true)
    }
  }
  return (
    <View>
      <HelperText type="error" visible={formik.errors.identifier !== undefined}>Dirección de correo no válida</HelperText>
      <TextInput label="Correo Electrónico o Nombre de Usuario" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("identifier", text)} value={formik.values.identifier} error={formik.errors.identifier}></TextInput>
      <HelperText type="error" visible={formik.errors.password !== undefined}>Contraseña requerida</HelperText>
      <TextInput label="Contraseña" style={formStyles.input} secureTextEntry onChangeText={(text) => formik.setFieldValue("password", text)} value={formik.values.password} error={formik.errors.password}></TextInput>
      <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit}>Iniciar Sesión</Button>
      <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Registrarse</Button>
    </View>
  )
}

const styles = StyleSheet.create({})