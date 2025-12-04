import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ItemTable from './ItemTable';
import { useNavigation } from '@react-navigation/native';
import Header from '../screens/Header.jsx';


const Explore = () => {
  const navigation = useNavigation();
  return (
   <>
     <Header />
    <ScrollView contentContainerStyle={styles.container}>
     
      <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Expenses</Text>
      <View style={styles.dataDisplayContainer}>
        <ScrollView nestedScrollEnabled={true}>
          <ItemTable/>
        </ScrollView>
       
      </View>
      <Button title="Add Entry" color="#07641fff" width="150" onPress={()=>{
        navigation.navigate("AddData");
      }}/>
    </ScrollView></>
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
    minHeight: '60%',
    height: '65%',
    width: '85%',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    overflow: 'scroll',
    
  },
});
