import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      icon: {
        padding: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
      },
      searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
      },
      productContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
      },
      deleteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoutButton: {
        position: 'absolute',
        bottom: 80,
        left: 20,
        backgroundColor: '#FF5733',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      noProducts: {
        textAlign: 'center',
        fontSize: 18,
        color: '#aaa',
      },
  });
  