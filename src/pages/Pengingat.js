import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Text, Alert, View, Image, Button, Platform, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';




Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function Pengingat() {
    const [isi, setIsi] = useState('');
    const [judul, setJudul] = useState('');
    const [jam, setJam] = useState('0');
    const [menit, setMenit] = useState('0');
    const [detik, setDetik] = useState('10');
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [listjam] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']);
    const [listmenit] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']);
    const [listdetik] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']);



    const notificationListener = useRef();
    const responseListener = useRef();



    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (

        <ScrollView style={{backgroundColor:'white'}}>
            <View style={styles.content}>
                <View style={styles.data}>
                    <View style={styles.head}>   
                        <Text style={styles.teks_judul}>Judul pengingat :</Text>
                        <Text style={{marginTop:3}}>{judul} </Text>
                        <Text style={styles.teks_isi}>Isi pengingat :</Text>
                        <Text style={{marginTop:3}}>{isi}</Text>
                    </View>
                    <Image
                        style={styles.stretch}
                        source={require("../../assets/pengingat.png")}
                    />      
                </View>

                <View style={{padding:6}}>
                    <Text>Judul Notifikasi</Text>
                    <TextInput
                        style={styles.box_input}
                        placeholder="Masukkan judul notifikasi"
                        onChangeText={newJudul => setJudul(newJudul)}
                        defaultValue={judul}
                    />
                    <Text>Isi Notifikasi</Text>
                    <TextInput
                        style={styles.box_input}
                        placeholder="Isi notifikasi..."
                        onChangeText={newIsi => setIsi(newIsi)}
                        defaultValue={isi}
                    />
                    <Text>Lama Waktu Notifikasi (Jam, Menit, Detik)</Text>
                    <View style={styles.waktu}>

                        <Picker
                            selectedValue={jam}
                            style={styles.box_opsi}
                            onValueChange={(jam) => {
                                setJam(jam);
                            }}
                        >
                            {
                                listjam.map((p) => (
                                    <Picker.Item key={p} label={p} value={p} />
                                ))
                            }
                        </Picker>
                        <Picker
                            selectedValue={menit}
                            style={styles.box_opsi}
                            onValueChange={(menit) => {
                                setMenit(menit);
                            }}
                        >
                            {
                                listmenit.map((p) => (
                                    <Picker.Item key={p} label={p} value={p} />
                                ))
                            }
                        </Picker>
                        <Picker
                            selectedValue={detik}
                            style={styles.box_opsi}
                            onValueChange={(detik) => {
                                setDetik(detik);
                            }}
                        >
                            {
                                listdetik.map((p) => (
                                    <Picker.Item key={p} label={p} value={p} />
                                ))
                            }
                        </Picker>

                    </View>
                    <TouchableOpacity style={styles.tombol}
                        onPress={

                            async () => {
                                if (judul == '' || isi == '') {
                                    alert("Silahkan isi judul dan isi")
                                } else {


                                    Alert.alert("Sukses", "Pengingat muncul dalam " + jam + " jam, " + menit + " menit, " + detik + " detik.")
                                    await schedulePushNotification(judul, isi, jam, menit, detik);
                                }
                            }
                        }>
                        <Text style={styles.teks}>Buat Notifikasi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    );
}

async function schedulePushNotification(judul, isi, jam, menit, detik) {

    // console.log(jam)
    var jam = parseInt(jam);
    var menit = parseInt(menit);
    var detik = parseInt(detik);
    await Notifications.scheduleNotificationAsync({
        content: {
            title: judul,
            body: isi,
            data: { data: 'goes here' },
        },
        trigger: { seconds: detik + (menit * 60) + (jam * 3600) },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: true
        });
    }

    return token;
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        borderColor: 'black',
        flex: 1,
        height:'100%',
        marginBottom: 3,
        paddingHorizontal: 10,
        marginTop:-25,
    },
    
    box_input: {
        borderBottomWidth: 1,
        padding: 10,
        marginVertical: 5,
        width: '100%',
        borderColor: 'gray',
    },
    waktu: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    data :{
        flexDirection:'row',
    },

    head: {
        backgroundColor: '#007874',
        width: 280,
        height:140,
        padding: 12,
        borderBottomLeftRadius: 10,
        borderTopStartRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 90,
        marginLeft:6,
        justifyContent:'center'
    },

    stretch: {
        alignSelf:'center',
        resizeMode: 'stretch',
        width: 330,
        height:260,
        marginLeft:-237,
    },

    teks_isi: {
        color: 'white',
        fontSize: 18,
        marginTop:15,
    },
    teks_judul: {
        color: 'white',
        fontSize: 18
    },
    
    box_opsi: {
        borderWidth: 1,
        marginVertical: 5,
        width: 90,
        borderRadius: 10,
        backgroundColor: '#d1d1d1',
        marginHorizontal: 2,
    },
    tombol: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'purple',
        borderRadius: 5,

    },
    teks: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center'
    },
   
  

    wrapper: {
        backgroundColor: '#0041a3',
        marginTop: '10%',
        height: 300

    },
    judul_besar: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold'
    },

   
});