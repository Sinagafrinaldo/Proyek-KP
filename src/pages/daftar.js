import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import styles from '../component/styleLogin'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Daftar = () => {
    const navigation = useNavigation();
    const [email, onChangeNip] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [status, setStatus] = React.useState(false)

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Registered with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user) {
                    setStatus(true)
                }
            })

            return unsubscribe
        }, [])
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <View style={styles.wrap1}>
                        <Text style={styles.login}>Selamat Datang di Menu Daftar</Text>
                    </View>
                    <View style={styles.card}>

                        <Text>Email</Text>

                        <TextInput
                            onChangeText={email => onChangeNip(email)}
                            value={email}
                            style={styles.boxnip}
                            placeholder='Email...'
                        />
                        <Text style={{ marginTop: 20 }}>Kata Sandi</Text>
                        <TextInput

                            onChangeText={password => onChangePassword(password)}
                            value={password}
                            style={styles.boxnip}
                            placeholder='Kata Sandi...'
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.tombol} onPress={handleSignUp}>
                            <Text style={styles.tekslogin}>Daftar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> 
        </ScrollView>
    )
}

export default Daftar