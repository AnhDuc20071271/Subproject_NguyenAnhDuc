import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageItem = ({ sender, timestamp }) => (
  <View style={styles.messageItem}>
    <Text style={styles.messageSender}>{sender}</Text>  
    <Text>{formatTimestamp(timestamp)}</Text>
  </View>
);

const formatTimestamp = (timestamp) => {
  const now = moment();
  const messageTime = moment(timestamp);
  const diffMinutes = now.diff(messageTime, 'minutes');
  const diffHours = now.diff(messageTime, 'hours');
  const diffDays = now.diff(messageTime, 'days');

  if (diffMinutes < 60) {
    return `Hoạt động ${diffMinutes} phút trước`;
  } else if (diffHours < 24) {
    return `Hoạt động ${diffHours} giờ trước`;
  } else {
    return `Hoạt động ${diffDays} ngày trước`;
  }
};

export default function ScreenChat() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [loggedInAccounts, setLoggedInAccounts] = useState([]);
  const [originalMessages, setOriginalMessages] = useState([
    { sender: "ád", timestamp: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), hidden: true },
    { sender: "AnhDuc_123", timestamp: new Date(new Date().getTime() - 2 * 60 * 1000), hidden: true },
    { sender: "thanh", timestamp: new Date(new Date().getTime() - 4 * 60 * 60 * 60 * 1000), hidden: true },
    { sender: "asd", timestamp: new Date(new Date().getTime() - 8 * 60 * 1000), hidden: true }, 
  ]);
  const navigation = useNavigation();
  
  const userCredentials = {
    'ád': { password: '1234567890', profileName: 'Ád' },
    'AnhDuc_123': { password: '123456789', profileName: 'AnhDuc_123' },
    'thanh': { password: '123456', profileName: 'Thanh' },
    'qwe123': { password: '123', profileName: 'qwe123' },
    'asd': { password: '12345678', profileName: 'Asd' },
  };
  
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem('loggedInUser');
        if (user) {
          setLoggedInUser(user);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };
  
    fetchLoggedInUser();
  }, [loggedInUserProfileName]);
  
  
  useEffect(() => {
    // Cập nhật tên profile khi người dùng thay đổi
    const profileName = userCredentials[loggedInUser]?.profileName || 'Tên Profile';
    setLoggedInUserProfileName(profileName);
  }, [loggedInUser]);
  
  // Thêm state mới để lưu tên profile
  const [loggedInUserProfileName, setLoggedInUserProfileName] = useState('');
  

  const navigateToScreenChinh = () => {
    navigation.navigate("ScreenChinh");
  };

  const navigateToGiaoDienChatScreen = (message) => {
    navigation.navigate("ScreenGiaoDienChat", { sender: message.sender });
  };
  
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem('loggedInUser');
        if (user) {
          setLoggedInUser(user);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };
  
    fetchLoggedInUser();
  }, []);
  
  useEffect(() => {
    fetchLoggedInAccounts();
  }, [loggedInUser]);

  const fetchLoggedInAccounts = async () => {
    try {
      const accounts = await AsyncStorage.getAllKeys();
      setLoggedInAccounts(accounts.filter((account) => account !== 'loggedInUser'));
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tài khoản đã đăng nhập:', error);
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

  const navigateToScreenDangNhap = () => {
    navigation.navigate("ScreenDangNhap", {
      handleLoginSuccess: handleLoginSuccess,
    });
    setShowMenu(false);
  };

  const filteredMessages = originalMessages.filter((message) => {
    return (
      searchQuery !== '' &&
      message.sender.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateToScreenChinh()}>
          <Image source={require('../assets/nutquaylai.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.AccountText}>{loggedInUserProfileName} </Text>
        </TouchableOpacity>
          <View style={[styles.userInfo, { flexDirection: 'row-reverse', marginRight: 10 }]}>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Image source={require('../assets/muitenxoxuong.png')} style={styles.icon} />
          </TouchableOpacity>
            
        </View>
        {/* Call icon */}
        <TouchableOpacity onPress={() => console.log('Call button pressed')}>
          <Image source={require('../assets/goivideo.png')} style={styles.goivideo} />
        </TouchableOpacity>

        {/* Message icon */}
        <TouchableOpacity onPress={() => console.log('Message button pressed')}>
          <Image source={require('../assets/tinnhanmoi.png')} style={styles.tinnhanmoi} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image source={require('../assets/kinhlup.png')} style={styles.icon} />
        <TextInput
          style={styles.searchText}
          placeholder="Tìm kiếm"
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Profiles */}
      <View style={styles.profileContainer}>
        {/* Profile 1 */}
        <View style={styles.profile1}>
          <Image source={require('../assets/avatar1.png')} style={styles.avatar} />
          <Text style={styles.profileNote}>Ghi chú của bạn</Text>
        </View>

        {/* Profile 2 */}
        <View style={styles.profile2}>
          <Image source={require('../assets/avatar2.png')} style={styles.avatar} />
          <Text style={styles.profileName}>AnhDuc_123</Text>
        </View>

        {/* Profile 3 */}
        <View style={styles.profile3}>
          <Image source={require('../assets/avatar3.png')} style={styles.avatar} />
          <Text style={styles.profileName}>thanh</Text>
        </View>
      </View>

      {/* Message Stats */}
      <View style={styles.messageStats}>
        <Text style={styles.messageTitle}>Tin nhắn </Text>
        <Text style={styles.tinnhandangcho}>Tin nhắn đang chờ</Text>
      </View>

      <View style={styles.messagesContainer}>
        {filteredMessages.map((message, index) => (
          <TouchableOpacity key={index} onPress={() => navigateToGiaoDienChatScreen(message)}>
              <MessageItem sender={message.sender} timestamp={message.timestamp} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Messages */}
      <View style={styles.messagesContainer}>
        {originalMessages.map((message, index) => (
          <TouchableOpacity key={index} onPress={() => navigateToGiaoDienChatScreen(message)}>
            <MessageItem sender={message.sender} timestamp={message.timestamp} />
          </TouchableOpacity>
        ))}
      </View>


      {/* Footer */}
      <View style={styles.footer}>
        {showMenu && (
          <View style={styles.menuContainer}>
            <View style={styles.currentAccount}>
              <Text style={styles.currentAccountText}>{loggedInUser} </Text>
              <Image source={require('../assets/dautich.png')} style={styles.dautich} />
            </View>

            <TouchableOpacity onPress={() => navigateToScreenDangNhap()}>
              <Image source={require('../assets/daucong.png')} style={styles.daucong} />
              <Text style={styles.addAccount}>Thêm Tài khoản</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 60, // Tùy chỉnh để đặt menu theo đúng vị trí mong muốn
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    padding: 10,
  },
  currentAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -20,
    marginLeft: 30,
  },
  AccountText: {
    marginTop: 5,
    marginLeft: 10,
  },
  accountInfo: {
    flexDirection: 'row',
  },
  addAccount: {
    marginLeft:40,
    marginTop:-20,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchText: {
    marginLeft: 10,
    color: '#777',
    flex: 1, // Để TextInput mở rộng hết phần còn lại của row
  },
  messageStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  messageTitle: {
    fontWeight: 'bold',
  },
  tinnhandangcho: {
    fontWeight: 'bold',
    color: '#0000FF',
  },
  messageCount: {
    color: '#777',
  },
  icon: {
    width: 20,
    height: 20,
  },
  dautich:{
    width: 70,
    height: 50, 
    marginLeft: 230,
  },
  daucong:{
    width: 40,
    height: 30,
    marginRight:-10,
  },
  goivideo:{
    width: 20,
    height: 20,
    marginLeft: 160,
  },
  tinnhanmoi:{
    width: 20,  
    height: 20,
    marginLeft: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 165,
    width: '100%',
    backgroundColor: '#66FF00',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  profile1: {
    alignItems:'center',
    justifyContent:'space-between',
  },  
  profile2: {
    alignItems:'center',
    marginRight: 10,
  },
  profile3: {
    alignItems:'center',
    marginRight: 100,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  profileNote: {
    fontSize: 14,
    color: '#777',
  },
  profileName: {

  },
  messagesContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  messageItem: {
    marginBottom: 10,
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  currentAccountText:{
    marginLeft:10,
  },
  profileImg:{
    marginRight: 100,
  },
});
