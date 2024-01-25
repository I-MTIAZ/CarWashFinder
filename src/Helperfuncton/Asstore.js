import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserData = async (email, number,name) => {
  try {
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('number', number);
    await AsyncStorage.setItem('name', name);
    console.log('User data saved successfully!');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserData = async () => {
  try {
    const email = await AsyncStorage.getItem('email');
    const number = await AsyncStorage.getItem('number');
    const name = await AsyncStorage.getItem('name');

    if (email !== null && number !== null && name !== null) {
      return { email, number ,name };
    } else {
      console.log('User data not found.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};