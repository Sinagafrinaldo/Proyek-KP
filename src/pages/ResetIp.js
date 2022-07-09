import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Linking,
    TextInput
} from "react-native";
import Modal from "react-native-modal";
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
import publicIP from 'react-native-public-ip';


const ResetIp = ({ navigation, route }) => {
    const [ipadd, setIpadd] = useState('')
    const ipCollectionRef = collection(db, "ipkominfo");
    const [ipsekarang, setIpsekarang] = useState([])
    const [newIp, setNewIp] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleModal = () => setIsModalVisible(() => !isModalVisible);


    const createIp = async (ipadds) => {
        await addDoc(ipCollectionRef, { ip: ipadds, created_at: new Date(), last_update: new Date() });
    };
    const ipAlert = () => {
        publicIP()
            .then(ipadds => {
                // createIp(ipadds)
                setIpadd(ipadds)
                setNewIp(ipadds)
            })
            .catch(error => {
                console.log(error);
                // 'Unable to get IP address.'
            });
    }
    const updateIp = async (id) => {
        const ipDoc = doc(db, "ipkominfo", id);
        const newFields = { ip: newIp, last_update: new Date() };
        try {
            await updateDoc(ipDoc, newFields);
            alert('Berhasil memperbarui IP address.')
        } catch (e) {
            alert(e)
        }
        // getUsers();

    };
    const getIpkominfo = async () => {
        const data = await getDocs(ipCollectionRef);
        setIpsekarang(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    useFocusEffect(
        React.useCallback(() => {

            ipAlert()
            getIpkominfo()

        }, [])
    );
    return (
        <View>
            <View>
                <Text>ResetIp</Text>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 30 }}
                    data={ipsekarang}
                    renderItem={({ item }) => (
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text>IP address wifi kominfo saat ini: {item.ip}</Text>
                            <TouchableOpacity
                                onPress={() => { handleModal() }}
                                style={{ backgroundColor: 'black', padding: 10, borderRadius: 10 }}>
                                <Text style={{ color: 'white' }}>Edit IP</Text>
                            </TouchableOpacity>
                            <Modal
                                style={{ flex: 1, backgroundColor: 'white', padding: 20 }}
                                isVisible={isModalVisible}>
                                <View >
                                    <Text>Edit IP address WIFI Kominfo</Text>
                                    <Text></Text>
                                    <Text>Untuk memastikan ip address yang dimasukkan sesuai dengan IP kominfo saat ini, pastikan anda terhubung dengan WIFI Kominfo terlebih dahulu. </Text>

                                    <Text>Berikut adalah IP address wifi yang terhubung saat ini: {ipadd}</Text>

                                    <TextInput
                                        onChangeText={newIp => setNewIp(newIp)}
                                        value={newIp}
                                        // style={styles.box_input}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            width: '100%',
                                            padding: 10,
                                            borderColor: '#D7DBDD',
                                            paddingLeft: 38,
                                            marginVertical: 10
                                        }}
                                        placeholder='IP address baru..'
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            updateIp(item.id)
                                            handleModal()
                                        }}
                                        style={{ padding: 5, backgroundColor: 'brown' }}>
                                        <Text style={{ color: 'white', textAlign: 'center' }}>Update</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { handleModal() }}
                                        style={{ marginTop: 20, padding: 5, backgroundColor: 'black' }}>
                                        <Text style={{ color: 'white', textAlign: 'center' }}>Kembali</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}


export default ResetIp