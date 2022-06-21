import React, { useState } from "react";
import { View, Text, Button, ScrollView, Alert, Modal } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Keluar1 from "./keluar";
import Daftar from "./daftar";

const StackLogin = createStackNavigator();

function Keluar() {
  return (
    <StackLogin.Navigator initialRouteName="Keluar1">
      <StackLogin.Screen
        options={{ headerShown: false }}
        name="Keluar1"
        component={Keluar1}
      />
      <StackLogin.Screen
        options={{ headerShown: false }}
        name="Daftar"
        component={Daftar}
      />
    </StackLogin.Navigator>
  );
}

export default Keluar;
