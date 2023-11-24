import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function ScreenDangNhap({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLogin = async () => {   
        try {
            const storedData = await AsyncStorage.getItem(username);

            if (storedData) {
                const userData = JSON.parse(storedData);

                if (userData.password === password) {
                    setLoginSuccess(true);
                    await AsyncStorage.setItem('loggedInUser', username); 
                    alert('Đăng nhập thành công!');
                    navigation.navigate('ScreenChinh');
                } else {
                    alert('Tài khoản và mật khẩu không đúng. Vui lòng thử lại.');
                }
            } else {
                alert('Tài khoản và mật khẩu không tồn tại. Vui lòng đăng ký trước.');
            }
            handleLoginSuccess(username);
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
        }
    };

    const handleLoginSuccess = async (loggedInUsername) => {
        try {
            setLoggedInAccounts((prevAccounts) => [...prevAccounts, loggedInUsername]);
            // Lưu thông tin tài khoản đã đăng nhập vào AsyncStorage
            await AsyncStorage.setItem('loggedInUser', loggedInUsername);
      
            // Cập nhật state loggedInUser trong ScreenChat
            setLoggedInUser(loggedInUsername);
      
        } catch (error) {
          console.error('Lỗi khi lưu thông tin người dùng đã đăng nhập:', error);
        }
      };

    // Hàm này xác định khi nào đã đăng nhập thành công và hiển thị thông báo và dấu tích xanh
    const renderSuccessMessage = () => {
        if (loginSuccess) {
            return (
                <View>
                    <Image source={require('../assets/checkmark.png')} style={styles.checkmark} />
                    <Text style={styles.successText}>Đăng nhập thành công!</Text>
                </View>
            );
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo2x.png')} style={styles.Imglogo} />
            <View
                style={{
                    width: 330,
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 3,
                    marginTop: 50,
                    justifyContent: "center",
                    marginLeft: 10,
                }}
            >
                <TextInput
                    style={{ fontSize: 16, paddingLeft: 10 }}
                    placeholder="Tên đăng nhập"
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View
                style={{
                    width: 330,
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 3,
                    marginTop: 40,
                    justifyContent: "center",
                    marginLeft: 10,
                }}
            >
                <TextInput
                    style={{ fontSize: 16, paddingLeft: 10, marginTop: 100, }}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Pressable
                    onPress={handleLogin}
                    style={{
                        width: 330,
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 3,
                        marginTop: 50,
                        justifyContent: "center",
                        marginLeft: -2,
                        alignItems: "center",
                        backgroundColor: "skyblue"
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: "400", color: "white", marginRight:15  }}> Đăng Nhập</Text>
                </Pressable>
            </View>
            <View style={{ marginLeft: 20, marginTop: 100 }}>   
                <Text>Bạn không có tài khoản ?</Text>
            </View>
            <Pressable onPress={() => {
                navigation.navigate("ScreenDangKy");
            }} style={{ marginLeft: 10, color: "blue", textDecorationLine: "underline" }}>Đăng ký</Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundImage: 'linear-gradient(45deg, #7017FF, #C500E9, #ED00C0, #F80261 , #FF1B90)',
        alignItems: "center",
        justifyContent: "center",
    },
    Imglogo: {
        width: 350,
        height: 100,
    },
    checkmark: {
        width: 50,
        height: 50,
    },
    successText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
});
