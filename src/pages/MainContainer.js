// import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { db } from '../firebase/crudConf';
import React, { useState, useEffect } from "react";
import { useFocusEffect, getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Screens
import Beranda from './Stack';
import Jadwal from './jadwal';
import Pengaturan from './StackPengaturan';
import Keluar from './StackLogin';
// import StackPresensi from './stackPresensi';
import TopPresensi from './topNav';
//Screen names
const homeName = "Beranda";
const presensiName = "Presensi";
const jadwalName = "Jadwal";
const pengaturanName = "Pengaturan";
// const keluarName = "Masuk"

const Tab = createBottomTabNavigator();


function MainContainer() {
    const [keluarName, setkeluarName] = useState('Masuk')
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    // useFocusEffect(
    //     React.useCallback(() => {

    //         const unsubscribe = auth.onAuthStateChanged(user => {
    //             if (user != null) {
    //                 setkeluarName('Keluar')
    //             } else {
    //                 setkeluarName('Masuk')
    //             }
    //         })

    //         return unsubscribe
    //     }, [])
    // );
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user != null) {
                setkeluarName('Keluar')
            } else {
                setkeluarName('Masuk')
            }
        })

        return unsubscribe

    }, [])
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: {
                        padding: 10,
                        height: 70,
                        backgroundColor: '#118eeb',

                    },
                    tabBarActiveTintColor: "yellow",
                    tabBarInactiveTintColor: "white",
                    tabBarLabelStyle: {
                        paddingBottom: 5,
                        fontSize: 12,
                        paddingTop: -30,
                        fontFamily: 'poppins'

                    },

                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        console.log(routeName)
                        if (routeName === 'Pengingat') {
                            return { display: "none" }
                        }else if (routeName === 'Jadwal Liput') {
                            return { display: "none" }
                        }
                        return {
                            backgroundColor: '#118eeb',
                            display: "flex",
                            height: 70,
                        }
                        }
                        )(route),
                    // tabBarStyle: [
                    //     {
                    //         backgroundColor: '#118eeb',
                    //         display: "flex",
                    //         height: 70,


                    //     },
                    //     null
                    // ]
                    // ,


                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === presensiName) {
                            iconName = focused ? 'document' : 'document-outline'
                        } else if (rn === jadwalName) {
                            iconName = focused ? 'remove-circle' : 'remove-circle-outline'
                        } else if (rn === pengaturanName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        } else if (rn === keluarName) {
                            iconName = focused ? 'exit' : 'exit-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}


            // tabBarOptions={{
            //     activeTintColor: 'yellow',
            //     inactiveTintColor: 'white',
            //     labelStyle: { paddingBottom: 10, fontSize: 12 },

            // }}
            >

                <Tab.Screen name={homeName} component={Beranda}

                    options={{
                        headerShown: false
                    }} />
                <Tab.Screen name={presensiName} component={TopPresensi}
                    options={{
                        headerTitle: 'Presensi',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#118eeb',

                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                            fontFamily: 'poppinssemibold'
                        }

                    }} />

                <Tab.Screen name={pengaturanName} component={Pengaturan}
                    options={{
                        headerTitle: 'Pengaturan',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#118eeb'
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                            fontFamily: 'poppinssemibold'
                        }
                    }} />
                <Tab.Screen name={keluarName} component={Keluar}
                    options={{
                        tabBarStyle: { display: "none" },
                        headerShown: false
                    }} />
            </Tab.Navigator>
            <StatusBar style="dark" />
        </NavigationContainer >
    );
}

export default MainContainer;