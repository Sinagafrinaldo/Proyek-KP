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
        <View>
            <Text>DataPengguna</Text>
            <View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 30 }}
                    data={pengguna}
                    renderItem={({ item, index }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Detail Pengguna', {
                                        nama: item.nama,
                                        email: item.email,
                                        nip: item.nip,
                                        id: item.id
                                    })
                                }}
                                style={{ padding: 20, margin: 4, borderWidth: 1 }}>
                                <Text>{index + 1}. {item.nama}</Text>
                                <Text>{item.nip}</Text>
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