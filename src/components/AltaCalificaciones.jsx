import { StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import { Button, Dialog, HelperText, List, Portal, TextInput } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react';
import { formStyles, layoutStyles } from '../styles';
import { leerInscripcion } from '../api/inscripcion';
import { registrarApi } from '../api/calificacion';

export default function AltaCalificaciones({ cambiarFormulario }) {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [inscripcion, setInscripcion] = useState(null);
  const [inscripciones, setInscripciones] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const inscripciones = await leerInscripcion()
      setInscripciones(inscripciones)
    }
    fetchData()
  }, [])
  const placeholder = {
    label: 'Inscripción',
    value: null,
  };
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
      inscripcion: null,
      calificacion: 0
    }
  }
  function validationSchema() {
    return {
      inscripcion: Yup.string().required(true),
      calificacion: Yup.number().max(10).min(0).required(true)
    }
  }
  const ins = inscripciones.map(p => {
    const item = {
      "label": `${p.grupo}/${p.alumno}`, 
      "value": `${p.grupo}/${p.alumno}`};
    return item})
  return (
    <ScrollView>
      <View style={layoutStyles.container}>
      <Text style={layoutStyles.title}>Registro de Calificaciones</Text>
      <RNPickerSelect placeholder={placeholder}
        items={ins}
        onValueChange={(value) => {
          setInscripcion(value)
          formik.setFieldValue("inscripcion", inscripcion)}}
        value={inscripcion}
        style={formStyles.comboBox}>
      </RNPickerSelect>
      <HelperText type="error" visible={formik.errors.calificacion !== undefined}>La calificación debe ser entre 0 y 10</HelperText>
      <TextInput label="Calificación" style={formStyles.input} keyboardType="numeric" onChangeText={(text) => formik.setFieldValue("calificacion", text)} value={formik.values.calificacion} error={formik.errors.calificacion}></TextInput>
      <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit}>Guardar</Button>
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">La calificación se ha agregado con éxito</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Ver Calificaciones</Button>
    </View>
    </ScrollView>
  );
}