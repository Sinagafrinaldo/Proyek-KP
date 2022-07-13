import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Linking
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
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { db } from '../firebase/crudConf';
import React, { useState } from "react";
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../component/styleDataPengguna";

const DataPengguna = ({ navigation, route }) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const usersCollectionRef = collection(db, "pengguna");
    const [pengguna, setPengguna] = useState([])
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    useFocusEffect(
        React.useCallback(() => {
            getUsers()
        }, [])
    );
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text_user}>Data Pengguna</Text>
            <View style={styles.line}></View> */}
            <View>
                <FlatList
                    contentContainerStyle={{}}                  
                    data={pengguna}
                    renderItem={({ item, index }) => (
                        <View style={styles.card}>           

                            <View style={styles.position}>
                                <View style={styles.number}>
                                    <Text style={{fontWeight:'bold', color:'white'}}>{index + 1}</Text>
                                </View>

                                <Ionicons
                                    // style={styles.ikonLokasi}
                                    name="folder"
                                    size={26}
                                    color="#ebcc6f" />

                            </View>

                            <View style={styles.position_data}>
                                <Text style={styles.text_name}>{item.nama}</Text>
                                <Text style={styles.nip}>{item.nip}</Text> 
                            </View>

                            <TouchableOpacity
                            style={styles.touch}  
                                onPress={() => {
                                    navigation.navigate('Detail Pengguna', {
                                        nama: item.nama,
                                        email: item.email,
                                        nip: item.nip,
                                        id: item.id,
                                        asn: item.asn,
                                        golongan: item.golongan
                                    })
                                }}
                            >
                             <Text style={styles.text_detail}> Detail</Text>  
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

export default DataPengguna