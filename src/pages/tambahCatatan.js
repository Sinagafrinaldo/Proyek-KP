import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
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
import CryptoES from "crypto-es";
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';

const TambahCatatan = ({ navigation }) => {
    const [judul, setJudul] = useState('')
    const [isi, setIsi] = useState('')
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const catatanCollectionRef = collection(db, "catatan");
    const [catatan, setCatatan] = useState([])
    const [email, setEmail] = useState('')
    const createCatatan = async () => {
        let mytexttoEncryption1 = judul
        let mytexttoEncryption2 = isi
        const encrypted = CryptoES.AES.encrypt(mytexttoEncryption1, "your password").toString();
        const encrypted1 = CryptoES.AES.encrypt(mytexttoEncryption2, "your password").toString();
        await addDoc(catatanCollectionRef, { judul: encrypted, isi: encrypted1, email: email });
    };

    useFocusEffect(
        React.useCallback(() => {

            const unsubscribe = auth.onAuthStateChanged(user => {

                if (user != null) {

                    setEmail(user.email)



                } else {


                }
            })

            unsubscribe()

        }, [])
    );
    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <View style={{ backgroundColor: 'white', padding: 20 }}>
                <Text style={{ fontFamily: 'poppins' }}>Judul</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setJudul}
                    value={judul}
                    placeholder='Judul...'
                />
                <Text style={{ fontFamily: 'poppins' }}>Isi Catatan</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setIsi}
                    value={isi}
                    placeholder='Isi catatan...'
                />

                <TouchableOpacity style={styles.btntambah}
                    onPress={() => {
                        if (judul != '' && isi != '') {


                            navigation.navigate('Catatan')
                            createCatatan()
                        } else {
                            alert('Silahkan masukkan judul dan juga isi catatan. ')
                        }
                    }}
                >
                    <Text style={styles.tekstambah}>Tambah</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TambahCatatan

const styles = StyleSheet.create({
    input: {
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        fontFamily: 'poppins'
    },
    btntambah: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 10,
        marginVertical: 20

    },
    tekstambah: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppinssemibold'
    }
})