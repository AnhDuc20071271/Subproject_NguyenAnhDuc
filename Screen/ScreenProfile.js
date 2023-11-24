import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ScreenProfile = ({ route }) => {
  const navigation = useNavigation();
  const navigateToScreenChinh = () => {
    navigation.navigate("ScreenChinh");
  };
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={() => navigateToScreenChinh()}>
          <Image
            source={require("../assets/nutquaylai.png")}
            style={{ width: 30, height: 30 }}
          ></Image>
        </Pressable>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "600",
            marginLeft: 60,
            marginTop: -33,
          }}
        >
          {item.name}
        </Text>
        <Image
          source={require("../assets/3chamdoc.png")}
          style={{ width: 25, height: 25, marginLeft: 360, marginTop: -25 }}
        ></Image>
        <Image
          source={require("../assets/chuongicon.png")}
          style={{ width: 25, height: 25, marginLeft: 320, marginTop: -25 }}
        ></Image>
        <View>
          <Image
            source={{ uri: item.image4 }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 70 / 2,
              marginTop: 40,
              marginLeft: 20,
            }}
          ></Image>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 130,
              marginTop: -60,
            }}
          >
            {item.baiviet}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 210,
              marginTop: -20,
            }}
          >
            {item.nguoitheodoi}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 310,
              marginTop: -20,
            }}
          >
            {item.dangtheodoi}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 110,
              marginTop: 5,
            }}
          >
            Bài viết
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 180,
              marginTop: -20,
            }}
          >
            Người theo...
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 290,
              marginTop: -20,
            }}
          >
            Đang theo...
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            marginLeft: 25,
            marginTop: 25,
          }}
        >
          {item.name1}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            marginLeft: 15,
            marginTop: 10,
          }}
        >
          {item.linkface}
        </Text>
      </View>
      <View
        style={{
          width: 150,
          height: 28,
          borderRadius: 5,
          borderWidth: 2,
          alignItems: "center",
          marginLeft: 25,
          marginTop: 20,
        }}
      ><Text>Theo dõi</Text>
        <Image source={require("../assets/muitenxoxuong.png")}
                style={{width:20,height:20, marginLeft:120,marginTop:-17}}
        ></Image>
        <Image source={require('../assets/avatar1.png')}
               style={{width:70,height:70,borderRadius:70/2, marginLeft:-120 ,marginTop:25}}></Image>
        <Image source={require('../assets/avatar3.png')}
               style={{width:65,height:65,borderRadius:65/2, marginLeft:50 ,marginTop:-72}}></Image>       
      </View>
          
      <View
        style={{
          width: 150,
          height: 28,
          borderRadius: 5,
          borderWidth: 2,
          alignItems: "center",
          marginLeft: 200,
          marginTop: -28,
        }}
      ><Text>Nhắn tin</Text></View>
      <Image source={require("../assets/gallery.png")}
              style={{width:40,height:40,marginLeft:165,marginTop:80}}
      ></Image>
      <View >
          <View style={styles.horizontalLine}></View>

      <Image source={{uri: item.galleryvietthanh1}}
              style={{width:170,height:170, marginLeft:0,marginTop:-10}}
      ></Image>
        <Image source={{uri: item.galleryvietthanh2}}
              style={{width:170,height:170, marginLeft:170,marginTop:-170}}
      ></Image>
       <Image source={{uri: item.galleryvietthanh3}}
              style={{width:170,height:170, marginLeft:0,marginTop:0}}
      ></Image>
      <Image source={{uri: item.gallerytruongan1}}
              style={{width:170,height:170, marginLeft:0,marginTop:-340}}
      ></Image>
      <Image source={{uri: item.gallerytruongan2}}
              style={{width:170,height:170, marginLeft:170,marginTop:-170}}
      ></Image>
      <Image source={{uri: item.gallertruongan3}}
              style={{width:170,height:170, marginLeft:0,marginTop:0}}
      ></Image>
      <Image source={{uri: item.galleryanhduc1}}
              style={{width:170,height:170, marginLeft:0,marginTop:-340}}
      ></Image>
      <Image source={{uri: item.galleryanhduc2}}
              style={{width:170,height:170, marginLeft:170,marginTop:-170}}
      ></Image>
      <Image source={{uri: item.galleryanhduc3}}
              style={{width:170,height:170, marginLeft:0,marginTop:0}}
      ></Image>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  horizontalLine: {
    height: 1, // Điều chỉnh chiều cao của đường ngang
    backgroundColor: 'black', // Màu sắc của đường ngang
    marginVertical: 10, // Khoảng cách giữa đường ngang và các phần khác (tùy chọn)
    marginTop: 10
  },
});
export default ScreenProfile;
