import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";


const Kontak = () => {
    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={{ padding: 15 }}>
                <Text style={{ color: 'gray', fontSize: 24, fontFamily: 'poppinsbold', alignSelf: 'center', marginBottom: 10 }}>KONTAK KAMI</Text>
                <Text style={{ color: 'gray', fontFamily: 'poppins' }}>Untuk informasi anda dapat menghubungi kami pada layanan berikut.</Text>


                <Text style={{ color: 'gray', marginTop: 15, marginBottom: 5, fontFamily: 'poppins' }}>Phone : </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', fontFamily: 'poppins' }}>
                    <Ionicons
                        //   style={styles.ikonMenu}
                        name="call-outline"
                        size={24}
                        color="#118eeb"
                    />
                    <Text style={{ color: 'gray', paddingLeft: 10, fontFamily: 'poppins' }}>(0721) 481301</Text>
                </View>

                <Text style={{ color: 'gray', marginTop: 15, marginBottom: 5, fontFamily: 'poppins' }}>Email : </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        //   style={styles.ikonMenu}
                        name="mail-outline"
                        size={24}
                        color="#118eeb"
                    />
                    <Text style={{ color: 'gray', paddingLeft: 10, fontFamily: 'poppins' }}>diskominfo@bandarlampungkota.go.id</Text>
                </View>

                <Text style={{ color: 'gray', marginTop: 15, marginBottom: 5, fontFamily: 'poppins' }}>Alamat : </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        //   style={styles.ikonMenu}
                        name="compass-outline"
                        size={26}
                        color="#118eeb"
                    />
                    <Text style={{ color: 'gray', paddingLeft: 10, fontFamily: 'poppins' }}>Jl. Dr.Susilo No.2 Bandar Lampung, Kota Bandar Lampung</Text>
                </View>


                <Text style={{ color: 'gray', marginTop: 15, marginBottom: 5, fontFamily: 'poppins' }}>Jam Operasional : </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        //   style={styles.ikonMenu}
                        name="time-outline"
                        size={26}
                        color="#118eeb"
                    />
                    <Text style={{ color: 'gray', paddingLeft: 10, fontFamily: 'poppins' }}>Mon-Sat: 8.00-16.00</Text>
                </View>
            </View>
        </View>
    )
}

export default Kontak