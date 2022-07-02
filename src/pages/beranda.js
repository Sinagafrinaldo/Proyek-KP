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
import styles2 from "../component/styleJadwalLiput2";

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
  const getJadwal = async () => {
    const data = await getDocs(jadwalCollectionRef);
    setJadwal(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useFocusEffect(
    React.useCallback(() => {
      getJadwal()
      let today = new Date();
      if (today.getMonth() < 10) {
        let date = today.getFullYear() + '/0' + (today.getMonth() + 1) + '/' + today.getDate();
        setSelectedDate(date);
      } else {
        setSelectedDate(date);
        let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
      }
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user != null) {
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
            <Ionicons
              style={styles.icon_notification}
              name="notifications"
              size={26}
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
                style={styles.icon_person}
                name="person-circle"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.line_nav}></View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.background_page}>
          <Text style={{ color: '#1F76C6' }}>-</Text>
        </View>
        {url == undefined && (


          <View style={styles.info_profil}>
            <Image
              style={styles.stretch}
              source={require("../../assets/siger.png")}
            />
            <View style={styles.background_profil}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.image_profil}></View>
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


          <View style={styles.info_profil}>
            <Image
              style={styles.stretch}
              source={require("../../assets/siger.png")}
            />
            <View style={styles.background_profil}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <View style={styles.image_profil}></View> */}
                <View style={styles.symbol}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('Tampil Foto', {
                      url: url
                    })
                  }}>
                    <Image style={{ height: 80, borderRadius: 100, width: 80, marginLeft: 20 }} source={{ uri: url }} />
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

        <View style={styles.card}>
          <Text style={styles.title_card}>Main Menu</Text>
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


          </View>

          <View style={styles.list_card}>

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

            <View style={{ marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Lainnya");
                }}>
                <View style={styles.bg_menu}>

                  <Ionicons
                    style={styles.icon_menu}
                    name="grid"
                    size={34}
                    color="white"
                  />
                </View>
                <Text style={styles.font_menu}>
                  Lainnya
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.flatlist_timetable}>
          <Text style={styles.text_timetable}>Jadwal Liput Hari Ini</Text>

          <View style={styles.card_timetable}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              horizontal
              contentContainerStyle={{ paddingVertical: 20, }}
              data={jadwal}
              renderItem={({ item, index }) => (
                <View>
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
