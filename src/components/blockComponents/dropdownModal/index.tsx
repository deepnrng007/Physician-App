import { Modal, ViewStyle, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Props } from "./types";
import { styles } from "./styles";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import SearchBox from "../../baseComponents/searchBox";
import { CheckCircle, CloseIcon } from "../../../utils/imagePaths";
import { langVar } from "../../../enums/languages/langVar";
import translate from "../../../enums/languages/translate";
import NotFoundOrError from "../../baseComponents/notFoundOrError";
import { themes } from "../../../enums";
import logger from "../../../utils/logger";

const DropDownModal = ({
  isShow,
  showDropDown,
  locationData,
  onItemSelection,
  title,
  locationKey,
  selectedValue,
  error,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const textInputRef = useRef<any>(null);

  useEffect(() => {
    selectedValue && setSelectedItem(selectedValue.selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (locationData) setLocationList(locationData);
  }, [locationData]);

  const searchItems = (text: string) => {
    if (text.length > 0) {
      const data = locationData.filter((item: any) =>
        item.ProviderName.toLowerCase().includes(text.toLowerCase())
      );
      setSearchText(text);
      setLocationList(data);
      setSearchEnabled(true);
    } else {
      setSearchText("");
      setLocationList(locationData);
      setSearchEnabled(false);
    }
  };

  const onSelectItem = (item: any) => {
    setSelectedItem(item);
    if (selectedItem && selectedItem.ID === item.ID) {
      setSelectedItem(null);
    } else {
      setSearchText("");
      setSearchEnabled(false);
      setLocationList(locationData);
      onItemSelection({ key: locationKey, item: item });
    }
  };

  const onClose = () => {
    showDropDown();
    setSearchText("");
    setLocationList(locationData);
    if (!selectedItem) onItemSelection({ key: locationKey, item: null });
  };

  const renderItem = (item: any) => {
    return (
      <AppButton
        style={{
          ...styles.item,
          backgroundColor:
            selectedItem && selectedItem.ID === item.item.ID
              ? themes.LightGreen
              : themes.White,
        }}
        onPress={() => onSelectItem(item.item)}
      >
        <AppText style={styles.textItem} searchKeywords={[searchText]}>
          {item.item.ProviderName}
        </AppText>
        {selectedItem && selectedItem.ID === item.item.ID && (
          <CheckCircle style={{ marginRight: 20 }} />
        )}
      </AppButton>
    );
  };

  return (
    <Modal
      visible={isShow}
      animationType="slide"
      style={styles.container as ViewStyle}
    >
      <AppButton style={styles.titleView}>
        <AppButton onPress={onClose}>
          <CloseIcon height={31} width={31} />
        </AppButton>
        <AppText style={styles.title}>{title}</AppText>
        <AppButton style={{ width: 31 }} />
      </AppButton>
      <AppButton style={styles.flatListView}>
        <SearchBox
          initialValue={searchText}
          searchEnabled={searchEnabled}
          placeholder={translate.t(langVar.searchFacility)}
          onTextChange={searchItems}
          getReference={(ref: any) => (textInputRef.current = ref)}
        />

        {error && <NotFoundOrError type={"error"} enableIcon={true} />}

        {locationList.length > 0 && (
          <FlatList
            style={styles.flatList}
            keyExtractor={(item: any, index: number) => index.toString()}
            data={locationList}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => (
              <AppButton style={styles.itemSeparator} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
        <NotFoundOrError type={"oops"} enableIcon={locationList.length === 0} />
      </AppButton>
    </Modal>
  );
};

export default DropDownModal;
