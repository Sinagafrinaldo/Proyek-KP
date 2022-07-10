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
import styles from "../component/stylesLandingPage";
import Ionicons from "react-native-vector-icons/Ionicons";
// import DeviceInfo from 'react-native-device-info';
import * as Device from 'expo-device';

const Beranda1 = ({ navigation }) => {
    const [status, setStatus] = useState(false)
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const usersCollectionRef = collection(db, "pengguna");
    const jadwalCollectionRef = collection(db, "jadwal");
    const [email, setEmail] = useState('')
    const [pengguna, setPengguna] = useState([])
    const [jadwal, setJadwal] = useState([])
    const [date, setSelectedDate] = useState('')
    const [url, setUrl] = useState();
    const [admin, setAdmin] = useState(false)
    const [idhp, setIdhp] = useState('')
    const getJadwal = async () => {
        const data = await getDocs(jadwalCollectionRef);
        setJadwal(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getId = () => {

        const deviceId = Device.osBuildId;

        setIdhp(deviceId)


    }
    useFocusEffect(
        React.useCallback(() => {
            getJadwal()
            getId()
            let today = new Date();
            if (today.getMonth() < 10) {
                let date = today.getFullYear() + '/0' + (today.getMonth() + 1) + '/' + today.getDate();
                setSelectedDate(date);
                if (today.getDay() < 10) {
                    let date = today.getFullYear() + '/0' + (today.getMonth() + 1) + '/0' + today.getDate();
                    setSelectedDate(date);
                }
            } else {
                if (today.getDay() < 10) {
                    let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/0' + today.getDate();
                    setSelectedDate(date);
                } else {


                    let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
                    setSelectedDate(date);
                }
            }
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user != null) {
                    if (user.email.toLocaleLowerCase() == 'admin@gmail.com') {
                        setAdmin(true)
                    } else {
                        setAdmin(false)
                    }
                    setEmail(user.email)
                    getUsers();
                    const func = async () => {
                        const storage = getStorage();
                        const reference = ref(storage, '/' + user.email.toLocaleLowerCase());
                        await getDownloadURL(reference).then((x) => {
                            setUrl(x);
                        })
                    }

                    if (url == undefined) { func() };
                } else if (user == null) {
                    setPengguna([])
                    setUrl(undefined)
                    setAdmin(false)
                }
            })

            return unsubscribe
        }, [])
    );
    // console.log(jadwal)
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <View style={styles.style_navbar}>
                    <View>
                        <Text style={styles.title_app}>KominfoApp</Text>
                        <Text style={styles.subtitle_app}>Bandar Lampung</Text>
                    </View>
                    <View style={styles.style_icon_nav}>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Profil', {
                                    pengguna1: pengguna
                                })
                            }}
                        >
                            <Ionicons
                                style={styles.icon_person}
                                name="person-circle"
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <Text>{idhp}</Text> */}
            <View style={styles.line_nav}></View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.background_page}>
                    <Image
                        style={styles.background}
                        source={require("../../assets/background.png")}
                    />
                </View>
                {url == undefined && (


                    <View style={styles.info_profile}>
                        <Image
                            style={styles.stretch}
                            source={require("../../assets/siger.png")}
                        />
                        <View style={styles.background_profile}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.wrap_image_profile}></View>
                                <View>
                                    <Text style={styles.text_welcome}>Selamat Datang</Text>

                                    {pengguna.map((item, index) => (

                                        <View key={index} style={{}}>
                                            <View >
                                                {item.email.toLowerCase() == email.toLowerCase() && (
                                                    <Text style={styles.name}> {item.nama}</Text>
                                                )}

                                            </View>
                                        </View>
                                    ))}

                                </View>
                            </View>
                        </View>
                    </View>
                )}
                {url != undefined && (


                    <View style={styles.info_profile}>
                        <Image
                            style={styles.stretch}
                            source={require("../../assets/siger.png")}
                        />
                        <View style={styles.background_profile}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {/* <View style={styles.image_profil}></View> */}
                                <View style={styles.symbol}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Tampil Foto', {
                                            url: url
                                        })
                                    }}>
                                        <Image style={styles.image_profile} source={{ uri: url }} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text_welcome}>Selamat Datang</Text>

                                    {pengguna.map((item, index) => (

                                        <View key={index} style={{}}>
                                            <View >
                                                {item.email.toLowerCase() == email.toLowerCase() && (
                                                    <Text style={styles.name}> {item.nama}</Text>
                                                )}

                                            </View>
                                        </View>
                                    ))}

                                </View>
                            </View>
                        </View>
                    </View>
                )}

                <Text style={styles.title_card}>Main Menu</Text>

                <View style={styles.card}>

                    <View style={styles.list_card}>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Jadwal Liput");
                                }}>
                                <View style={styles.bg_menu}>
                                    <Ionicons
                                        style={styles.icon_menu}
                                        name="calendar"
                                        size={34}
                                        color="white"
                                    />
                                </View>
                                <Text style={styles.font_menu}>
                                    Jadwal Liput
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Catatan");
                                }}
                            >
                                <View style={styles.bg_menu}>
                                    <Ionicons
                                        style={styles.icon_menu}
                                        name="newspaper"
                                        size={34}
                                        color="white"
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.font_menu}>
                                Catatan
                            </Text>
                        </View>


                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Pengingat");
                                }}
                            >
                                <View style={styles.bg_menu}>
                                    <Ionicons
                                        style={styles.icon_menu}
                                        name="megaphone"
                                        size={34}
                                        color="white"
                                    />
                                </View>
                                <Text style={styles.font_menu}>
                                    Pengingat
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {admin == true && (


                        <View style={styles.list_card}>



                            <View style={{ marginBottom: 20 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Data Pengguna");
                                    }}>
                                    <View style={styles.bg_menu}>

                                        <Ionicons
                                            style={styles.icon_menu}
                                            name="people"
                                            size={34}
                                            color="white"
                                        />
                                    </View>
                                    <Text style={styles.font_menu}>
                                        Data Pengguna
                                    </Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ marginBottom: 20 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Data Presensi");
                                    }}>
                                    <View style={styles.bg_menu}>

                                        <Ionicons
                                            style={styles.icon_menu}
                                            name="receipt"
                                            size={34}
                                            color="white"
                                        />
                                    </View>
                                    <Text style={styles.font_menu}>
                                        Data Presensi
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}


                </View>

                <View style={styles.flatlist_timetable}>
                    <Text style={styles.text_timetable}>Jadwal Liput Hari Ini</Text>

                    <View style={styles.card_timetable}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                            horizontal
                            // contentContainerStyle={{ paddingVertical: 20, }}
                            data={jadwal}
                            renderItem={({ item, index }) => (
                                <View style={{ alignSelf: 'center' }}>
                                    {item.tanggal == date && (
                                        <View style={styles.list_data}>

                                            <View style={styles.data}>
                                                <View style={styles.style_position_icon_cover_name}>
                                                    <Text style={styles.cover_name}>Peliput : {item.nama}</Text>
                                                    <Ionicons
                                                        name="bookmarks"
                                                        size={24}
                                                        color="#118eeb"
                                                    />
                                                </View>

                                                <Text style={styles.desc}>Keterangan : {item.keterangan}</Text>
                                                <Text style={styles.date}>{item.tanggal}</Text>
                                                <View style={styles.line_nav}></View>

                                                <View style={styles.style_position_icon_loc}>
                                                    <Text style={styles.loc}>Lokasi : {item.lokasi}</Text>
                                                    <Ionicons
                                                        name="location"
                                                        size={24}
                                                        color="red"
                                                    />
                                                </View>

                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>

            </ScrollView>
        </View >
    );
};
export default Beranda1;
