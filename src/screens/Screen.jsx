import { Button, ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { layoutStyles } from '../styles';
import ActualizacionAlumnos from '../components/ActualizacionAlumnos';
import ActualizacionMaterias from '../components/ActualizacionMaterias';
import ActualizacionProfesores from '../components/ActualizacionProfesores';
import AltaAlumnos from '../components/AltaAlumnos';
import AltaMaterias from '../components/AltaMaterias'
import EliminarMaterias from '../components/EliminarMaterias';
import AltaProfesores from '../components/AltaProfesores';
import Calificaciones from './Calificaciones';
import Evaluaciones from './Evaluaciones';
import Grupos from './Grupos';
import Inscripciones from './Inscripciones';
import EliminarAlumnos from '../components/EliminarAlumnos';
import EliminarProfesores from '../components/EliminarProfesores';
import VerAlumnos from '../components/VerAlumnos';
import VerMaterias from '../components/VerMaterias'
import VerProfesores from '../components/VerProfesores';

const Drawer = createDrawerNavigator();
export default function Screen({authData}) {
    const MenuItems = ({navigation}) => {
      return (
        <ScrollView>
          <View style={layoutStyles.userContainer}>
            <Image source={require('../../assets/user_.png')} style={layoutStyles.userImage} />
          </View>
          <View>
            <Text style={layoutStyles.menuTitle}>Menú</Text>
          </View>
          <View style={layoutStyles.menuTable}>
            <Image source={require('../../assets/alumno.png')} style={layoutStyles.icon}></Image>
            <Text style={layoutStyles.menuText}>Alumnos</Text>
          </View>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Alta Alumnos')}>
            <Text style={layoutStyles.menuText}>Alta Alumnos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Ver Alumnos')}>
            <Text style={layoutStyles.menuText}>Ver Alumnos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Actualización Alumnos')}>
            <Text style={layoutStyles.menuText}>Actualizar Alumnos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Eliminar Alumnos')}>
            <Text style={layoutStyles.menuText}>Eliminar Alumnos</Text>
          </TouchableOpacity>
          <View style={layoutStyles.menuTable}>
            <Image source={require('../../assets/profesor.png')} style={layoutStyles.icon}></Image>
            <Text style={layoutStyles.menuText}>Profesores</Text>
          </View>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Alta Profesores')}>
            <Text style={layoutStyles.menuText}>Alta Profesores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Ver Profesores')}>
            <Text style={layoutStyles.menuText}>Ver Profesores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Actualización Profesores')}>
            <Text style={layoutStyles.menuText}>Actualizar Profesores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Eliminar Profesores')}>
            <Text style={layoutStyles.menuText}>Eliminar Profesores</Text>
          </TouchableOpacity>
          <View style={layoutStyles.menuTable}>
            <Image source={require('../../assets/materia.png')} style={layoutStyles.icon}></Image>
            <Text style={layoutStyles.menuText}>Materias</Text>
          </View>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Alta Materias')}>
            <Text style={layoutStyles.menuText}>Alta Materias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Ver Materias')}>
            <Text style={layoutStyles.menuText}>Ver Materias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Actualización Materias')}>
            <Text style={layoutStyles.menuText}>Actualizar Materias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption} onPress={() => navigation.navigate('Eliminar Materias')}>
            <Text style={layoutStyles.menuText}>Eliminar Materias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuTable} onPress={() => navigation.navigate('Evaluaciones')}>
            <Image source={require('../../assets/evaluacion.png')} style={layoutStyles.icon}></Image>
            <Text style={layoutStyles.menuText}>Evaluaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Alta Evaluaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Ver Evaluaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Actualizar Evaluaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Eliminar Evaluaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuTable} onPress={() => navigation.navigate('Grupos')}>
            <Image source={require('../../assets/grupo.png')} style={layoutStyles.icon}></Image>
            <Text style={layoutStyles.menuText}>Grupos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Alta Grupos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Ver Grupos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Actualizar Grupos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Eliminar Grupos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuTable} onPress={() => navigation.navigate('Inscripciones')}>
            <Image source={require('../../assets/inscripcion.png')} style={layoutStyles.icon}></Image>
            <Text style={layoutStyles.menuText}>Inscripciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Alta Inscripciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Ver Inscripciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Actualizar Inscripciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Eliminar Inscripciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuTable} onPress={() => navigation.navigate('Calificaciones')}>
            <Image source={require('../../assets/calificacion.png')} style={layoutStyles.icon}></Image>
            <Text style={layoutStyles.menuText}>Calificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Alta Calificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Ver Calificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Actualizar Calificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuOption}>
            <Text style={layoutStyles.menuText}>Eliminar Calificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={layoutStyles.menuTable} onPress={authData.logout}>
            <Image source={require('../../assets/logout.png')} style={layoutStyles.icon}></Image>
            <Text style={layoutStyles.menuText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } 
    return (
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Alta Alumnos" drawerContent={(props) => <MenuItems {...props} />}>
        <Drawer.Screen name="Alta Alumnos" component={AltaAlumnos} />
        <Drawer.Screen name="Ver Alumnos" component={VerAlumnos} />
        <Drawer.Screen name="Actualización Alumnos" component={ActualizacionAlumnos} />
        <Drawer.Screen name="Eliminar Alumnos" component={EliminarAlumnos} />
        <Drawer.Screen name="Alta Profesores" component={AltaProfesores} />
        <Drawer.Screen name="Ver Profesores" component={VerProfesores} />
        <Drawer.Screen name="Actualización Profesores" component={ActualizacionProfesores} />
        <Drawer.Screen name="Eliminar Profesores" component={EliminarProfesores} />
        <Drawer.Screen name="Alta Materias" component={AltaMaterias} />
        <Drawer.Screen name="Ver Materias" component={VerMaterias} />
        <Drawer.Screen name="Actualización Materias" component={ActualizacionMaterias} />
        <Drawer.Screen name="Eliminar Materias" component={EliminarMaterias} />
        <Drawer.Screen name="Evaluaciones" component={Evaluaciones} />
        <Drawer.Screen name="Grupos" component={Grupos} />
        <Drawer.Screen name="Inscripciones" component={Inscripciones} />
        <Drawer.Screen name="Calificaciones" component={Calificaciones} />
      </Drawer.Navigator>
    </NavigationContainer>
    )
}