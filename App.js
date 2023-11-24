import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScreenDangNhap from "./Screen/ScreenDangNhap";
import ScreenChinh from "./Screen/ScreenChinh";
import ScreenDangKy from "./Screen/ScreenDangKy";
import ScreenChat from "./Screen/ScreenChat";
import ScreenGiaoDienChat from "./Screen/ScreenGiaoDienChat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenTimKiem from './Screen/ScreenTimKiem';
import ScreenProfile from './Screen/ScreenProfile';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName=""
      screenOptions={{
    headerShown: false}} >
        <Stack.Screen name="ScreenDangNhap" component={ScreenDangNhap}  />
        <Stack.Screen name="ScreenDangKy" component={ScreenDangKy}  />
        <Stack.Screen name="ScreenChinh" component={ScreenChinh} /> 
        <Stack.Screen name="ScreenChat" component={ScreenChat}/>
        <Stack.Screen name="ScreenGiaoDienChat" component={ScreenGiaoDienChat}/>
        <Stack.Screen name="ScreenTimKiem" component={ScreenTimKiem}/>
        <Stack.Screen name="ScreenProfile" component={ScreenProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
