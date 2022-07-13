import { Alert, View, Image, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"
import Ionicons from "react-native-vector-icons/Ionicons";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../firebase/crudConf';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import { initializeApp } from 'firebase/app'; //validate yourself
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; //access the storage database
initializeApp(firebaseConfig);
const EditPengguna = ({ route, navigation }) => {
    const { nama, email, nip, id, asn, golongan } = route.params;

    const [nama1, setNama1] = useState(nama)
    const [nip1, setNip1] = useState(nip)
    const [email1, setEmail] = useState(email)
    const [asn1, setAsn1] = useState(asn)
    const [golongan1, setGolongan1] = useState(golongan)
    const updateUser = async (id) => {
        const userDoc = doc(db, "pengguna", id);
        const newFields = { nama: nama1, email: email1, nip: nip1, asn: asn1, golongan: golongan1 };
        try {
            await updateDoc(userDoc, newFields);
            alert('Berhasil memperbarui profil pengguna.')
        } catch (e) {
            alert(e)
        }
        // getUsers();

    };
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title_box}>Nama</Text>
                    <TextInput
                        onChangeText={nama1 => setNama1(nama1)}
                        value={nama1}
                        style={styles.box_input}
                        placeholder='Nama Lengkap ...'
                    />
                </View>
                <View>
                    <Text style={styles.title_box}>NIP</Text>
                    <TextInput
                        onChangeText={nip1 => setNip1(nip1)}
                        value={nip1}
                        style={styles.box_input}
                        placeholder='NIP...'
                    />
                </View>
                <View>
                    <Text style={styles.title_box}>ASN/Non-ASN</Text>
                    <View style={{ ...styles.select_box }}>
                        <Picker

                            placeholder="Pilih Pengguna"
                            selectedValue={asn1}
                            // style={styles2.box_opsi}
                            style={{ marginLeft: -30, marginTop: -3, color: 'gray' }}
                            onValueChange={(asn1) => {
                                setAsn1(asn1);
                            }}
                        >
                            <Picker.Item label='ASN' value='ASN' />
                            <Picker.Item label='Non-ASN' value='Non-ASN' />



                        </Picker>
                    </View>
                </View>
                <View>
                    <Text style={styles.title_box}>Golongan</Text>
                    <View style={{ ...styles.select_box }}>
                        <Picker

                            placeholder="Pilih Pengguna"
                            selectedValue={golongan1}
                            // style={styles2.box_opsi}
                            style={{ marginLeft: -30, marginTop: -3, color: 'gray' }}
                            onValueChange={(golongan1) => {
                                setGolongan1(golongan1);
                            }}
                        >
                            <Picker.Item label='-' value='-' />
                            <Picker.Item label='I' value='I' />
                            <Picker.Item label='II' value='II' />
                            <Picker.Item label='III' value='III' />
                            <Picker.Item label='IV' value='IV' />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={styles.touch} onPress={() => {
                    updateUser(id)
                    // console.log(id)
                    navigation.navigate('Data Pengguna')
                }}>
                    <Text style={styles.text_update}>Update</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default EditPengguna


const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 5,
        backgroundColor: 'white',
        minHeight: '100%',
        padding: 20
    },

    title_box: {
        color: 'gray',
        marginTop: 20,
        marginBottom: 5
    },

    box_input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        padding: 10,
        borderColor: '#D7DBDD',
        paddingLeft: 16,
    },

    select_box: {
        borderWidth: 1,
        borderRadius: 10,
        height: 51,
        width: '100%',
        borderColor: '#D7DBDD',
        paddingLeft: 38,
    },

    touch: {
        backgroundColor: '#118eeb',
        marginTop: 35,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },

    text_update: {
        padding: 6,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})