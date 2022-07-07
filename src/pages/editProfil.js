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
import { firebaseConfig } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase/crudConf';
import { useFocusEffect } from '@react-navigation/native';
import { initializeApp } from 'firebase/app'; //validate yourself
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from 'expo-linear-gradient';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; //access the storage database
initializeApp(firebaseConfig);
const EditProfil = ({ route, navigation }) => {
    const { nama, nip, id, email, inisial, asn, golongan } = route.params;
    // console.log(id, "sadsd")
    // const [imageUrl, setImageUrl] = useState(undefined);
    const [url, setUrl] = useState();
    const [nama1, setNama1] = useState(nama)
    const [nip1, setNip1] = useState(nip)
    const [asn1, setAsn1] = useState(asn)
    const [golongan1, setGolongan1] = useState(golongan)
    const updateUser = async (id) => {
        const userDoc = doc(db, "pengguna", id);
        const newFields = { nama: nama1, email: email, nip: nip1, asn: asn1, golongan: golongan1 };
        await updateDoc(userDoc, newFields);
        // getUsers();
    };
    const deleteFromFirebase = (email) => {
        const storage = getStorage();
        const reference = ref(storage, '/' + email.toLowerCase());
        deleteObject(reference)
        navigation.navigate('Profil')
    };
    const removeImage = (img) => { // delete an image selected by the user
        Alert.alert(
            "Hapus Foto",
            "Apakah anda yakin ingin menghapus foto profil?",
            [
                {
                    text: "Batal",
                    style: "cancel",
                },
                {
                    text: "Ya",
                    onPress: () => {
                        deleteFromFirebase(email)
                    },
                },
            ],
            { cancelable: false }
        )
    }




    useEffect(() => {

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const func = async () => {
                const storage = getStorage();
                const reference = ref(storage, '/' + email.toLowerCase());
                await getDownloadURL(reference).then((x) => {
                    setUrl(x);
                })
            }

            if (url == undefined) { func() };
        }, [])
    );

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const storage = getStorage(); //the storage itself
            const refe = ref(storage, email.toLowerCase()); //how the image will be addressed inside the storage

            //convert image to array of bytes
            const img = await fetch(result.uri);
            const bytes = await img.blob();

            await uploadBytes(refe, bytes); //upload images
            alert('Berhasil memperbarui foto profil.')
            navigation.navigate('Profil')
        }
    };
    // const deleteUser = async (id) => {
    //     const userDoc = doc(db, "jadwal", id);
    //     await deleteDoc(userDoc);
    //     getUsers();
    // };
    // const [email, setEmail] = useState('')

    return (
        <ScrollView style={{ flex: 1, display: 'flex', backgroundColor: 'white' }}>
            <LinearGradient
                style={{ height: 90, }}
                colors={['#42AEFF', 'transparent']}  >

            </LinearGradient>
            <TouchableHighlight style={styles.symbol} onPress={pickImage}>

                {/* <Text style={styles.teksProfile}>{inisial}</Text> */}
                <Image style={{ height: 100, borderRadius: 100, width: 100 }} source={{ uri: url }} />

            </TouchableHighlight>
            <View style={{ backgroundColor: 'black', alignSelf: 'center', marginTop: -20, padding: 4, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>Ganti Foto</Text>
            </View>
            <TouchableOpacity
                onPress={() => { removeImage() }}
                style={{ alignSelf: 'center', marginRight: 130, marginTop: -30 }}>
                <Ionicons
                    // style={styles.ikon2}
                    name="trash"
                    size={30}
                    color="red"
                />
            </TouchableOpacity>
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

                <View style={styles.wrapitem}>
                    <Text style={{ color: 'gray', marginTop: 20, marginBottom: 5 }}>ASN/Non-ASN</Text>
                    <View style={{ ...styles.boxnip, paddingVertical: -15, }}>
                        <Picker

                            placeholder="Pilih Pengguna"
                            selectedValue={asn1}
                            // style={styles2.box_opsi}
                            style={{ marginLeft: -30, color: 'gray' }}
                            onValueChange={(asn1) => {
                                setAsn1(asn1);
                            }}
                        >
                            <Picker.Item label='ASN' value='ASN' />
                            <Picker.Item label='Non-ASN' value='Non-ASN' />



                        </Picker>
                    </View>
                </View>
                <View style={styles.wrapitem}>
                    <Text style={{ color: 'gray', marginTop: 20, marginBottom: 5 }}>Golongan</Text>
                    <View style={{ ...styles.boxnip, paddingVertical: -15, }}>
                        <Picker

                            placeholder="Pilih Pengguna"
                            selectedValue={golongan1}
                            // style={styles2.box_opsi}
                            style={{ marginLeft: -30, color: 'gray' }}
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
        // fontWeight: '500'
        fontFamily: 'poppinssemibold'
    },
    title: {
        color: '#949494',
        marginVertical: 5,
        fontFamily: 'poppins'
    },
    subtitle: {
        color: '#4c4c4c',
        fontSize: 16,
        // fontWeight: '500'
        fontFamily: 'poppins'
    },
    teksin: {
        marginTop: 10,
        color: 'gray',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppins'
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

    },
    teksProfile: {
        color: 'white',
        fontSize: 24,
        // fontWeight: '700'
        fontFamily: 'poppinsbold'
    },
    boxnama: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'gray',
        fontFamily: 'poppins'
    }
})