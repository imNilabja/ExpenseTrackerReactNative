/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemTable = ({ month, year }) => {
  const navigation = useNavigation();
  const getHost = () => {
    if (Platform.OS === 'android') {
      // Android emulator -> host machine
      return '10.0.2.2:8080';
    }
    return 'localhost:8080';
  };
  const IP = getHost();
// const IP = "13.232.40.105:8080";
  const [FoodData, setFoodData] = useState([]);
  const [StuffData, setStuffData] = useState([]);
  const [MescData, setMescData] = useState([]);
  const [TravelData, setTravelData] = useState([]);
  const [Month, setMonth] = useState([]);
  const [Year, setYear] = useState([]);

    const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];

  const years = [
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
    { label: '2029', value: '2029' },
    { label: '2030', value: '2030' },
  ];

  const fetchFoodData = useCallback(async () => {
    const user = await AsyncStorage.getItem('UserID');
    try {
      const response = await fetch(
        `http://${IP}/getFoodByYear/${Month}/${Year}/${user}`,
      );
      const data = await response.json();

      setFoodData(data);

      // Alert.alert(
      //   'Data fetched',
      //   `Items: ${Array.isArray(data) ? data.length : 0}`,
      // );
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  }, [IP, month, year]);

  const fetchStuffData = useCallback(async () => {
    const user = await AsyncStorage.getItem('UserID');

    try {
      const response = await fetch(
        `http://${IP}/getStuffByYear/${month}/${year}/${user}`,
      );
      const data = await response.json();

      setStuffData(data);

      // Alert.alert(
      //   'Data fetched',
      //   `Items: ${Array.isArray(data) ? data.length : 0}`,
      // );
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  }, [IP, month, year]);

  const fetchTravelData = useCallback(async () => {
    const user = await AsyncStorage.getItem('UserID');

    try {
      const response = await fetch(
        `http://${IP}/getTravelByYear/${month}/${year}/${user}`,
      );
      const data = await response.json();

      setTravelData(data);

      // Alert.alert(
      //   'Data fetched',
      //   `Items: ${Array.isArray(data) ? data.length : 0}`,
      // );
    } catch (error) {
      console.error('Error fetching food data:', error);
      Alert.alert('Error', error.message);
    }
  }, [IP, month, year]);

  const fetchMescData = useCallback(async () => {
    const user = await AsyncStorage.getItem('UserID');

    try {
      const response = await fetch(
        `http://${IP}/getMescByYear/${month}/${year}/${user}`,
      );
      const data = await response.json();

      setMescData(data);

      // Alert.alert(
      //   'Data fetched',
      //   `Items: ${Array.isArray(data) ? data.length : 0}`,
      // );
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  }, [IP, month, year]);

  useEffect(() => {
    fetchFoodData();
    fetchMescData();
    fetchStuffData();
    fetchTravelData();
  }, [fetchFoodData, month, year]);

  const handleDelete = async (id, category) => {
    const response = await fetch(`http://${IP}/deleteItem/${category}/${id}`, {
      // const response = await fetch(`http://localhost:8080/deleteItem/${item}/${id}`, {
      method: 'DELETE',
    });
    fetchFoodData();
    fetchMescData();
    fetchStuffData();
    fetchTravelData();
  };

  const handleEdit = async (id, itemName, itemCost, category, month, year) => {
    navigation.navigate('AddData', {
      itemName: itemName,
      itemCost: itemCost,
      itemCategory: category,
      itemMonth: month,
      itemYear: year,
      itemId: id,
    });

    handleDelete(id, category);
  };

  return (
    <View style={styles.container}>
      {/* for food */}
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
        Food
      </Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.textBox}>ID</Text>
          <Text style={styles.textBox}>Name</Text>
          <Text style={styles.textBox}>Cost</Text>
          <Text style={styles.textBox}>Actions</Text>
        </View>
        <FlatList
          data={FoodData}
          renderItem={({ item, index }) => (
            <View style={styles.tableBody}>
              <Text style={styles.textBox}>{item.food_id || index}</Text>
              <Text style={styles.textBox}>{item.itemName || 'N/A'}</Text>
              <Text style={styles.textBox}>₹{item.itemCost || 'N/A'}</Text>
              <View style={{ flexDirection: 'row', paddingRight: 10, gap: 6 }}>
                <TouchableOpacity
                  onPress={() => handleDelete(item.food_id, 'food')}
                >
                  <Image
                    source={require('../../assets/delete.png')}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleEdit(
                      item.food_id,
                      item.itemName,
                      item.itemCost,
                      'food',
                      item.month?.month,
                      item.month?.yearId,
                    )
                  }
                >
                  <Image
                    source={require('../../assets/edit.png')}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : String(index)
          }
        />
      </View>
      {/* for stuff */}
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
        Stuff
      </Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.textBox}>ID</Text>
          <Text style={styles.textBox}>Name</Text>
          <Text style={styles.textBox}>Cost</Text>
          <Text style={styles.textBox}>Actions</Text>
        </View>
        <FlatList
          data={StuffData}
          renderItem={({ item, index }) => (
            <View style={styles.tableBody}>
              <Text style={styles.textBox}>{item.stuff_id || index}</Text>
              <Text style={styles.textBox}>{item.itemName || 'N/A'}</Text>
              <Text style={styles.textBox}>₹{item.itemCost || 'N/A'}</Text>
              <View style={{ flexDirection: 'row', paddingRight: 10, gap: 6 }}>
                <TouchableOpacity
                  onPress={() => handleDelete(item.stuff_id, 'stuff')}
                >
                  <Image
                    source={require('../../assets/delete.png')}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleEdit(
                      item.stuff_id,
                      item.itemName,
                      item.itemCost,
                      'stuff',
                      item.month?.month,
                      item.month?.yearId,
                    )
                  }
                >
                  <Image
                    source={require('../../assets/edit.png')}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : String(index)
          }
        />
      </View>

      {/* for Mesc */}
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
        Mesc
      </Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.textBox}>ID</Text>
          <Text style={styles.textBox}>Name</Text>
          <Text style={styles.textBox}>Cost</Text>
          <Text style={styles.textBox}>Actions</Text>
        </View>
        <FlatList
          data={MescData}
          renderItem={({ item, index }) => (
            <View style={styles.tableBody}>
              <Text style={styles.textBox}>{item.mesc_id || index}</Text>
              <Text style={styles.textBox}>{item.itemName || 'N/A'}</Text>
              <Text style={styles.textBox}>₹{item.itemCost || 'N/A'}</Text>
              <View style={{ flexDirection: 'row', paddingRight: 10, gap: 6 }}>
                <TouchableOpacity
                  onPress={() => handleDelete(item.mesc_id, 'mesc')}
                >
                  <Image
                    source={require('../../assets/delete.png')}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleEdit(
                      item.mesc_id,
                      item.itemName,
                      item.itemCost,
                      'food',
                      item.month?.month,
                      item.month?.yearId,
                    )
                  }
                >
                  <Image
                    source={require('../../assets/edit.png')}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : String(index)
          }
        />
      </View>

      {/* for Travel */}
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
        Travel
      </Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.textBox}>ID</Text>
          <Text style={styles.textBox}>Name</Text>
          <Text style={styles.textBox}>Cost</Text>
          <Text style={styles.textBox}>Actions</Text>
        </View>
        <FlatList
          data={TravelData}
          renderItem={({ item, index }) => (
            <View style={styles.tableBody}>
              <Text style={styles.textBox}>{item.travel_id || index}</Text>
              <Text style={styles.textBox}>{item.itemName || 'N/A'}</Text>
              <Text style={styles.textBox}>₹{item.itemCost || 'N/A'}</Text>
              <View style={{ flexDirection: 'row', paddingRight: 10, gap: 6 }}>
                <TouchableOpacity
                  onPress={() => handleDelete(item.travel_id, 'travel')}
                >
                  <Image
                    source={require('../../assets/delete.png')}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleEdit(
                      item.travel_id,
                      item.itemName,
                      item.itemCost,
                      'food',
                      item.month?.month,
                      item.month?.yearId,
                    )
                  }
                >
                  <Image
                    source={require('../../assets/edit.png')}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : String(index)
          }
        />
      </View>
    </View>
  );
};

export default ItemTable;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    minHeight: 400,
    gap: 20,
  },
  tableContainer: {
    width: '96%',
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
    minHeight: 200,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#f0f0f0',
    minHeight: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  tableBody: {
    flexDirection: 'row',
    alignItems: 'center',

    minHeight: 30,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  textBox: {
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
    fontSize: 15,
    fontStyle: 'bold',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    cursor: 'pointer',
  },
});
