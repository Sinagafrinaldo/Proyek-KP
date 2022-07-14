import React, { useState } from "react";
import { View, Text, Button, ScrollView, Alert, Modal } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Presensi from "./presensi";
import PresensiKonfirmasi from "./presensiKonfirmasi";
const Stack = createStackNavigator();

function StackPresensi() {
    return (
        <Stack.Navigator initialRouteName="Presensi1">
            <Stack.Screen
                options={{ headerShown: false }}
                name="Presensi1"
                component={Presensi}
            />


            <Stack.Screen
                options={{ headerShown: false }}

                name="PresensiKonfirmasi"
                component={PresensiKonfirmasi}
            />

        </Stack.Navigator>
    );
}

export default StackPresensi;
