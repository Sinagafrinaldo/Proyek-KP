import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput, ScrollView, FlatList, Modal, Alert, Button } from 'react-native'
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
import { db } from '../../firebase/crudConf';
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../../firebase/config';
import { initializeApp } from 'firebase/app';
import styles from "../component/styleCatatan";

const Catatan = ({ navigation }) => {
    const [catatan, setCatatan] = useState([]);
    const catatanCollectionRef = collection(db, "catatan");
    const [email, setEmail] = useState('')
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [verif, setVerif] = useState(false)

    const getCatatan = async () => {
        const data = await getDocs(catatanCollectionRef);
        // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setCatatan(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const deleteCatatan = async (id) => {
        const userCatatan = doc(db, "catatan", id);
        await deleteDoc(userCatatan);
        getCatatan();
    };
    const showConfirmDialog = (value) => {
        console.log(value)
        return Alert.alert(
            "Hapus ?",
            "Apakah anda yakin ingin menghapus ?",
            [
                {
                    text: "Ya",
                    onPress: () => {
                        deleteCatatan(value)
                    },
                },
                {
                    text: "Tidak",
                },
            ]
        );
        // deleteUser(value)
    };
    const dekripsi = (teks, teks1, id) => {
        var C = require("crypto-js");

        var Decrypted = C.AES.decrypt(teks, "your password");
        var result = Decrypted.toString(C.enc.Utf8);

        var Decrypted1 = C.AES.decrypt(teks1, "your password");
        var result1 = Decrypted1.toString(C.enc.Utf8);
        // console.log(result)
        return (
            <View>
                <TouchableOpacity style={styles.card_notepad} onPress={() => {
                    navigation.navigate('Detail Catatan', {
                        judul: result,
                        isi: result1
                    })
                }}>
                    <View style={styles.style_notepad}>
                        <View style={styles.notepad}>
                            <Text style={{ fontFamily: 'poppinssemibold' }}>{result}</Text>
                            <Text style={{ fontFamily: 'poppins' }} >{((result1).length > 20) ?
                                (((result1).substring(0, 80 - 3)) + '...') :
                                result1}
                            </Text>
                        </View>
                        <View style={styles.line}></View>
                        <TouchableOpacity
                            style={styles.touch_delete}
                            onPress={() => {
                                showConfirmDialog(id);
                            }}
                        >
                            <Ionicons
                                // style={styles.ikon2}
                                name="trash"
                                size={28}
                                color="red"
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user != null) {
                    getCatatan()
                    setEmail(user.email)
                    setVerif(true)
                } else {
                    setVerif(false)
                }
            })

            return unsubscribe
        }, [])
    );

    return (
        <View style={styles.container}>
            {verif == true && (
                <>
                    <View>
                        <View>
                            <FlatList
                                contentContainerStyle={{ paddingBottom: 30 }}
                                data={catatan}
                                renderItem={({ item, index }) => (
                                    <View>
                                        {item.email == email && (
                                            dekripsi(item.judul, item.isi, item.id)
                                            // <View style={styles.card}>
                                            //     {/* <Text style={{ fontFamily: 'poppinssemibold' }}>{item.judul}</Text> */}
                                            //     {/* <Text> {() => { dekripsi(item.judul) }}</Text> */}
                                            //     {/* <Text style={{ fontFamily: 'poppins' }}>{item.isi}</Text> */}
                                            //     <Button title='Press' onPress={() => { dekripsi(item.judul) }} />
                                            // </View>
                                        )}
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()} />


                        </View>

                    </View><TouchableOpacity
                        onPress={() => { navigation.navigate('Tambah Catatan'); }}
                        style={styles.icon_create_note}
                    >

                        <Ionicons
                            name="add"
                            size={34}
                            color="white" />
                    </TouchableOpacity>
                </>
            )}

            {verif == false && (
                <View style={styles.container_verif_false}>
                    <Image
                        style={styles.image_not_verif}
                        source={require("../../assets/not-user.png")}
                    />
                    <Text style={styles.text_not_verif}>Maaf fitur ini hanya tersedia bagi yang terdaftar sebagai pengguna biasa..</Text>
                </View>
            )}
        </View>
    )
}

export default Catatan