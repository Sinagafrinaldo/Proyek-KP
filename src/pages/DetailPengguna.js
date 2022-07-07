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
        <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.image}>
                    {url != undefined && (
                        <Image style={{ height: 180, width: 180 }} source={{ uri: url }} />
                    )}
                </View>

                <View style={styles.position_touch}>
                
                    <TouchableOpacity onPress={() => { resetLogin(id) }}>
                        <Text style={styles.touch_reset}>Reset Device Absensi</Text>
                    </TouchableOpacity>


                        {/* <TouchableOpacity
                            onPress={() => { showConfirmDialog(id) }} style={{ width: 70, backgroundColor: 'red', padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Hapus</Text>
                        </TouchableOpacity> */}
                </View>
                
                <View style={styles.data_user}>
                    <View style={{paddingBottom:12}}>
                        <Text style={styles.text}>Nama :</Text>
                        <Text style={styles.text_data}>{nama}</Text>
                    </View>
                    
                    <View style={{paddingBottom:12}}>
                        <Text style={styles.text}>NIP :</Text>
                        <Text style={styles.text_data}>{nip}</Text>
                    </View>
                    
                    <View style={{paddingBottom:12}}>
                        <Text style={styles.text}>Email :</Text>
                        <Text style={styles.text_data}>{email}</Text>
                    </View>
                  
                    <View style={{paddingBottom:12}}>
                        <Text style={styles.text}>ASN :</Text>
                        <Text style={styles.text_data}>{asn}</Text>
                    </View>

                    <View style={{paddingBottom:12}}>
                        <Text style={styles.text}>Golongan :</Text>
                        <Text style={styles.text_data}>{golongan}</Text>
                    </View>
                </View>

                
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
                    style={styles.touch_edit}>
                    <Text style={styles.text_edit}>Edit</Text>
                </TouchableOpacity>
                    

            </View>
        </ScrollView>
    )
}

export default DetailPengguna

const styles = StyleSheet.create({
    container : {
        backgroundColor:'white',
        flex:1,
        display : 'flex',
        width:'100%',
        height:'100%',
        padding:10,
        paddingVertical:40,
    },

    image :{
        alignItems:'center'
    },

    position_touch : {
        alignItems:'center',
    },

    touch_reset :{
        color: 'blue',
        padding:15,
    },

    touch_edit :{
        width:'90%',
        marginTop: 25,
        alignSelf:'center',
        backgroundColor: '#F9A826', 
        borderRadius: 10,
    },

    text_edit:{
        padding:14,
        color:'white',
        fontFamily:'poppinssemibold',
        textAlign:'center',
    },

    data_user :{
        paddingLeft :15,
    },

    text :{
        fontSize:12,
        fontFamily :'poppinssemibold',
        fontWeight : 'bold',
        paddingLeft:3,
        color:'gray',

    },

    text_data :{
        fontSize:18,
        fontFamily :'poppinssemibold',
        fontWeight : 'bold',
        paddingLeft:3,
        color:'gray',
    },
})