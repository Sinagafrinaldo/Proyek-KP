import React, { useState } from "react";
import { View, Text, Button, ScrollView, Alert, Modal } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Beranda1 from "./beranda";
import Catatan from './catatan'
import JadwalLiput from "./JadwalLiput";
import Lainnya from "./Lainnya";
import Pengingat from "./Pengingat";
import TambahJadwal from "./tambahJadwal";
import Profil from "./profil";
import EditProfil from "./editProfil";
import TambahCatatan from "./tambahCatatan";
import DetailCatatan from "./detailCatatan";
import TampilFoto from "./tampilFoto";

const Stack = createStackNavigator();

function Beranda() {
  return (
    <Stack.Navigator initialRouteName="Beranda1">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Beranda1"
        component={Beranda1}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{
          headerStyle: {
            backgroundColor: '#118eeb',
            height: 90
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontWeight: '500',
            fontFamily: 'poppinssemibold',
            justifyContent: 'center',
          },
        }}
        name="Catatan"
        component={Catatan}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{
          title: 'Foto Profil',
          headerStyle: {
            backgroundColor: '#118eeb',
            height: 90
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontWeight: '500',
            fontFamily: 'poppinssemibold',
            justifyContent: 'center',
          },
        }}
        name="Tampil Foto"
        component={TampilFoto}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{
          headerStyle: {
            backgroundColor: '#118eeb',
            height: 90
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontWeight: '500',
            fontFamily: 'poppinssemibold',
            justifyContent: 'center',
          },
        }}
        name="Detail Catatan"
        component={DetailCatatan}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{
          headerStyle: {
            backgroundColor: '#118eeb',
            height: 90
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontWeight: '500',
            fontFamily: 'poppinssemibold',
            justifyContent: 'center',
          },
        }}
        name="Pengingat"
        component={Pengingat}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{
          headerStyle: {
            backgroundColor: '#118eeb',
            height: 90
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontWeight: '500',
            fontFamily: 'poppinssemibold',
            justifyContent: 'center',
          },
        }}
        name="Jadwal Liput"
        component={JadwalLiput}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{
          headerStyle: {
            backgroundColor: '#118eeb',
            height: 90
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontWeight: '500',
            fontFamily: 'poppinssemibold',
            justifyContent: 'center',
          },
        }}
        name="Tambah Catatan"
        component={TambahCatatan}
      />

      <Stack.Screen
        // options={{ headerShown: false }}
        options={{
          headerStyle: {
            backgroundColor: '#118eeb',
            height: 90
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontWeight: '500',
            fontFamily: 'poppinssemibold',
            justifyContent: 'center',
          },
        }}
        name="Tambah Jadwal"
        component={TambahJadwal}
      />

      <Stack.Screen
        // options={{ headerShown: false }}
        name="Lainnya"
        component={Lainnya}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{
          headerStyle: {
            backgroundColor: '#118eeb',
            height: 90
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontWeight: '500',
            fontFamily: 'poppinssemibold',
            justifyContent: 'center',
          },
        }}
        name="Profil"
        component={Profil}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{
          headerStyle: {
            backgroundColor: '#118eeb',
            height: 90
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontWeight: '500',
            fontFamily: 'poppinssemibold',
            justifyContent: 'center',
          },
        }}
        name="Edit Profil"
        component={EditProfil}
      />
    </Stack.Navigator>
  );
}

export default Beranda;
