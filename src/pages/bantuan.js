import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
const Bantuan = () => {

    const [modal1, setModal1] = useState(false)
    const handleModal1 = () => setModal1(() => !modal1);

    const [modal2, setModal2] = useState(false)
    const handleModal2 = () => setModal2(() => !modal2);

    const [modal3, setModal3] = useState(false)
    const handleModal3 = () => setModal3(() => !modal3);

    const [modal4, setModal4] = useState(false)
    const handleModal4 = () => setModal4(() => !modal4);

    const [modal5, setModal5] = useState(false)
    const handleModal5 = () => setModal5(() => !modal5);

    return (
        <ScrollView style={{ padding: 10, backgroundColor: 'white' }}>
            <View style={{ padding: 10 }}>
                <Text style={{ color: 'gray', fontSize: 24, fontFamily: 'poppinsbold', alignSelf: 'center', marginBottom: 10 }}>Bantuan</Text>
                <View>
                    <TouchableOpacity
                        onPress={handleModal1}
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={styles.textLink}>Panduan Absensi</Text>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={18}
                            color="#24A0ED"
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={handleModal2}
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={styles.textLink}>Info Jadwal Liput</Text>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={18}
                            color="#24A0ED"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleModal3}
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={styles.textLink}>Reset Device Perangkat Absensi</Text>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={18}
                            color="#24A0ED"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleModal4}
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={styles.textLink}>Panduan Fitur Catatan</Text>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={18}
                            color="#24A0ED"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleModal5}
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={styles.textLink}>Panduan Fitur Pengingat </Text>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={18}
                            color="#24A0ED"
                        />
                    </TouchableOpacity>



                    <Modal
                        onBackButtonPress={handleModal1}

                        style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 10, marginVertical: 90 }}
                        onBackdropPress={handleModal1}
                        isVisible={modal1}>
                        <ScrollView >
                            <Text style={styles.title}>Panduan Absensi</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray', marginVertical: 10 }} />
                            <Text style={styles.teksbiasa}>      Dalam melakukan absensi terdapat beberapa tahapan yaitu:</Text>
                            <Text style={styles.teksbiasa}>1. Pastikan anda telah mendaftar dan terdaftar sebagai user.</Text>
                            <Text style={styles.teksbiasa}>2. Anda login sebagai user.</Text>
                            <Text style={styles.teksbiasa}>3. Masuk ke menu presensi pada menu navigasi.</Text>
                            <Text style={styles.teksbiasa}>4. Lalu tekan tombol "Lakukan Presensi" pada menu presensi.</Text>
                            <Text style={styles.teksbiasa}>5. Kemudian tekan tombol "Presensi Sekarang" dan absensi anda akan tersimpan dan dapat dilihat pada riwayat presensi.</Text>
                            <Text style={styles.teksbiasa}>6. Pastikan anda terkoneksi dengan koneksi jaringan WiFi Pemkot Kominfo.</Text>
                            <Text style={styles.teksbiasa}>7. Pastikan anda menggunakan perangkat yang digunakan diawal saat pendaftaran akun. Jika berganti perangkat silahkan minta admin untuk melakukan reset status device anda.</Text>
                        </ScrollView>
                    </Modal>

                    <Modal
                        onBackButtonPress={handleModal2}

                        style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 10, marginVertical: 90 }}
                        onBackdropPress={handleModal2}
                        isVisible={modal2}>
                        <ScrollView >
                            <Text style={styles.title}>Info Jadwal Liput</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray', marginVertical: 10 }} />
                            <Text style={styles.teksbiasa}>     Pada menu jadwal liput anda akan melihat daftar yang berisi keterangan mengenai data jadwal liput yang akan dilaksanakan. Data terdiri dari nama peliput, lokasi, dan waktu pelaksanaanya. Kita juga dapat memilah daftar liput berdasarkan tanggal</Text>

                            <Text style={styles.teksbiasa}>     Admin akan mengelola data dari peliput yang akan bertugas dan melakukan update secara berkala. Data jadwal liput yang akan muncul pada hari ini akan muncul di beranda.</Text>
                        </ScrollView>
                    </Modal>

                    <Modal
                        onBackButtonPress={handleModal3}
                        style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 10, marginVertical: 90 }}
                        onBackdropPress={handleModal3}
                        isVisible={modal3}>
                        <ScrollView >
                            <Text style={styles.title}>Reset Device Perangkat Absensi</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray', marginVertical: 10 }} />
                            <Text style={styles.teksbiasa}>     Dalam melakukan presensi, perangkat yang dapat digunakan hanyalah perangkat yang di daftarkan di awal pendaftaran saja. Jika perangkat yang anda gunakan di awal berganti, anda dapat meminta admin untuk melakukan reset status device perangkat anda.</Text>
                        </ScrollView>
                    </Modal>

                    <Modal
                        onBackButtonPress={handleModal4}
                        style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 10, marginVertical: 90 }}
                        onBackdropPress={handleModal4}
                        isVisible={modal4}>
                        <ScrollView >
                            <Text style={styles.title}>Panduan Fitur Catatan</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray', marginVertical: 10 }} />
                            <Text style={styles.teksbiasa}>    Pada fitur catatan kita dapat menambah dan menghapus catatan. Fitur ini berfungsi untuk menyimpan catatan kecil kita. </Text>
                        </ScrollView>
                    </Modal>

                    <Modal
                        onBackButtonPress={handleModal5}
                        style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 10, marginVertical: 90 }}
                        onBackdropPress={handleModal5}
                        isVisible={modal5}>
                        <ScrollView >
                            <Text style={styles.title}>Panduan Fitur Pengingat</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray', marginVertical: 10 }} />
                            <Text style={styles.teksbiasa}>    Kita dapat menggunakan fitur pengingat untuk dapat membuat notifikasi pada ponsel kita mengenai suatu kegiatan atau hal yang mungkin akan kita lakukan.</Text>
                        </ScrollView>
                    </Modal>



                </View>
            </View>
        </ScrollView>
    )
}

export default Bantuan

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
    }
})