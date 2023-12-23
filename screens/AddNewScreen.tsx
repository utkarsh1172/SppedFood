import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import {
  launchImageLibrary,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { Alert } from 'react-native';


const AddNewScreen: React.FC = () => {
  const [image, setImage] = useState<string>(
    'https://content.hostgator.com/img/weebly_image_sample.png',
  );
  const [file, setFile] = useState<ImagePickerResponse>();
  const [categoryName, setCategoryName] = useState<string>('');
  const [subCategories, setSubCategories] = useState<string[]>(['']);
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  
  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image library');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        const source = response.assets[0].uri;
        setImage(source);
        setFile(response);
        console.log('Image URI:', source, response);
      }
    });
  };
  const addSubCategory = () => {
    setSubCategories([...subCategories, '']);
  };
  const removeSubCategory = (index: number) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories.splice(index, 1);
    setSubCategories(updatedSubCategories);
  };

  const updateSubCategory = (index: number, value: string) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = value;
    setSubCategories(updatedSubCategories);
  };
  const addCategory = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const formData = new FormData();
    formData.append('file', {
      uri: file.assets[0].uri,
      type: file.assets[0].type,
      name: file.assets[0].fileName,
    });
    console.log('formdata',file.assets[0].uri,)
    const categoryData = {
      category_name: categoryName,
      image: formData.append('file', {
        uri: file.assets[0].uri,
        type: file.assets[0].type,
        name: file.assets[0].fileName,
      }),
      sub_cateries: subCategories.map(name => ({name})),
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(categoryData),
      redirect: 'follow',
    };

    fetch('https://dmapi.ipaypro.co/app_task/categories/add', requestOptions)
      .then(response => response.text())
      .then(result => {
        try {
          const parsedResult = JSON.parse(result);
    
          if (parsedResult.success) {
            setSuccessModalVisible(true);
            console.log('Category added successfully');
          } else {
            Alert.alert('Error', 'Failed to add category', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
    
          console.log('parsedResult', parsedResult.success);
        } catch (error) {
          console.log('JSON parsing error', error);
        }
      })
      .catch(error => {

        Alert.alert('Error', error, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        console.log('error', error)});
  };

  const closeModal = () => {
    setSuccessModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.Head}>
          <Text style={styles.Headtext}>Add Categories & SubCategories</Text>
        </View>
        <View style={styles.Maincontainer}>
          <Text style={styles.textStyle}>Category name</Text>
          <TextInput
            value={categoryName}
            onChangeText={text => setCategoryName(text)}
            style={{borderWidth: 1, borderColor: '#CCCCCC',marginTop:10}}
          />
          <View>
            <Text style={styles.textStyle}>Category Image</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.imageContainer}>
                {image && (
                  <Image source={{uri: image}} style={styles.imagePreview} />
                )}
              </View>
              <TouchableOpacity
                style={styles.chooseButton}
                onPress={() => {
                  openImageLibrary();
                }}>
                <Text style={{fontSize: 18, color: 'white'}}>Choose file</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.textStyle}>Create sub-categories</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 500,
                  borderWidth: 1,
                  borderColor: 'gray',
                  width: 300,
                  height: 50,
                  paddingTop: 10,
                  paddingLeft:5,
                  borderRadius:4
                }}>
                Add Sub-Categories
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 20,
                  position: 'absolute',
                  left: 350,
                }}
                onPress={addSubCategory}>
                <Icon name="plussquare" size={50} color="#1E90FF" />
                <Text
                  style={{fontSize: 18, color: 'black', marginLeft: 10}}></Text>
              </TouchableOpacity>
            </View>
            {subCategories.map((subCategory, index) => (
              <View
                key={index}
                style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                <TextInput
                  style={{width: 300, borderWidth: 1, borderColor: '#CCCCCC'}}
                  value={subCategory}
                  onChangeText={text => updateSubCategory(index, text)}
                />
                <TouchableOpacity
                  style={{position: 'absolute', left: 350}}
                  onPress={() => removeSubCategory(index)}>
                  <Icon name="minussquare" size={50} color="gray" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addCategory()}>
          <Text style={{fontSize: 18, color: 'white'}}>Add</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Category added successfully!</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={closeModal}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <BottomNavBar />
    </>
  );
};

export default AddNewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginTop:15,
    // marginBottom: 10,
  },
  Head: {
    margin: 15,
    alignItems: 'center',
  },
  Headtext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  Maincontainer: {
    margin: 20,
  },
  imageContainer: {
    borderWidth: 2.5,
    borderColor: '#CCCCCC',
    borderStyle: 'dashed',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  chooseButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 150,
    height: 50,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#1E90FF',
    margin: 20,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  okButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  okButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
