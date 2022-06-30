import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import CryptoES from "crypto-es";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from '../firebase/crudConf';
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';

const Catatan = ({ navigation }) => {
    const [catatan, setCatatan] = useState([]);
    const catatanCollectionRef = collection(db, "catatan");
    const [email, setEmail] = useState('')
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const getCatatan = async () => {
        const data = await getDocs(catatanCollectionRef);
        setCatatan(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const dekripsi = (teks) => {
        var C = require("crypto-js");

        var Decrypted = C.AES.decrypt(teks, "your password");
        var result = Decrypted.toString(C.enc.Utf8);

        return result
    }
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user != null) {
                    getCatatan()
                    setEmail(user.email)
                }
            })

            return unsubscribe
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 30 }}
                    data={catatan}
                    renderItem={({ item, index }) => (
                        <View>
                            {item.email == email && (
                                <View style={styles.card}>
                                    {/* <Text style={{ fontFamily: 'poppinssemibold' }}>{item.judul}</Text> */}
                                    <Text> {() => { dekripsi(item.judul) }}</Text>
                                    {/* <Text style={{ fontFamily: 'poppins' }}>{item.isi}</Text> */}
                                </View>
                            )}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Tambah Catatan') }}
                style={styles.wrapikon}>
                <Ionicons
                    style={styles.ikon2}
                    name="add"
                    size={34}
                    color="white"
                />
            </TouchableOpacity>

        </View>
    )
}

export default Catatan

const styles = StyleSheet.create({
    ikon2: {


    },
    wrapikon: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: 'brown',
        borderRadius: 90,
        padding: 10
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})