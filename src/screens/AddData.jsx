/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import React, { use } from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const AddData = () => {
  const getHost = () => {
    if (Platform.OS === 'android') {
      // Android emulator -> host machine
      return '10.0.2.2:8080';
    }
    return 'localhost:8080';
  };
  const IP = getHost();
  const navigation = useNavigation();
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

  const categories = [
    { label: 'Food', value: 'food' },
    { label: 'Stuff', value: 'stuff' },
    { label: 'Mesc', value: 'mesc' },
    { label: 'Travel', value: 'travel' },
  ];

  const [ItemName, setItemName] = useState('');
  const [ItemCost, setItemCost] = useState('');
  const [ItemMonth, setItemMonth] = useState('');
  const [ItemYear, setItemYear] = useState('');
  const [ItemCategory, setItemCategory] = useState('');

  const handleName = e => {
    setItemName(e);
  };
  const handleCost = e => {
    setItemCost(e);
  };

  const handleSubmit = async () => {
    const User = await AsyncStorage.getItem('UserID');
    if (ItemCategory.toLowerCase() === 'food') {
      const response = await fetch(
        `http://${IP}/addFood/${ItemMonth}/${ItemYear}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: ItemName,
            itemCost: ItemCost,
            user: User,
          }),
        },
      );

      if (response.ok) {
        console.log('✅ Food item added successfully!');
      } else {
        console.error('❌ Failed to add item.');
      }
    } else if (ItemCategory.toLowerCase() === 'mesc') {
      const response = await fetch(
        `http://${IP}/addMesc/${ItemMonth}/${ItemYear}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: ItemName,
            itemCost: ItemCost,
            user: User,
          }),
        },
      );

      if (response.ok) {
        console.log('✅ Food item added successfully!');
      } else {
        console.error('❌ Failed to add item.');
      }
    } else if (ItemCategory.toLowerCase() === 'stuff') {
      const response = await fetch(
        `http://${IP}/addStuff/${ItemMonth}/${ItemYear}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: ItemName,
            itemCost: ItemCost,
            user: User,
          }),
        },
      );

      if (response.ok) {
        console.log('✅ Food item added successfully!');
      } else {
        console.error('❌ Failed to add item.');
      }
    } else if (ItemCategory.toLowerCase() === 'travel') {
      const response = await fetch(
        `http://${IP}/addTravel/${ItemMonth}/${ItemYear}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: ItemName,
            itemCost: ItemCost,
            user: User,
          }),
        },
      );

      if (response.ok) {
        console.log('✅ Food item added successfully!');
      } else {
        console.error('❌ Failed to add item.');
      }
    }
    setItemCategory('');
    setItemCost('');
    setItemMonth('');
    setItemName('');
    setItemYear('');
  };

  const route = useRoute();
  useEffect(() => {
    if (route.params) {
      const { itemId, itemName, itemCost, itemCategory, itemMonth, itemYear } =
        route.params;

      setItemName(itemName);
      setItemCost(itemCost != null ? itemCost.toString() : '');
      setItemCategory(itemCategory);
      setItemMonth(itemMonth);
      setItemYear(itemYear);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Add Data</Text>

      <View style={styles.dataDisplayContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter item name"
          value={ItemName}
          onChangeText={handleName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter item cost"
          value={ItemCost}
          onChangeText={handleCost}
        />
        <View
          style={{
            padding: 16,
            width: '80%',
            borderWidth: 2,
            borderColor: '#ccc',
            borderRadius: 5,
          }}
        >
          <Dropdown
            style={styles.dropdown}
            data={categories}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            value={ItemCategory}
            onChange={item => setItemCategory(item.value)}
          />
        </View>
        <View
          style={{
            padding: 16,
            width: '80%',
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
            value={ItemMonth}
            onChange={item => setItemMonth(item.value)}
          />
        </View>
        <View
          style={{
            padding: 16,
            width: '80%',
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
            value={ItemYear}
            onChange={item => setItemYear(item.value)}
          />
        </View>

        <Button
          title="Add Entry"
          color="#c97a04ff"
          width="150"
          borderRadius={20}
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
      <Button
        title="Expenses"
        color="#ce5a0dff"
        width="150"
        onPress={() => {
          navigation.navigate('Explore');
        }}
      />
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e23e07ff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  dataDisplayContainer: {
    minHeight: '50%',
    width: '75%',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 30,
    overflow: 'scroll',
    alignItems: 'center',
    gap: 25,
  },
  textInput: {
    height: 42,
    width: '80%',
    borderWidth: 2,
    borderColor: '#ccc',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
