import * as SecureStore from 'expo-secure-store';

interface Payload {
  key: string;
  value: any;
}
const setItem = async (payload: Payload) => {
  await SecureStore.setItemAsync(payload.key, JSON.stringify(payload.value));
}

const getItem = async (key: string) => {
  const item = await SecureStore.getItemAsync(key);
  if (item) {
    return JSON.parse(item); 
  } else {
    return null;
  }
}

const deleteItem = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
}

export {
  setItem,
  getItem,
  deleteItem
}