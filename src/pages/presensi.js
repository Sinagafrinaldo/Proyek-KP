import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts';
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
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
const Presensi = ({ navigation }) => {
    const [alerts, setShowAlert] = useState(false);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const usersCollectionRef = collection(db, "pengguna");
    const [email, setEmail] = useState('')
    const [pengguna, setPengguna] = useState([])
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const handleMasuk = () => {
        // alert('Anda berhasil presensi masuk')
        setShowAlert(true)
    }
    useFocusEffect(
        React.useCallback(() => {

            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user != null) {
                    setEmail(user.email)
                    getUsers();
                } else {
                    setPengguna([])
                }
            })

            return unsubscribe
        }, [])
    );

    return (
        <View style={{ justifyContent: 'center', flex: 1, display: 'flex' }}>

            <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <View style={styles.card}>
                    <Text style={{ color: 'gray' }}>Haloo..</Text>

                    {pengguna.map((item, index) => (

                        <View key={index} style={{}}>
                            <View >
                                {item.email.toLowerCase() == email.toLowerCase() && (
                                    <Text style={styles.title2}> {item.nama}</Text>
                                )}

                            </View>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.cekin}
                        onPress={() => { handleMasuk() }}
                    >
                        <Text style={styles.teksin}>ABSEN MASUK</Text>
                    </TouchableOpacity>

                </View>
            </View>



            {/* <Button title='Presensi Sekarang' onPress={() => setShowAlert(true)} /> */}
            <AwesomeAlert

                show={alerts}
                showProgress={false}
                title="Presensi"
                message="          Berhasil melakukan presensi!                "
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                // showCancelButton={true}
                showConfirmButton={true}
                // cancelText="No, cancel"
                confirmText="  Ok  "
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowAlert(false)
                }}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}
            />
        </View >
    )
}

export default Presensi

const styles = StyleSheet.create({
    card: {

        width: '80%',
        padding: 30,
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    cekin: {
        backgroundColor: '#FFD600',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 20
    },
    teksin: {
        color: '#2D7CF3',
        fontWeight: 'bold'
    },
    cekout: {
        backgroundColor: '#E5E5E5',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20
    },
    teksout: {
        color: '#AAAAAA',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    button: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
    },
    text: {
        color: '#fff',
        fontSize: 15
    },
    title2: {
        fontSize: 16,
        fontWeight: '700'
    }
});