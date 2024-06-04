import { StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import { Button, Dialog, List, Portal, TextInput } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react';
import { formStyles, layoutStyles } from '../styles';
import { leerGrupo } from '../api/grupo';
import { leerApi } from '../api/alumno';
import { registrarApi } from '../api/inscripcion';

export default function AltaInscripciones({ cambiarFormulario }) {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [grupo, setGrupo] = useState(null);
  const [alumno, setAlumno] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const grupos = await leerGrupo()
      setGrupos(grupos)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const alumnos = await leerApi()
      setAlumnos(alumnos)
    }
    fetchData()
  }, [])
  const placeholder1 = {
    label: 'Grupo',
    value: null,
  };
  const placeholder2 = {
    label: 'Alumno',
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
      grupo: null,
      alumno: null
    }
  }
  function validationSchema() {
    return {
      grupo: Yup.string().required(true),
      alumno: Yup.string().required(true)
    }
  }
  const gr = grupos.map(p => {
    const item = {
      "label": `${p.materia}/${p.profesor}/${p.semestre}/${p.grupo}`, 
      "value": `${p.materia}/${p.profesor}/${p.semestre}/${p.grupo}`};
    return item})
  const al = alumnos.map(p => {
    const item = {
      "label": `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}`, 
      "value": `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}`};
    return item})
  return (
    <ScrollView>
      <View style={layoutStyles.container}>
      <Text style={layoutStyles.title}>Registro de Inscripciones</Text>
      <RNPickerSelect placeholder={placeholder1}
        items={gr}
        onValueChange={(value) => {
          setGrupo(value)
          formik.setFieldValue("grupo", grupo)}
        }
        value={grupo}
        style={formStyles.comboBox}>
      </RNPickerSelect>
      <RNPickerSelect placeholder={placeholder2}
        items={al}
        onValueChange={(value) => {
          setAlumno(value)
          formik.setFieldValue("alumno", alumno)}
        }
        value={alumno}
        style={formStyles.comboBox}>
      </RNPickerSelect>
      <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit}>Guardar</Button>
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">La inscripción se ha agregado con éxito</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Ver Inscripciones</Button>
    </View>
    </ScrollView>
  );
}