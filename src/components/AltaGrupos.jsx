import { StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import { Button, Dialog, List, Portal, TextInput } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react';
import { formStyles, layoutStyles } from '../styles';
import { leerProfesor } from '../api/profesor';
import { leerMateria } from '../api/materia';
import { registrarApi } from '../api/grupo';

export default function AltaGrupos({ cambiarFormulario }) {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [profesor, setProfesor] = useState(null);
  const [materia, setMateria] = useState(null);
  const [cicloEscolar, setCicloEscolar] = useState(null);
  const [semestre, setSemestre] = useState(null);
  const [grupo, setGrupo] = useState(null);
  const [profesores, setProfesores] = useState([])
  const [materias, setMaterias] = useState([])
  useEffect(() => {
      const fetchData = async () => {
          const profesores = await leerProfesor()
          setProfesores(profesores)
      }
      fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
        const materias = await leerMateria()
        setMaterias(materias)
    }
    fetchData()
  }, [])
  const placeholder1 = {
    label: 'Profesor',
    value: null,
  };
  const placeholder2 = {
    label: 'Materia',
    value: null,
  };
  const placeholder3 = {
    label: 'Ciclo Escolar',
    value: null,
  };
  const placeholder4 = {
    label: 'Semestre',
    value: null,
  };
  const placeholder5 = {
    label: 'Grupo',
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
      profesor: null,
      materia: null,
      cicloEscolar: null,
      semestre: null,
      grupo: null
    }
  }
  function validationSchema() {
    return {
      profesor: Yup.string().required(true),
      materia: Yup.string().required(true),
      cicloEscolar: Yup.string().required(true),
      semestre: Yup.number().required(true),
      grupo: Yup.string().required(true)
    }
  }
  const prof = profesores.map(p => {
    const item = {
      "label": `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}`, 
      "value": `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}`};
    return item})
  const mat = materias.map(p => {
    const item = {
      "label": `${p.nombre}`, 
      "value": `${p.nombre}`};
    return item})
  const ciclo = [
    {label: '2023B', value: '2023B'},
    {label: '2024A', value: '2024A'}
  ];
  const sem = [
    {label: '1°', value: 1},
    {label: '2°', value: 2},
    {label: '3°', value: 3},
    {label: '4°', value: 4},
    {label: '5°', value: 6},
    {label: '7°', value: 7},
    {label: '8°', value: 8},
    {label: '9°', value: 9},
    {label: '10°', value: 10},
  ];
  const gr = [
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'}
  ]
  return (
    <ScrollView>
      <View style={layoutStyles.container}>
      <Text style={layoutStyles.title}>Registro de Grupos</Text>
      <RNPickerSelect placeholder={placeholder1}
        items={prof}
        onValueChange={(value) => {
          setProfesor(value)
          formik.setFieldValue("profesor", profesor)}
        }
        value={profesor}
        style={formStyles.comboBox}>
      </RNPickerSelect>
      <RNPickerSelect placeholder={placeholder2}
        items={mat}
        onValueChange={(value) => {
          setMateria(value)
          formik.setFieldValue("materia", materia)}}
        value={materia}
        style={formStyles.comboBox}>
      </RNPickerSelect>
      <RNPickerSelect placeholder={placeholder3}
        items={ciclo}
        onValueChange={(value) => {
          setCicloEscolar(value)
          formik.setFieldValue("cicloEscolar", cicloEscolar)}
        }
        value={cicloEscolar}
        style={formStyles.comboBox}>
      </RNPickerSelect>
      <RNPickerSelect placeholder={placeholder4}
        items={sem}
        onValueChange={(value) => {
          setSemestre(value)
          formik.setFieldValue("semestre", semestre)}}
        value={semestre}
        style={formStyles.comboBox}>
      </RNPickerSelect>
      <RNPickerSelect placeholder={placeholder5}
        items={gr}
        onValueChange={(value) => {
          setGrupo(value)
          formik.setFieldValue("grupo", grupo)}}
        value={grupo}
        style={formStyles.comboBox}>
      </RNPickerSelect>
      <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit}>Guardar</Button>
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">El grupo se ha agregado con éxito</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      <Button mode='text' style={formStyles.btnText} labelStyle={formStyles.btnLabel} onPress={cambiarFormulario}>Ver Grupos</Button>
    </View>
    </ScrollView>
  );
}