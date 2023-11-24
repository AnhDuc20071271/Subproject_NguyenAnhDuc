import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const MessageBubble = ({ message, isCurrentUser }) => (
  <View style={[styles.messageBubble, isCurrentUser && styles.currentUserBubble]}>
    <Text style={styles.messageText}>{message}</Text>
  </View>
);

const ScreenGiaoDienChat = ({ route, navigation }) => {
  const navigationRef = useNavigation();
  const { sender } = route.params; // Nhận thông tin sender từ route params
  // Thêm cột thời gian vào cấu trúc tin nhắn
  const [messages, setMessages] = useState([
    { id: '1', sender: "ád", sentAt: new Date()},
    { id: '2', sender: "thanh", sentAt: new Date()},
    { id: '3', sender: "AnhDuc_123", sentAt: new Date()},
    { id: '4', sender: "asd", sentAt: new Date()},
    { id: '5', sender: "loggedInUser", content:`Chào bạn ${sender}!`, sentAt: new Date()},
    // Thêm các tin nhắn khác vào đây
  ]);
  const [activeTime, setActiveTime] = useState('');

  useEffect(() => {
    const fetchActiveTime = async () => {
      try {
        // Thực hiện logic lấy activeTime từ local storage ở đây
        // Ví dụ sử dụng AsyncStorage
        const storedActiveTime = await AsyncStorage.getItem('activeTimeKey');
        
        // Nếu có giá trị activeTime từ local storage, cập nhật state
        if (storedActiveTime) {
          setActiveTime(storedActiveTime);
        } else {
          console.warn('Không tìm thấy activeTime trong local storage');
        }
      } catch (error) {
        console.error('Lỗi khi lấy activeTime từ local storage:', error);
      }
    };

    // Gọi hàm fetchActiveTime để lấy activeTime từ local storage
    fetchActiveTime();
  }, []); // Dependency array rỗng để useEffect chỉ chạy một lần khi component được mount

  const [selectedImage, setSelectedImage] = useState(null);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    const newMessage = { id: `${messages.length + 1 }`, sender: "loggedInUser", content: inputMessage };
    setMessages([...messages, newMessage]);
  };

  const pickImage = async () => {
    // Sử dụng thư viện hình ảnh để chọn hình ảnh từ thư viện hoặc máy ảnh
    // Xử lý hình ảnh được chọn và lưu vào state selectedImage
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigationRef.navigate("ScreenChat")}>
          <Image source={require('../assets/nutquaylai.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{sender}</Text>
          <Text style={styles.activeTime}>{activeTime}</Text>
        </View>
        <View style={styles.callIcons}>
          <TouchableOpacity>
            <Image source={require('../assets/dienthoai.png')} style={styles.phoneIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/goivideo.png')} style={styles.videoCallIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble style={styles.mess_Text}
            message={item.sender === sender ? `Chào bạn!` : item.content}
            isCurrentUser={item.sender === "loggedInUser"}
          />
        )}
      />
      <View style={styles.inputContainer}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
      <TouchableOpacity onPress={pickImage}>
        <Image source={require('../assets/camera.png')} style={styles.cameraIcon} />
      </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Image source={require('../assets/send.png')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeTime: {
    fontSize: 14,
    color: '#666',
  },
  callIcons: {
    flexDirection: 'row',
  },
  phoneIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  videoCallIcon: {
    width: 30,
    height: 30,
  },
  messageBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    maxWidth: '70%',
    padding: -10,
    marginLeft:10,
    marginVertical: 5,
  },
  currentUserBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    padding:10,
    marginleft:5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  cameraIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  mess_Text: {
    backgroundColor: '#FFFFFF',
  }
});


export default ScreenGiaoDienChat;
