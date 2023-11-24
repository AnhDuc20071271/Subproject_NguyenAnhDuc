import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function ScreenDangKy() {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    setIsFormFilled(!!phoneOrEmail && !!fullName && !!username && !!password);
  }, [phoneOrEmail, fullName, username, password]);

  const handleSignUp = () => {
    if (isFormFilled) {
      AsyncStorage.getItem(username)
        .then((existingUser) => {
          if (existingUser) {
            alert(
              "Tên người dùng đã tồn tại. Vui lòng chọn tên người dùng khác."
            );
          } else {
            const userData = {
              phoneOrEmail,
              fullName,
              username,
              password,
            };

            // Chuyển đổi thành chuỗi JSON
            const jsonString = JSON.stringify(userData);

            AsyncStorage.setItem(username, jsonString)
              .then(() => {
                alert("Đăng ký thành công!");
                // Điều hướng đến màn hình chính hoặc màn hình đăng nhập
                // Ví dụ: navigation.navigate('Home');
              })
              .catch((error) => {
                console.error("Lỗi khi lưu dữ liệu vào AsyncStorage:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Lỗi khi kiểm tra tên người dùng:", error);
        });
    } else {
      alert("Vui lòng điền đủ thông tin để đăng ký.");
    }
  };

  const handleLearnMore = () => {
    Linking.openURL("/help/instagram/");
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL("/privacy/policy");
  };

  const handleCookiesPolicy = () => {
    Linking.openURL("/policies/cookies/");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
    showStoredData();
  };

  const isJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // ...

  const showStoredData = async () => {
    try {
      const data = [];
      const keys = await AsyncStorage.getAllKeys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const jsonString = await AsyncStorage.getItem(key);

        if (key && jsonString) {
          console.log("Giá trị của jsonString:", jsonString);
          // Kiểm tra xem jsonString có phải là một chuỗi JSON hợp lệ hay không
          if (isJSON(jsonString)) {
            const parsedValue = JSON.parse(jsonString);
            data.push({ key, value: parsedValue });
          } else {
            console.error(
              "Dữ liệu không phải là chuỗi JSON hợp lệ:",
              jsonString
            );
            // Xử lý nếu giá trị không phải là JSON hợp lệ
          }
        } else {
          console.error(
            "Key hoặc giá trị là null hoặc undefined cho key:",
            key
          );
          // Xử lý nếu key hoặc giá trị là null hoặc undefined
        }
      }
      setStoredData(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
    }
  };

  // ...

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo2x.png")} style={styles.logo} />
      </View>
      <Text style={styles.description}>
        Đăng ký để xem ảnh và video từ bạn bè
      </Text>
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>HOẶC</Text>
        <View style={styles.separatorLine} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại di động hoặc email"
        onChangeText={(text) => setPhoneOrEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên đầy đủ"
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        onChangeText={(text) => setUsername(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.eyeContainer}>
          <TouchableOpacity onPress={toggleShowPassword}>
            <Image
              source={
                showPassword
                  ? require("../assets/eye.png")
                  : require("../assets/eyeIcon.png")
              }
              style={styles.eyeImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      {!isFormFilled && (
        <Text style={{ color: "red", marginTop: 10 }}>
          Vui lòng điền đủ thông tin để đăng ký.
        </Text>
      )}
      <Text style={styles.infoText}>
        Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ
        của bạn lên Instagram.
        <Text style={styles.learnMoreLink} onPress={handleLearnMore}>
          {" "}
          Tìm hiểu thêm
        </Text>
      </Text>
      <Text style={styles.infoText}>
        Bằng cách đăng ký, bạn đồng ý với Điều khoản,{" "}
        <Text style={styles.policyLink} onPress={handlePrivacyPolicy}>
          Chính sách quyền riêng tư
        </Text>{" "}
        và{" "}
        <Text style={styles.policyLink} onPress={handleCookiesPolicy}>
          {" "}
          Chính sách cookie
        </Text>{" "}
        của chúng tôi.
      </Text>
      <TouchableOpacity
        style={styles.previewIconContainer}
        onPress={togglePreview}
      >
        <Image
          source={require("../assets/Iconchamhoi.png")}
          style={styles.previewIcon}
        />
      </TouchableOpacity>
      {showPreview && (
        <View style={styles.previewContainer}>
          {storedData.map((item) => (
            <Text key={item.key}>
              {`${item.key}: ${
                item.value && item.value.password
                  ? item.value.password
                  : "Không có mật khẩu"
              }`}
            </Text>
          ))}
        </View>
      )}
      <TouchableOpacity 
        style={[styles.signUpButton, !isFormFilled && styles.disabledButton]}
        onPress={isFormFilled ? handleSignUp : null}
        disabled={!isFormFilled}
      >
        <Text style={styles.signUpText}>Đăng ký</Text>
      </TouchableOpacity>
      {/* Thêm phần mới dưới nút Đăng ký */}
      <Text style={styles.signInText}>
        Bạn có tài khoản?{" "}
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate("ScreenDangNhap")}
        >
          Đăng nhập
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 12,
  },
  logo: {
    width: 350,
    height: 95,
  },
  description: {
    marginBottom: 10,
  },
  separatorContainer: {
    flexDirection: "row", // Sắp xếp theo chiều ngang
    alignItems: "center", // Đặt phần tử con ở giữa theo chiều dọc
    marginVertical: 10,
  },
  separatorLine: {
    flex: 1, // Chiếm một phần bằng nhau để đảm bảo đường gạch ngang ở giữa
    height: 1, // Độ dày của đường gạch ngang
    backgroundColor: "blue", // Màu của đường gạch ngang
  },
  separatorText: {
    backgroundColor: "#fff", // Để chữ "HOẶC" hiển thị trên nền trắng
    paddingHorizontal: 10, // Khoảng cách giữa chữ và đường gạch ngang
    fontSize: 14, // Kích thước chữ
    fontWeight: "bold", // Chữ
    marginHorizontal: 5, // Khoảng cách giữa chữ và đường gạch ngang
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
    width: 300,
  },
  signUpButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
    width: 300,
    height: 40,
  },
  signUpText: {
    color: "white",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  infoText: {
    marginTop: 10,
    textAlign: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  learnMoreLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  policyLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  passwordContainer: {
    flexDirection: "row", // Sắp xếp theo chiều ngang
    alignItems: "center", // Đặt phần tử con ở giữa theo chiều dọc
  },
  eyeContainer: {
    position: "absolute",
    right: 10, // Điều chỉnh khoảng cách từ biên phải của TextInput
  },
  eyeImage: {
    width: 24,
    height: 24,
  },
  previewIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  previewIcon: {
    width: 10,
    height: 10,
  },
  previewContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 70,
    right: 20,
    zIndex: 2,
    elevation: 2,
  },
  signInText: {
    marginTop: 10,
    textAlign: "center",
  },
  signInLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

