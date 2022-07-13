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
    const [ipfix, setIpfix] = useState('')


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
        const newFields = { ip: ipfix, last_update: new Date() };
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
        let ipNow = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        ipNow.map((item, index) => (
            setIpfix(item.ip)
            // ipAlert(item.ip)
        ))
    };
    useFocusEffect(
        React.useCallback(() => {

            ipAlert()
            getIpkominfo()

        }, [])
    );
    // console.log(ipfix)
    return (
        <View style={{ backgroundColor: 'white', marginHorizontal: 8, padding: 20, minHeight: '100%' }}>
            <View >
                <Text style={{ color: 'gray', fontSize: 24, fontFamily: 'poppinsbold', alignSelf: 'center', marginBottom: 10 }}>Reset IP Kominfo</Text>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 30 }}
                    data={ipsekarang}
                    renderItem={({ item }) => (
                        <View style={{ justifyContent: 'center', flex: 1, }}>
                            <Text style={styles.teksbiasa}>IP address wifi kominfo saat ini:{'\n'} {item.ip}</Text>
                            <TouchableOpacity
                                onPress={() => { handleModal() }}
                                style={styles.touch}>
                                <Text style={styles.text_edit}>Edit IP</Text>
                            </TouchableOpacity>
                            <Modal
                                style={{ flex: 1, backgroundColor: 'white', padding: 20, marginVertical: '40%', borderRadius: 10 }}
                                isVisible={isModalVisible}>
                                <ScrollView >
                                    <Text style={styles.title}>Edit IP address WIFI Kominfo</Text>
                                    <Text></Text>
                                    <Text style={styles.teksbiasa}>Untuk memastikan ip address yang dimasukkan sesuai dengan IP kominfo saat ini, pastikan anda terhubung dengan WIFI Kominfo terlebih dahulu. </Text>

                                    <Text style={styles.teksbiasa}>Berikut adalah IP address wifi yang terhubung saat ini: {ipadd}</Text>

                                    <TextInput
                                        onChangeText={ipfix => setIpfix(ipfix)}
                                        value={ipfix}
                                        // style={styles.box_input}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            width: '100%',
                                            padding: 10,
                                            borderColor: '#D7DBDD',
                                            paddingLeft: 38,
                                            marginVertical: 10,
                                            fontFamily: 'poppins',
                                        }}
                                        placeholder='IP address baru..'
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            updateIp(item.id)
                                            handleModal()
                                            navigation.navigate('Pengaturan1')
                                        }}
                                        style={styles.touch}>
                                        <Text style={styles.text_edit}>Update</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { handleModal() }}
                                        style={{ ...styles.touch, backgroundColor: 'brown' }}
                                    >
                                        <Text style={styles.text_edit}>Kembali</Text>
                                    </TouchableOpacity>
                                </ScrollView>
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

const styles = StyleSheet.create({
    textLink: {
        fontFamily: 'poppins',
        fontSize: 14,
        color: '#24A0ED',
    },
    title: {
        fontFamily: 'poppinssemibold',
        textAlign: 'center',
        color: 'gray',
        fontSize: 16
    },
    teksbiasa: {
        fontFamily: 'poppins',
        textAlign: 'justify'
    },
    touch: {
        backgroundColor: '#F9A826',
        marginTop: 10,
        padding: 10,
        width: '40%',
        alignSelf: 'center',

        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        marginBottom: 30,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    text_edit: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppinssemibold'
    },
})