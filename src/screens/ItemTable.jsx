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
import React, { useContext } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import AuthContext from '../context/AuthContext';

const ItemTable = () => {
  const navigation = useNavigation();
  // const getHost = () => {
  //   if (Platform.OS === 'android') {
  //     // Android emulator -> host machine
  //     return '10.0.2.2:8080';
  //   }
  //   return 'localhost:8080';
  // };
  // const IP = getHost();
  const IP = '43.204.103.88:8080';
  const [FoodData, setFoodData] = useState([]);
  const [StuffData, setStuffData] = useState([]);
  const [MescData, setMescData] = useState([]);
  const [TravelData, setTravelData] = useState([]);

  const { UserId } = useContext(AuthContext);

  const date = new Date();

  const filterMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const [Month, setMonth] = useState(filterMonths[currentMonth]);
  const [Year, setYear] = useState(String(currentYear));

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
    // const user = await AsyncStorage.getItem('UserID');
    try {
      const response = await fetch(
        `http://${IP}/getFoodByYear/${Month}/${Year}/${UserId}`,
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
  }, [IP, Month, Year]);

  const fetchStuffData = useCallback(async () => {
    // const user = await AsyncStorage.getItem('UserID');

    try {
      const response = await fetch(
        `http://${IP}/getStuffByYear/${Month}/${Year}/${UserId}`,
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
  }, [IP, Month, Year]);

  const fetchTravelData = useCallback(async () => {
    // const user = await AsyncStorage.getItem('UserID');

    try {
      const response = await fetch(
        `http://${IP}/getTravelByYear/${Month}/${Year}/${UserId}`,
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
  }, [IP, Month, Year]);

  const fetchMescData = useCallback(async () => {
    // const user = await AsyncStorage.getItem('UserID');

    try {
      const response = await fetch(
        `http://${IP}/getMescByYear/${Month}/${Year}/${UserId}`,
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
  }, [IP, Month, Year]);

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

  const [foodSum, setfoodSum] = useState(0);
  const [stuffSum, setstuffSum] = useState(0);
  const [mescSum, setmescSum] = useState(0);
  const [travelSum, settravelSum] = useState(0);

  const handleFoodSum = async () => {
    const response = await fetch(
      `http://${IP}/ItemSum/food/${Month}/${Year}/${UserId}`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();
    setfoodSum(data|| 0);
  };

  const handleStuffSum = async category => {
    const response = await fetch(
      `http://${IP}/ItemSum/stuff/${Month}/${Year}/${UserId}`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();
    setstuffSum(data|| 0);
  };
  const handleTravelSum = async () => {
    const response = await fetch(
      `http://${IP}/ItemSum/travel/${Month}/${Year}/${UserId}`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();
    settravelSum(data|| 0);
  };
  const handleMescSum = async category => {
    const response = await fetch(
      `http://${IP}/ItemSum/mesc/${Month}/${Year}/${UserId}`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();
    setmescSum(data|| 0);
  };

  useEffect(() => {
    fetchFoodData();
    fetchMescData();
    fetchStuffData();
    fetchTravelData();
    handleFoodSum();
    handleStuffSum();
    handleMescSum();
    handleTravelSum();
  }, [fetchFoodData, Month, Year,filterMonths[currentMonth]],currentYear);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View
          style={{
            padding: 16,
            width: '45%',
            height: 40,
            borderWidth: 2,
            borderColor: '#ccc',
            borderRadius: 5,
          }}
        >
          <Dropdown
            style={styles.dropdown}
            data={years}
            labelField="label"
            valueField="value"
            placeholder="Select Year"
            value={Year}
            onChange={item => setYear(item.value)}
          />
        </View>
        <View
          style={{
            padding: 16,
            width: '45%',
            height: 40,
            borderWidth: 2,
            borderColor: '#ccc',
            borderRadius: 5,
          }}
        >
          <Dropdown
            style={styles.dropdown}
            data={months}
            labelField="label"
            valueField="value"
            placeholder="Select Month"
            value={Month}
            onChange={item => setMonth(item.value)}
          />
        </View>
      </View>
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
        <View style={styles.tableBody}>
          <Text style={styles.textBox}>Total sum</Text>
          <Text style={styles.textBox}>-----</Text>
          <Text style={styles.textBox}>₹{foodSum}</Text>
        </View>
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
        <View style={styles.tableBody}>
          <Text style={styles.textBox}>Total sum</Text>
          <Text style={styles.textBox}>-----</Text>
          <Text style={styles.textBox}>₹{stuffSum}</Text>
        </View>
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
                      'mesc',
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
        <View style={styles.tableBody}>
          <Text style={styles.textBox}>Total sum</Text>
          <Text style={styles.textBox}>-----</Text>
          <Text style={styles.textBox}>₹{mescSum}</Text>
        </View>
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
                      'travel',
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
        <View style={styles.tableBody}>
          <Text style={styles.textBox}>Total sum</Text>
          <Text style={styles.textBox}>-----</Text>
          <Text style={styles.textBox}>₹{travelSum}</Text>
        </View>
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
