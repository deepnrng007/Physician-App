import { View, ViewStyle, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SearchBox from "../../baseComponents/searchBox";
import styles from "./styles";
import { ArrowDownIcon, RemoveLabelIcon } from "../../../utils/imagePaths";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import Underline from "../../baseComponents/underline";
import { scale } from "react-native-size-matters";
import { getDeviceDimenstion } from "../../../utils/utils";
import { langVar, translate } from "../../../enums";

type DropDownSearchProps = {
  list: {
    label: string;
    data: any;
  }[];
  onSelectItem: any;
  placeholder: string;
  selectedList: string[];
  onPressArrow?: any;
  arrowClicked?: boolean;
  onItemRemoved?: any;
};

const DropdownSearchContacts = ({
  list,
  onSelectItem,
  placeholder,
  selectedList,
  onPressArrow,
  arrowClicked,
  onItemRemoved,
}: DropDownSearchProps) => {
  const textInputRef = useRef<any>(null);
  const [searchText, setSearchText] = useState<any>(null);
  const [listItemsData, setListItemsData] = useState(list);
  const [searchBoxDimension, setSearchBoxDimension] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (selectedList.length) {
      setListItemsData(
        listItemsData.filter(
          (item: any) =>
            selectedList[0].toLowerCase() !== item.label.toLowerCase()
        )
      );
    }
  }, [selectedList]);

  const onTextChange = (text: string) => {
    onPressArrow(false);
    if (text && text.length > 0) {
      setSearchText(text);
      const result = list.filter(
        (item: any) =>
          item.label.toLowerCase().includes(text.toLowerCase()) &&
          !(selectedList.length > 0 && selectedList.indexOf(item.label) !== -1)
      );
      if (result.length > 0) setListItemsData(result);
      else
        setListItemsData([
          { label: translate.t(langVar.noResultFound), data: {} },
        ]);
    } else {
      setListItemsData([...list]);
      setSearchText(null);
    }
  };

  const searchBoxLayoutChange = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setSearchBoxDimension({ x, y, width, height });
  };

  const onSelectedItem = (item: any) => {
    if (textInputRef.current) textInputRef.current.clear();
    onTextChange("");
    onSelectItem(item);
  };

  const renderItems = ({ item, index }: any) => {
    const isNoResultFound = item.label === translate.t(langVar.noResultFound);
    return (
      <AppButton
        onPress={() => (!arrowClicked ? onSelectedItem(item) : {})}
        style={
          [
            styles.row,
            index === 0 && styles.borderradiusTop,
            index === listItemsData.length - 1 && styles.borderradiusBottom,
            arrowClicked && styles.selectedItemsStyle,
          ] as ViewStyle
        }
      >
        <AppText
          style={[
            styles.label,
            isNoResultFound && {
              opacity: 0.6,
              fontWeight: "normal",
            },
          ]}
          searchKeywords={[arrowClicked || isNoResultFound ? "" : searchText]}
        >
          {arrowClicked ? item : item.label}
        </AppText>
        {arrowClicked && (
          <AppButton onPress={() => onItemRemoved(item)}>
            <RemoveLabelIcon />
          </AppButton>
        )}
      </AppButton>
    );
  };
  const itemSeparatorComponent = () => <Underline />;
  const length = selectedList.length;
  return (
    //flex:1, android
    <View style={{ flex: 1, zIndex: 99 }}>
      <View style={styles.searchBoxContainer} onLayout={searchBoxLayoutChange}>
        <SearchBox
          getReference={(ref: any) => (textInputRef.current = ref)}
          style={
            [styles.searchBox, { width: length ? "62%" : "100%" }] as ViewStyle
          }
          onTextChange={onTextChange}
          placeholder={placeholder}
          onFocusHideSearchIcon
        />
        {length > 0 && (
          <AppButton
            onPress={onPressArrow}
            style={styles.arrowButton as ViewStyle}
          >
            {arrowClicked ? (
              <>
                <AppText style={styles.selectedLabel}>{`Hide`}</AppText>
                <ArrowDownIcon style={{ transform: [{ rotate: "180deg" }] }} />
              </>
            ) : (
              <>
                <AppText style={styles.selectedLabel}>{`${length} ${translate.t(
                  langVar.selected
                )}`}</AppText>
                <ArrowDownIcon />
              </>
            )}
          </AppButton>
        )}
      </View>
      <View
        style={{
          maxHeight: scale(300),
          position: "absolute",
          marginTop: searchBoxDimension.x + searchBoxDimension.height - 18,
          marginLeft: searchBoxDimension.x,
          borderRadius: scale(8),
        }}
      >
        {(searchText || arrowClicked) && (
          <FlatList
            keyboardShouldPersistTaps={"always"}
            extraData={arrowClicked}
            data={arrowClicked ? [...selectedList] : [...listItemsData]}
            contentContainerStyle={{
              width: searchBoxDimension.width,
              borderRadius: scale(8),
              maxHeight: getDeviceDimenstion("height"),
            }}
            bounces={false}
            renderItem={renderItems}
            ItemSeparatorComponent={itemSeparatorComponent}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default DropdownSearchContacts;

DropdownSearchContacts.defaultProps = {
  placeholder: translate.t(langVar.search),
  onSelectItem: () => {},
};
