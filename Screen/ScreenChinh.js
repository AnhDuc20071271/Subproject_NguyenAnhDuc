import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();
  const [isTabBarReset, setTabBarReset] = useState(false);

  useEffect(() => {
    if (isTabBarReset) {
      navigation.navigate("Home");
      setTabBarReset(false);
    }
  }, [isTabBarReset]);
  
}
function TimKiemScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { resetBottomTabBar } = route.params || {};

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (resetBottomTabBar) {
        navigation.navigate('ScreenTimKiem');
        resetBottomTabBar();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
}

function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { resetBottomTabBar } = route.params || {};

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (resetBottomTabBar) {
        navigation.navigate('ScreenProfile');
        resetBottomTabBar();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

}

const Tab = createBottomTabNavigator();


export default function ScreenChinh() {
  const [data, setData] = useState([]);
  const [isTabBarReset, setTabBarReset] = useState(false);
  const [text, setText] = useState("");
  const url = "https://655b83e2ab37729791a93c09.mockapi.io/instagrampost";
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const resetBottomTabBar = () => {
    setTabBarReset(!isTabBarReset);
  };

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  useFocusEffect(() => {
    // Reset thanh tab bar ở đây
    navigation.setOptions({
      tabBarOptions: {
        activeTintColor: 'color_for_focused_tab',
        inactiveTintColor: 'gray',
        style: { backgroundColor: 'red' },
      },
    });
  });
  
  const navigateToScreenDangNhap = () => {
    navigation.navigate("ScreenDangNhap");
  };

  const navigateToScreenProfile = () => {
    navigation.navigate("ScreenProfile");
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable>
          <Text style={{ fontSize: 25, fontWeight: "500" }}>Instagram</Text>
          <Image
            source={require("../assets/heart.png")}
            style={{ width: 25, height: 25, marginLeft: 265, marginTop: -25 }}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ScreenChat")}>
          <Image
            source={require("../assets/messenger.png")}
            style={{ width: 25, height: 25, marginLeft: 310, marginTop: -25 }}
          />
        </Pressable>
        <Pressable onPress={toggleMenu}>
          <Image
            source={require("../assets/avatar3.png")}
            style={{ width: 30, height: 30, borderRadius:30/2, marginLeft: 350, marginTop: -28 }}
          />
          
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isMenuVisible}
          onRequestClose={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <Pressable onPress={() => navigateToScreenDangNhap()}>
              <Text style={styles.menuItem}>Đăng xuất</Text>
            </Pressable>
            <Pressable onPress={() => setMenuVisible(false)}>
              <Text style={styles.closeButton}>Đóng</Text>
            </Pressable>
          </View>
        </Modal>
        <Image source={require('../assets/avatar3.png')}
              style={{width:70,height:70,borderRadius:70/2}}></Image>
        <Image source={require('../assets/avatar1.png')}
               style={{width:70,height:70,borderRadius:70/2, marginLeft:85 ,marginTop:-65}} 
                ></Image>
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          Gợi ý cho bạn
        </Text>
        <Pressable>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginLeft: 240,
              marginTop: -25,
            }}
          >
            Bài viết cũ hơn
          </Text>
        </Pressable>
      </View>
      {data.map((item, index) => {
        return (
          <View key={index}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginTop: 20,
                marginLeft: 45,
              }}
            >
              {item.name}
            </Text>
            <Pressable onPress={() => navigation.navigate("ScreenProfile", { item: item })}>
            <Image source={item.image4}
               style={{width:30,height:30,borderRadius:70/2, marginTop:-25, marginLeft:10}} 
                ></Image>
            </Pressable>
            <View
              style={{
                width: 100,
                height: 30,
                borderRadius: 5,
                borderWidth: 2,
                alignItems: "center",
                marginLeft: 240,
                marginTop: -30,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item.follow}
              </Text>
            </View>
            <Image
              source={{ uri: item.image }}
              style={{ width: 400, height: 300, marginTop: 10 }}
            ></Image>
            <View>
              <Image
                source={{ uri: item.image1 }}
                style={{ width: 30, height: 30, marginLeft: 10, marginTop: 10 }}
              ></Image>
              <Image
                source={{ uri: item.image2 }}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 45,
                  marginTop: -35,
                }}
              ></Image>
              <Image
                source={{ uri: item.image3 }}
                style={{
                  width: 35,
                  height: 35,
                  marginLeft: 90,
                  marginTop: -35,
                }}
              ></Image>
              <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 10 }}>
                {item.text}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 10 }}>
                {item.description}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 10 }}>
                {item.date}
              </Text>
            </View>
          </View>
        );
      })}
      <Tab.Navigator  
      tabBarOptions={{ activeTintColor: 'tomato', inactiveTintColor: 'gray', style: {backgroundColor: 'blue',},}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen initialRouteName="Home"
          name="Tìm kiếm"
          component={TimKiemScreen}
          initialParams={{ resetBottomTabBar: resetBottomTabBar }}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{ resetBottomTabBar: resetBottomTabBar }}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: 'linear-gradient(45deg, #7017FF, #C500E9, #ED00C0, #F80261 , #FF1B90)',
  },
  menuItem: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    marginTop: 20,
  },
});
