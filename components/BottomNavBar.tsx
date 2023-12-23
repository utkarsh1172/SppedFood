import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainView')}
          style={{alignItems: 'center'}}>
          <Icon
            name={
              route.name === 'MainView' ? 'information' : 'information-outline'
            }
            size={25}
            color={route.name === 'MainView' ? '#1E90FF' : 'grey'}
          />
          <Text style={styles.text}>View</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNew')}
          style={{alignItems: 'center'}}>
          <Icon1
            name={
              route.name === 'AddNew'
                ? 'checkmark-done-circle'
                : 'checkmark-done-circle-outline'
            }
            size={25}
            color={route.name === 'AddNew' ? '#1E90FF' : 'grey'}
          />
          <Text style={[styles.text ,{ color: route.name === 'AddNew' ? '#1E90FF' : 'grey' }]}>Add New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: '#1E90FF',
    borderTopStartRadius: 8,
  },
  tab: {
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    color: '#333', // Change this to your desired text color
  },
});

export default BottomNavBar;
