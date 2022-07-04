import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Linking,
    Alert
} from "react-native";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { db } from '../firebase/crudConf';
import React, { useState } from "react";
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";

const DetailPengguna = ({ route, navigation }) => {
    const { nama, email, nip, id, asn, golongan } = route.params
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [url, setUrl] = useState()
    const [usid, setUsid] = useState()

    const resetLogin = async (id) => {
        const userDoc = doc(db, "pengguna", id);
        const newFields = { nama: nama, email: email, nip: nip, asn: asn, golongan: golongan, idhp: '' };
        try {
            await updateDoc(userDoc, newFields);
            alert('Berhasil melakukan reset device absensi.')
        } catch (e) {
            alert(e)
        }
        // getUsers();

    };
    useFocusEffect(
        React.useCallback(() => {
            const func = async () => {
                const storage = getStorage();
                const reference = ref(storage, '/' + email.toLocaleLowerCase());

                await getDownloadURL(reference).then((x) => {
                    console.log(x)
                    setUrl(x);
                })
            }
            if (url == undefined) { func() };


            // const unsubscribe = auth.onAuthStateChanged(user => {
            //     if (user != null) {
            //         // console.log(user.uid)
            //         // setUsid(user.uid)
            //     }
            // })

            // return unsubscribe
        }, [])
    );


    return (
        <View>
            <Text>DetailPengguna</Text>
            <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Edit Pengguna', {
                            nama: nama,
                            nip: nip,
                            email: email,
                            id: id,
                            asn: asn,
                            golongan: golongan

                        })
                    }}
                    style={{ width: 70, backgroundColor: 'black', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Edit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => { showConfirmDialog(id) }} style={{ width: 70, backgroundColor: 'red', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Hapus</Text>
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity onPress={() => { resetLogin(id) }}>
                <Text style={{ color: 'blue' }}>Reset Device Absensi</Text>
            </TouchableOpacity>
            <View style={{ padding: 20, margin: 10, }}>
                {url != undefined && (


                    <Image style={{ height: 100, width: 100 }} source={{ uri: url }} />
                )}
                <Text>Nama: {nama}</Text>
                <Text>NIP: {nip}</Text>
                <Text>Email: {email}</Text>
                <Text>ASN: {asn}</Text>
                <Text>Golongan: {golongan}</Text>
            </View>
        </View>
    )
}

export default DetailPengguna