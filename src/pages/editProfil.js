import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
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
const EditProfil = ({ route, navigation }) => {
    const { nama, nip, id, email } = route.params;
    // console.log(id, "sadsd")
    const [nama1, setNama1] = useState(nama)
    const [nip1, setNip1] = useState(nip)
    const updateUser = async (id) => {
        const userDoc = doc(db, "pengguna", id);
        const newFields = { nama: nama1, email: email, nip: nip1 };
        await updateDoc(userDoc, newFields);
        // getUsers();
    };

    // const deleteUser = async (id) => {
    //     const userDoc = doc(db, "jadwal", id);
    //     await deleteDoc(userDoc);
    //     getUsers();
    // };
    // const [email, setEmail] = useState('')

    return (
        <ScrollView style={{ flex: 1, display: 'flex', backgroundColor: 'white' }}>
            <View
                style={{ backgroundColor: '#66baff', height: 90 }}
            ></View>
            <View style={styles.symbol}>
                <Text style={styles.teksProfile}>LS</Text>
            </View>

            <Text style={styles.teksin}>Edit Profil</Text>

            <View style={styles.content}>
                <View style={{ borderBottomWidth: 1, borderColor: 'black', marginTop: -10, borderColor: 'gray' }}></View>
                <View style={styles.wrapitem}>
                    <Text style={styles.title}>Nama</Text>
                    <TextInput
                        onChangeText={nama1 => setNama1(nama1)}
                        value={nama1}
                        style={styles.boxnama}
                        placeholder='Nama Lengkap ...'
                    />
                </View>
                <View style={styles.wrapitem}>
                    <Text style={styles.title}>NIP</Text>
                    <TextInput
                        onChangeText={nip1 => setNip1(nip1)}
                        value={nip1}
                        style={styles.boxnama}
                        placeholder='NIP...'
                    />
                </View>
                {/* <View style={styles.wrapitem}>
                    <Text style={styles.title}>Email</Text>
                    <TextInput
                        onChangeText={email => setEmail(email)}
                        value={email}
                        style={styles.boxnama}
                        placeholder='Email ...'
                    />
                </View> */}

                <TouchableOpacity style={styles.btn} onPress={() => {
                    updateUser(id)
                    // console.log(id)
                    navigation.navigate('Profil')
                }}>
                    <Text style={styles.teksup}>Update</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    )
}

export default EditProfil

const styles = StyleSheet.create({
    wrapitem: {
        marginVertical: 10
    },
    teksup: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    },
    title: {
        color: '#949494',
        marginVertical: 5
    },
    subtitle: {
        color: '#4c4c4c',
        fontSize: 16,
        fontWeight: '500'
    },
    teksin: {
        marginTop: 10,
        color: 'gray',
        textAlign: 'center',
        fontSize: 16
    },
    content: {
        // marginHorizontal: 5,
        backgroundColor: 'white',
        minHeight: '100%',
        padding: 30
    },
    btn: {
        backgroundColor: 'black',
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    symbol: {
        minHeight: 100,
        minWidth: 100,
        borderRadius: 100,
        backgroundColor: '#171F1D',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
        padding: 10
    },
    teksProfile: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700'
    },
    boxnama: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'gray'
    }
})