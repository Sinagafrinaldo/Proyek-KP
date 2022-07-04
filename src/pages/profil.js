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
        <View style={{ flex: 1, display: 'flex', backgroundColor: 'white' }}>
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
                                        <View
                                            style={{ backgroundColor: '#66baff', height: 90, }}
                                        >

                                        </View>
                                        <View style={{ padding: 30, paddingTop: 0 }}>
                                            <View style={styles.symbol}>
                                                {url != undefined && (


                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate('Tampil Foto', {
                                                            url: url
                                                        })
                                                    }}>
                                                        <Image style={{ height: 100, borderRadius: 100, width: 100 }} source={{ uri: url }} />
                                                    </TouchableOpacity>
                                                )}
                                                {url == undefined && (


                                                    <View></View>
                                                )}
                                            </View>
                                            <View style={styles.wrapitem}>
                                                <TouchableOpacity style={styles.btn} onPress={() => {
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
                                                    <Text style={styles.teksin}>Edit Profil</Text>
                                                </TouchableOpacity>

                                                <View style={{ borderBottomWidth: 1, borderColor: 'black', marginVertical: 10, borderColor: 'gray' }}>

                                                </View>
                                                <Text style={styles.title}>Nama</Text>
                                                <Text style={styles.subtitle}>{item.nama}</Text>



                                            </View>
                                            <View style={styles.wrapitem}>
                                                <Text style={styles.title}>NIP</Text>
                                                <Text style={styles.subtitle}>{item.nip}</Text>
                                            </View>
                                            <View style={styles.wrapitem}>
                                                <Text style={styles.title}>ASN/Non-ASN</Text>
                                                <Text style={styles.subtitle}>{item.asn}</Text>
                                            </View>
                                            <View style={styles.wrapitem}>
                                                <Text style={styles.title}>Golongan</Text>
                                                <Text style={styles.subtitle}>{item.golongan}</Text>
                                            </View>
                                            <View style={styles.wrapitem}>
                                                <Text style={styles.title}>Email</Text>
                                                <Text style={styles.subtitle}>{email}</Text>
                                            </View></View></>
                                )}
                            </View>
                        ))}

                    </ScrollView></>
            )}
            {verif == false && (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View >
                        <Text style={{ textAlign: 'center' }}>Maaf silahkan login terlebih dahulu untuk mengakses menu ini..</Text>
                    </View>
                </View>
            )}


        </View>
    )
}

export default Profil

const styles = StyleSheet.create({
    wrapitem: {
        marginVertical: 10
    },
    title: {
        color: '#949494',
        fontFamily: 'poppins'
    },
    subtitle: {
        color: '#4c4c4c',
        fontSize: 16,
        // fontWeight: '500'
        fontFamily: 'poppinssemibold'
    },
    btn: {
        backgroundColor: 'black',
        width: 120,
        alignSelf: 'center',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    teksin: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppins'
    },
    content: {
        // marginHorizontal: 5,
        backgroundColor: 'white',
        minHeight: '100%',
        // padding: 30,
        // paddingTop: 0
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

    },
    teksProfile: {
        color: 'white',
        fontSize: 24,
        // fontWeight: '700'
        fontFamily: 'poppinsbold'
    }
})