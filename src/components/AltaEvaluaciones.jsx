import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Dialog, HelperText, Portal, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react';
import { formStyles, layoutStyles } from '../styles';
import { registrarApi } from '../api/evaluacion'

export default function AltaEvaluaciones({ cambiarFormulario }) {
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
      tipo: "",
      nombre: ""
    }
  }
  function validationSchema() {
    return {
      tipo: Yup.string().required(true),
      nombre: Yup.string().required(true)
    }
  }
  return (
    <ScrollView>
      <View style={layoutStyles.container}>
      <Text style={layoutStyles.title}>Registro de Evaluaciones</Text>
      <HelperText type="error" visible={formik.errors.tipo !== undefined}>Campo requerido</HelperText>
      <TextInput label="Tipo" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("tipo", text)} value={formik.values.tipo} error={formik.errors.tipo}></TextInput>
      <HelperText type="error" visible={formik.errors.nombre !== undefined}>Campo requerido</HelperText>
      <TextInput label="Nombre" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("nombre", text)} value={formik.values.nombre} error={formik.errors.nombre}></TextInput>
      <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit}>Guardar</Button>
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">La evaluación se ha agregado con éxito</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Ver Evaluaciones</Button>
    </View>
    </ScrollView>
  );
}