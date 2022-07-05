import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
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
import styles from "../component/styleTambahCatatan";
import { ScrollView } from 'react-native-gesture-handler';

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
        <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
            <View style={styles.container}>

                <Image
                    style={styles.stretch}
                    source={require("../../assets/add_notes.png")}
                />  

                <View>
                    <Text style={{ fontFamily: 'poppinssemibold', color:'gray' }}>Judul</Text>
                    <TextInput
                        style={styles.box_input}
                        onChangeText={setJudul}
                        value={judul}
                        placeholder='Judul...'
                    />
                </View>

                <View style= {{marginTop: 20,}}>
                    <Text style={{ fontFamily: 'poppinssemibold', color:'gray' }}>Isi Catatan</Text>
                    <TextInput
                        style={styles.box_input}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={setIsi}
                        value={isi}
                        placeholder='Isi catatan...'
                    />
                </View>

                <TouchableOpacity style={styles.touch}
                    onPress={() => {
                        if (judul != '' && isi != '') {


                            navigation.navigate('Catatan')
                            createCatatan()
                        } else {
                            alert('Silahkan masukkan judul dan juga isi catatan. ')
                        }
                    }}
                >
                    <Text style={styles.text_add}>Tambah</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default TambahCatatan