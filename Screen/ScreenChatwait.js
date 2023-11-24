import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Pressable,Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function ScreenChatwait() {

    const navigation = useNavigation();
  const navigateToScreenChat = () => {
    navigation.navigate("ScreenChat");
  };
  return (
    <View style={styles.container}>
        <View>
        <Pressable onPress={() => navigateToScreenChat()} >
      <Image source={require("../assets/nutquaylai.png")}
             style={{width:30,height:30}}
      ></Image>
      <Text style={{fontSize:23 , fontWeight:"600", marginLeft: 60, marginTop:-33}}>Tin Nhắn Đang Chờ</Text>
      </Pressable>
        </View>
        <View>
          <Image source={require("../assets/eyeIcon.png")}
                  style={{width:40,height:40,borderRadius:40/2,marginTop:20}}
          ></Image>
          <Text style={{fontSize:18,fontWeight:"500", marginLeft:60, marginTop:-35}}>Tin nhắn đang chờ đã ẩn</Text>
          <Image source={require("../assets/muitenphai.png")}
                style={{width:30,height:30,borderRadius:30/2,marginTop:-25,marginLeft:350}}
          ></Image>
        </View>
    <View >
    <Image source={require("../assets/chiase.png")}
          style={{width:200,height:200,marginTop:150,marginLeft:100,borderRadius:200/2,backgroundColor:"white"}}>
</Image>
    <Text style={{fontSize:30,fontWeight:"500", marginLeft:80,marginTop:-50}}>Không có tin nhắn </Text>
    <Text style={{fontSize:30,fontWeight:"500",marginLeft:100}}> đang chờ nào</Text>
    <Text style={{fontSize:20,fontWeight:"300",marginLeft:70}}>Bạn không có tin nhắn chờ nào</Text>
  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
  },
});