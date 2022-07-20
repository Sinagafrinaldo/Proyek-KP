import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from "../component/stylePengaturan";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';

const Pengaturan = ({ navigation }) => {
    const [status, setStatus] = useState(false)


    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user != null && user.email == 'kpkominfoproyek77@gmail.com') {
                    setStatus(true)
                } else {
                    setStatus(false)
                }
            })

            return unsubscribe
        }, [])
    );
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Bantuan");
                }}>
                <View style={styles.card_text}>
                    <Text style={styles.text}>Bantuan</Text>
                    <Ionicons
                        name="chevron-forward-outline"
                        size={22}
                        color="gray"
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Tentang");
                }}>
                <View style={styles.card_text}>
                    <Text style={styles.text}>Tentang Aplikasi</Text>
                    <Ionicons
                        name="chevron-forward-outline"
                        size={22}
                        color="gray"
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Privasi");
                }}>
                <View style={styles.card_text}>
                    <Text style={styles.text}>Kebijakan dan Privasi</Text>
                    <Ionicons
                        name="chevron-forward-outline"
                        size={22}
                        color="gray"
                    />
                </View>
            </TouchableOpacity>

            <View style={styles.line}></View>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Kontak");
                }}>
                <View style={styles.card_text}>
                    <Text style={styles.text}>Kontak</Text>
                    <Ionicons
                        name="chevron-forward-outline"
                        size={22}
                        color="gray"
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableOpacity onPress={() => Linking.openURL('google.navigation:q=kominfo+bandar+lampung')}>
                <View style={styles.card_text}>
                    <Text style={styles.text}>Lokasi</Text>
                    <Ionicons
                        name="chevron-forward-outline"
                        size={22}
                        color="gray"
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.line}></View>
            {status == true && (


                <><TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Reset IP");
                    }}>
                    <View style={styles.card_text}>
                        <Text style={styles.text}>Reset IP Kominfo</Text>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={22}
                            color="gray" />
                    </View>
                </TouchableOpacity><View style={styles.line}></View></>
            )}

        </View>
    )
}

export default Pengaturan