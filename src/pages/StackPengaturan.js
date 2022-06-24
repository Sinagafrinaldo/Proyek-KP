import React, { useState } from "react";
import { View, Text, Button, ScrollView, Alert, Modal } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Pengaturan1 from "./pengaturan";
import Kontak from "./kontak";
import Bantuan from "./bantuan";
import Tentang from "./tentang";
import Privasi from "./privasi";

const StackPengaturan = createStackNavigator();

function Pengaturan() {
  return (
    <StackPengaturan.Navigator initialRouteName="Pengaturan1">
      <StackPengaturan.Screen
        options={{ headerShown: false }}
        name="Pengaturan1"
        component={Pengaturan1}
      />
       <StackPengaturan.Screen
        options={{ headerShown: false }}
        name="Bantuan"
        component={Bantuan}
      />
       <StackPengaturan.Screen
        options={{ headerShown: false }}
        name="Tentang"
        component={Tentang}
      />
       <StackPengaturan.Screen
        options={{ headerShown: false }}
        name="Privasi"
        component={Privasi}
      />
      <StackPengaturan.Screen
        options={{ headerShown: false }}
        name="Kontak"
        component={Kontak}
      />
    </StackPengaturan.Navigator>
  );
}

export default Pengaturan;
