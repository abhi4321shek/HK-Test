import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './HomeStyle';

export default function Home() {
  const navigation = useNavigation();
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = () => {
    setSearchActive(!isSearchActive);
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const existingProducts = await AsyncStorage.getItem('products');
        if (existingProducts) {
          setProducts(JSON.parse(existingProducts));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);

  const deleteProduct = async (productToDelete) => {
    try {
      const updatedProducts = products.filter(product => product.id !== productToDelete.id);
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  const handleLogout = async () => {
    try {
      // Optionally clear any saved data from AsyncStorage
      await AsyncStorage.clear();
      
      // Navigate to login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Text>{item.image}</Text>

      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => deleteProduct(item)}
      >
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity onPress={handleSearch} style={styles.icon}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {isSearchActive && (
        <TextInput
          style={styles.searchBar}
          placeholder="Search Products"
          value={searchQuery}
          onChangeText={handleSearchQuery}
          autoFocus
        />
      )}

      {/* Products List */}
      <FlatList
        data={products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.noProducts}>No Product Found</Text>}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}