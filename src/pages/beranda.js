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
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { db } from '../firebase/crudConf';
import React, { useState } from "react";
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
import styles from "../component/stylesLandingPage";
import Ionicons from "react-native-vector-icons/Ionicons";



const Beranda1 = ({ navigation }) => {
  const [status, setStatus] = useState(false)
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const usersCollectionRef = collection(db, "pengguna");
  const [email, setEmail] = useState('')
  const [pengguna, setPengguna] = useState([])
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useFocusEffect(
    React.useCallback(() => {

      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user != null) {
          setEmail(user.email)
          getUsers();
        } else {
          setPengguna([])
        }
      })

      return unsubscribe
    }, [])
  );
  // console.log(pengguna)
  return (
    <View style={styles.container}>
      <View style={styles.wrap1}>
        <View style={styles.baris}>
          <View>
            <Text style={styles.title}>KominfoApp</Text>
            <Text style={styles.subtitle}>Bandar Lampung</Text>
          </View>
          <View style={styles.wrapikon}>
            <Ionicons
              style={styles.ikon1}
              name="notifications"
              size={30}
              color="white"
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profil', {
                  pengguna1: pengguna
                })
              }}
            >
              <Ionicons
                style={styles.ikon2}
                name="person-circle"
                size={34}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ height: 0.5, backgroundColor: '#D7DBDD' }}></View>
      <ScrollView>
        <View style={styles.pageScroll}>

          <View style={{
            backgroundColor: '#118eeb', height: 350, borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
          }}>
            <Text style={{ color: '#1F76C6' }}>-</Text>
          </View>

          <View style={styles.infoProfil}>
            <Image
              style={styles.stretch}
              source={require("../../assets/siger.png")}
            />
            <View style={styles.wrap2}>
              <View style={styles.dummy}></View>
              <View style={styles.namaProfil}>
                <Text style={styles.title3}>Selamat Datang</Text>

                {pengguna.map((item, index) => (

                  <View key={index} style={{}}>
                    <View >
                      {item.email.toLowerCase() == email.toLowerCase() && (
                        <Text style={styles.title2}> {item.nama}</Text>
                      )}

                    </View>
                  </View>
                ))}

              </View>
            </View>
          </View>

          <View style={styles.mainMenu}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginVertical: 8,
                marginTop: 15,
                color: 'gray',
                fontFamily: 'poppinsbold'
              }}
            >
              Main Menu
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >

              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Jadwal Liput");
                  }}>
                  <View style={styles.bgmenu}>
                    <Ionicons
                      style={styles.ikonMenu}
                      name="calendar"
                      size={34}
                      color="white"
                    />
                  </View>
                  <Text style={styles.fontBlack}>
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
                  <View style={styles.bgmenu}>
                    <Ionicons
                      style={styles.ikonMenu}
                      name="newspaper"
                      size={34}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
                <Text style={styles.fontBlack}>
                  Catatan
                </Text>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Pengingat");
                  }}
                >
                  <View style={styles.bgmenu}>
                    <Ionicons
                      style={styles.ikonMenu}
                      name="megaphone"
                      size={34}
                      color="white"
                    />
                  </View>
                  <Text style={styles.fontBlack}>
                    Pengingat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Jadwal Liput");
                  }}
                >
                  <View style={styles.bgmenu}>
                    <Ionicons
                      style={styles.ikonMenu}
                      name="calendar"
                      size={34}
                      color="white"
                    />
                  </View>
                  <Text style={styles.fontBlack}>
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
                  <View style={styles.bgmenu}>
                    <Ionicons
                      style={styles.ikonMenu}
                      name="newspaper"
                      size={34}
                      color="white"
                    />
                  </View>
                  <Text style={styles.fontBlack}>
                    Catatan
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Lainnya");
                  }}>
                  <View style={styles.bgmenu}>

                    <Ionicons
                      style={styles.ikonMenu}
                      name="grid"
                      size={34}
                      color="white"
                    />
                  </View>
                  <Text style={styles.fontBlack}>
                    Lainnya
                  </Text>
                </TouchableOpacity>
              </View>


            </View>

          </View>
        </View>
      </ScrollView>

    </View >
  );
};
export default Beranda1;
