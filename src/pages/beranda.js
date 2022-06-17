import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import styles from "../component/stylesLandingPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
// const Stack = createStackNavigator();
const Beranda1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrap1}>
        <View style={styles.baris}>
          <Text style={styles.title}>BalamApp</Text>
          <View style={styles.wrapikon}>
            <Ionicons
              style={styles.ikon1}
              name="notifications"
              size={30}
              color="white"
            />
            <Ionicons
              style={styles.ikon2}
              name="menu"
              size={40}
              color="white"
            />
          </View>
        </View>
        <View style={styles.wrap2}>
          <View style={styles.dummy}></View>

          <Text style={styles.title3}>Selamat Datang</Text>
          <Text style={styles.title2}>John Doe</Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: -70 }}>
        <Image
          style={styles.stretch}
          source={require("../../assets/siger.png")}
        />
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginLeft: 20,
          marginVertical: 8,
          marginTop: 15,
        }}
      >
        Main Menu
      </Text>

      <ScrollView>
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
              <Text style={{ textAlign: "center", fontWeight: "700" }}>
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
            <Text style={{ textAlign: "center", fontWeight: "700" }}>
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
              <Text style={{ textAlign: "center", fontWeight: "700" }}>
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
              <Text style={{ textAlign: "center", fontWeight: "700" }}>
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
              <Text style={{ textAlign: "center", fontWeight: "700" }}>
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
              <Text style={{ textAlign: "center", fontWeight: "700" }}>
                Lainnya
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
};

export default Beranda1;
