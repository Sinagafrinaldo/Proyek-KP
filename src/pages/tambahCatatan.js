import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const TambahCatatan = () => {
    const [judul, setJudul] = useState('')
    const [isi, setIsi] = useState('')
    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <View style={{ backgroundColor: 'white', padding: 20 }}>
                <Text>Judul</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setJudul}
                    value={judul}
                    placeholder='Judul...'
                />
                <Text>Isi Catatan</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setIsi}
                    value={isi}
                    placeholder='Isi catatan...'
                />

                <TouchableOpacity style={styles.btntambah}>
                    <Text style={styles.tekstambah}>Tambah</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TambahCatatan

const styles = StyleSheet.create({
    input: {
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
    },
    btntambah: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 10,
        marginVertical: 20

    },
    tekstambah: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700'
    }
})