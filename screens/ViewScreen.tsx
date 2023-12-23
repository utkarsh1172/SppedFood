import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../components/BottomNavBar';

interface Subcategory {
  name: string;
}

interface Category {
  name: string;
  subcategories: Subcategory[];
  img: string;
}

interface ViewScreenProps {
  categories: Category[];
}

const ViewScreen: React.FC<ViewScreenProps> = ({ categories }) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const toggleCategory = (index: number) => {
    const newExpandedCategories = [...expandedCategories];
    const currentIndex = newExpandedCategories.indexOf(index);

    if (currentIndex === -1) {
      newExpandedCategories.push(index);
    } else {
      newExpandedCategories.splice(currentIndex, 1);
    }

    setExpandedCategories(newExpandedCategories);
  };

  const handleSubcategorySelection = (subcategoryName: string) => {
    setSelectedSubcategory(subcategoryName);
  };

  const imagePath = require('../assets/cabbage.png');

  return (
    <>
      <View style={styles.container}>
        <View style={styles.Head}>
          <Text style={styles.Headtext}>Categories & SubCategories</Text>
        </View>

        {/* Render your categories and subcategories here */}
        <ScrollView>
        <View style={styles.mainContainer}>
          {categories.map((category, index) => (
            <View key={index} style={styles.indexContainer}>
              <View style={styles.categoryContainer}>
                <Icon name="ellipsis-vertical" size={25} color="grey" />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={category.img} style={styles.categoryImage}/>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: 'black', marginLeft: 10 }}>
                    {category.name}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => toggleCategory(index)} style={{ marginLeft: 'auto' }}>
                  <Icon
                    name={expandedCategories.includes(index) ? 'chevron-up' : 'chevron-down'}
                    size={25}
                    color="grey"
                    style={{ marginLeft: 'auto', marginTop: 5 }}
                  />
                </TouchableOpacity>
              </View>
              {/* ScrollView for subcategories */}
              {expandedCategories.includes(index) && (
                <View>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <TouchableOpacity
                      key={subIndex}
                      style={styles.subcategoryContainer}
                      onPress={() => handleSubcategorySelection(subcategory.name)}>
                      <Text style={{ fontSize: 18, marginLeft: 30, color: 'black', fontWeight: 500 }}>
                        {subcategory.name}
                      </Text>
                      <RadioButton
                        value={subcategory.name}
                        status={selectedSubcategory === subcategory.name ? 'checked' : 'unchecked'}
                        onPress={() => handleSubcategorySelection(subcategory.name)}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        </ScrollView>
      </View>
      
      <BottomNavBar />
    </>
  );
};

const mapStateToProps = (state: { categories: Category[] }) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(ViewScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Head: {
    margin: 20,
    alignItems: 'center',
  },
  mainContainer: {
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    overflow: 'hidden',
  },
  indexContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    overflow: 'hidden',
  },
  categoryContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: 10,
  },
  Headtext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  categoryImage: {
    width: 75, 
    height: 75,
    resizeMode: 'cover',
    marginHorizontal: 10, 
  },
  subcategoryContainer: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
