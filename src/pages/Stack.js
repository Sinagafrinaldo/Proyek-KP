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
        name="Catatan"
        component={Catatan}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="Pengingat"
        component={Pengingat}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="Jadwal Liput"
        component={JadwalLiput}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="Lainnya"
        component={Lainnya}
      />
    </Stack.Navigator>
  );
}

export default Beranda;