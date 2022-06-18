import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from '../firebase/crudConf';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const JadwalLiput = () => {
    const [text, onChangeText] = useState('')
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "jadwal");

    const createUser = async () => {
        await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    };
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // const [text, setText] = useState("hihih")
    const updateUser = async (id, age) => {
        const userDoc = doc(db, "jadwal", id);
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields);
        getUsers();
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "jadwal", id);
        await deleteDoc(userDoc);
        getUsers();
    };


    useFocusEffect(
        React.useCallback(() => {

            getUsers();
        }, [])
    );
    return (
        <View style={{ display: 'flex', flex: 1, }}>
            <View style={styles.container}>


                <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Jadwal Liput</Text>

                {/* <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                /> */}

                <TextInput
                    style={styles.input}
                    onChangeText={setNewName}
                    value={newName}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setNewAge}
                    value={newAge}
                />
                {/* {users.map((user, index) => {
                    return (
                        <View key={index}>
                            <Text>Name: {user.name}</Text>
                            <Text>Age: {user.age}</Text>
                            <TouchableOpacity
                                style={{ backgroundColor: 'blue', padding: 10, margin: 10 }}
                                onPress={() => {
                                    updateUser(user.id, user.age);
                                }}
                            >

                                <Text style={{ color: 'white' }}> Increase Age</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: 'blue', padding: 10, margin: 10 }}
                                onPress={() => {
                                    deleteUser(user.id);
                                }}
                            >

                                <Text style={{ color: 'white' }}> Delete User</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })} */}

                <FlatList
                    contentContainerStyle={{ paddingBottom: 120 }}
                    data={users}
                    renderItem={({ item }) => (
                        <View >
                            <Text>Name: {item.name}</Text>
                            <Text>Age: {item.age}</Text>
                            <TouchableOpacity
                                style={{ backgroundColor: 'blue', padding: 10, margin: 10 }}
                                onPress={() => {
                                    updateUser(item.id, item.age);
                                }}
                            >

                                <Text style={{ color: 'white' }}> Increase Age</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: 'blue', padding: 10, margin: 10 }}
                                onPress={() => {
                                    deleteUser(item.id);
                                }}
                            >

                                <Text style={{ color: 'white' }}> Delete User</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                    style={styles.ikonAdd}
                    onPress={createUser}
                >
                    <Ionicons

                        name="add-circle"
                        size={60}
                        color="#1F76C6"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default JadwalLiput

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },
    ikonAdd: {
        position: 'absolute',
        bottom: 30,
        right: 40
    },
    input: {
        borderWidth: 1,
        margin: 20,
        padding: 20
    }

})
