import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const navigateToAccountDetail = (account) => {
  // Thực hiện chuyển hướng đến trang chi tiết tài khoản
  // Đây là nơi bạn xử lý logic chuyển hướng
  console.log(`Chuyển hướng đến trang chi tiết của tài khoản ${account}`);
};

export default function ScreenTimKiem() {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const navigation = useNavigation();
    const [originalMessages, setOriginalMessages] = useState([
        { sender: "ád", timestamp: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), hidden: true },
        { sender: "AnhDuc_123", timestamp: new Date(new Date().getTime() - 2 * 60 * 1000), hidden: true },
        { sender: "thanh", timestamp: new Date(new Date().getTime() - 4 * 60 * 60 * 60 * 1000), hidden: true },
        { sender: "asd", timestamp: new Date(new Date().getTime() - 8 * 60 * 1000), hidden: true }, 
      ]);
      const [filteredMessages, setFilteredMessages] = useState([]);
      const handleSearch = (text) => {
        setSearchQuery(text);
    
        const filtered = originalMessages.filter((message) => {
          return (
            text !== '' &&
            message.sender.toLowerCase().includes(text.toLowerCase())
          );
        });
    
        setFilteredMessages(filtered);
    
        // Lưu tên người dùng vào danh sách tìm kiếm gần đây
        if (text !== '' && !recentSearches.includes(text)) {
          setRecentSearches((prevSearches) => [...prevSearches, text]);
          setSelectedAccounts((prevAccounts) => [...prevAccounts, text]);
        }
      };

      useEffect(() => {
        // Lưu danh sách tìm kiếm gần đây vào AsyncStorage
        AsyncStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      }, [recentSearches]);


    const navigateToScreenChinh = () => {
        navigation.navigate("ScreenChinh");
        navigation.reset({
          index: 0,
          routes: [{ name: "ScreenChinh" }],
        });
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigateToScreenChinh()}>
                    <Image source={require('../assets/nutquaylai.png')} style={styles.icon} />
                </Pressable>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Image source={require('../assets/kinhlup.png')} style={styles.icon} />
                    <TextInput
                    style={styles.searchText}
                    placeholder= "Tìm kiếm"
                    onChangeText={(text) => handleSearch(text)}
                    />
                </View>
            </View>

            <View style={styles.messageStats}>
                <Text style={styles.GanDay}> Gần Đây </Text>
                <Text style={styles.Xemtatca}> Xem tất cả </Text>
            </View>
            

            <View style={styles.messagesContainer}>
            <FlatList
              data={filteredMessages}
              keyExtractor={(item) => item.sender.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    // Xử lý khi người dùng chọn một tài khoản trong kết quả tìm kiếm
                  }}
                >
                  <View style={styles.messageItem}>
                    <Text style={styles.messageSender}>{item.sender}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            </View>
              {selectedAccounts.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    // Xử lý khi người dùng chọn một tài khoản đã tìm kiếm
                    // Chuyển hướng đến trang chi tiết của tài khoản
                    navigateToAccountDetail(selectedAccounts[selectedAccounts.length - 1]);
                  }}
                >
                  <View style={styles.messageItem}>
                    <Text style={styles.messageSender}>{selectedAccounts[selectedAccounts.length - 1]}</Text>
                  </View>
                </TouchableOpacity>
              )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    icon: {
        width: 20,
        height: 20,
      },
      searchBarContainer: {
        // Để tạo khoảng trống giữa thanh tìm kiếm và dòng "Gần Đây"
        marginBottom: 10,
      },
      searchBar: {
        flexDirection: 'row',
        padding: -1,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flex: 1,
      },
      searchText: {
        height: 30, // Độ cao của TextInput
        marginLeft: 20,
        color: '#777',
        flex: 1, // Để TextInput mở rộng hết phần còn lại của row
      },
      messagesContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
      },
      GanDay: {
        fontWeight: 'bold',
        color: 'black', // Màu trắng
      },
      Xemtatca: {
        color: 'blue', // Màu xanh dương
      },
      messageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginRight:10,
      },
      messageSender: {
        fontWeight: 'bold',
      },
      messageStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10,
      },
})