import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
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
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { LinearGradient } from 'expo-linear-gradient';
import styles from "../component/styleProfile";

const Profil = ({ route, navigation }) => {
    const app = initializeApp(firebaseConfig);
    const [url, setUrl] = useState();
    const auth = getAuth(app);
    const usersCollectionRef = collection(db, "pengguna");
    const [email, setEmail] = useState('')
    const [pengguna, setPengguna] = useState([])
    const [nama, setNama] = useState('')
    const [nip, setNip] = useState('')
    const [verif, setVerif] = useState(false)
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // getInfo()
    };
    const getInfo = () => {
        // console.log(pengguna)
        pengguna.map((item, index) => {
            if (item.email.toLowerCase() == email.toLowerCase()) {
                setNama(item.nama)
                setEmail(item.email)
                setNip(item.nip)
            }
        })
    }


    useFocusEffect(
        React.useCallback(() => {




            const unsubscribe = auth.onAuthStateChanged(user => {
                // getPresensi()
                if (user != null) {
                    // if (user.email != 'admin@gmail.com') {
                    setVerif(true)
                    // }
                    setEmail(user.email)
                    getUsers();


                    const func = async () => {
                        const storage = getStorage();
                        const reference = ref(storage, '/' + user.email.toLocaleLowerCase());

                        await getDownloadURL(reference).then((x) => {
                            console.log(x)
                            setUrl(x);
                        })

                    }

                    if (url == undefined) { func() };

                } else {
                    setVerif(false)
                    setPengguna([])
                }
            })
            getInfo()

            return unsubscribe
        }, [])
    );

    // console.log(nama)
    return (
        <View style={styles.container}>
            {/* {() => {
                getInfo()
            }} */}
            {verif == true && (
                <>

                    <ScrollView style={styles.content}>
                        {pengguna.map((item, index) => (

                            <View key={index} style={{}}>
                                {item.email.toLowerCase() == email.toLowerCase() && (

                                    <>
                                        <LinearGradient
                                            style={{ height: 90, }}
                                            colors={['#42AEFF', 'transparent']}  >

                                        </LinearGradient>

                                        <View style={{ padding: 30, paddingTop: 0 }}>
                                            <View style={styles.symbol}>
                                                {url != undefined && (


                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate('Tampil Foto', {
                                                            url: url
                                                        })
                                                    }}>
                                                        <Image style={styles.image} source={{ uri: url }} />
                                                    </TouchableOpacity>
                                                )}
                                                {url == undefined && (


                                                    <View></View>
                                                )}
                                            </View>
                                            <View style={styles.wrapitem}>
                                                <TouchableOpacity style={styles.touch} onPress={() => {
                                                    navigation.navigate('Edit Profil', {
                                                        nama: item.nama,
                                                        nip: item.nip,
                                                        id: item.id,
                                                        email: item.email,
                                                        inisial: item.nama.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase(),
                                                        asn: item.asn,
                                                        golongan: item.golongan

                                                    })
                                                    console.log(item.id)
                                                }}>
                                                    <Text style={styles.text_edit}>Edit Profil</Text>
                                                </TouchableOpacity>

                                                <View style={styles.line}>

                                                </View>

                                            <View style={styles.wrap_item}>
                                                <Text style={styles.title}>Nama</Text>
                                                <Text style={styles.subtitle}>{item.nama}</Text>
                                            </View>

                                            </View>
                                            <View style={styles.wrap_item}>
                                                <Text style={styles.title}>NIP</Text>
                                                <Text style={styles.subtitle}>{item.nip}</Text>
                                            </View>
                                            <View style={styles.wrap_item}>
                                                <Text style={styles.title}>ASN/Non-ASN</Text>
                                                <Text style={styles.subtitle}>{item.asn}</Text>
                                            </View>
                                            <View style={styles.wrap_item}>
                                                <Text style={styles.title}>Golongan</Text>
                                                <Text style={styles.subtitle}>{item.golongan}</Text>
                                            </View>
                                            <View style={styles.wrap_item}>
                                                <Text style={styles.title}>Email</Text>
                                                <Text style={styles.subtitle}>{email}</Text>
                                            </View></View></>
                                )}
                            </View>
                        ))}

                    </ScrollView></>
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

export default Profil