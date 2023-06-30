import EncryptedStorage from "react-native-encrypted-storage";
import logger from "./logger";

export const setEncryptedStorage = async (key: string, data: any) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    logger.log("error while storing :", error);
    return false;
  }
};

export const setEncryptedStorageString = async (key: string, data: any) => {
  try {
    await EncryptedStorage.setItem(key, data);
    return true;
  } catch (error) {
    logger.log("error while storing :", error);
    return false;
  }
};

export const getEncryptedStorage = async (key: string) => {
  try {
    const data = await EncryptedStorage.getItem(key);
    if (data !== undefined) {
      return data;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const removeEncryptedStorage = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
    return true;
  } catch (error) {
    logger.log("error :", error);
    return false;
  }
};

export const clearEncryptedStorage = async () => {
  try {
    await EncryptedStorage.clear();
    return true;
  } catch (error) {
    logger.log("error :", error);
    return false;
  }
};
