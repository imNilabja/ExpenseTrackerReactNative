import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ItemTable from './ItemTable';
import { useNavigation } from '@react-navigation/native';

const Explore = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Expenses</Text>
      <View style={styles.dataDisplayContainer}>
        <ScrollView nestedScrollEnabled={true}>
          <ItemTable month="November" year="2025" />
        </ScrollView>
       
      </View>
      <Button title="Add Entry" color="#ce5a0dff" width="150" onPress={()=>{
        navigation.navigate("AddData");
      }}/>
    </ScrollView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e23e07ff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
 
  },
  dataDisplayContainer: {
    minHeight: '70%',
    height: '70%',
    width: '85%',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    overflow: 'scroll',
    
  },
});
