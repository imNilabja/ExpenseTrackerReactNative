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

const ItemTable = ({ userName, month, year }) => {
  const navigation = useNavigation();
  const getHost = () => {
    if (Platform.OS === 'android') {
      // Android emulator -> host machine
      return '10.0.2.2:8080';
    }
    return 'localhost:8080';
  };
  const IP = getHost();

  const [FoodData, setFoodData] = useState([]);
  const [StuffData, setStuffData] = useState([]);
  const [MescData, setMescData] = useState([]);
  const [TravelData, setTravelData] = useState([]);
  const [ItemName, setItemName] = useState([]);
  const [ItemCost, setItemCost] = useState([]);
  const [ItemCategory, setItemCategory] = useState([]);
  const [ItemMonth, setItemMonth] = useState([]);
  const [ItemYear, setItemYear] = useState([]);

  const user = userName;

  const fetchFoodData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://${IP}/getFoodByYear/${month}/${year}/${user}`,
      );
      const data = await response.json();

      setFoodData(data);

      // Alert.alert(
      //   'Data fetched',
      //   `Items: ${Array.isArray(data) ? data.length : 0}`,
      // );
    } catch (error) {
      console.error('Error fetching food data:', error);
      Alert.alert('Error', error.message);
    }
  }, [IP, month, year, user]);

  const fetchStuffData = useCallback(async () => {
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
      Alert.alert('Error', error.message);
    }
  }, [IP, month, year, user]);

  const fetchTravelData = useCallback(async () => {
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
  }, [IP, month, year, user]);

  const fetchMescData = useCallback(async () => {
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
      Alert.alert('Error', error.message);
    }
  }, [IP, month, year, user]);

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
