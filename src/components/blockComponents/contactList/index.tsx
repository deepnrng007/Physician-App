import { SectionList } from "react-native";
import React, { RefObject, useEffect, useRef } from "react";
import { getAvatarInitials } from "../../../utils/utils";
import Avatar from "../contactListItem/Avatar";
import ContactListItem from "../contactListItem";
import { contactType } from "../../../screens/contact/types";
import ContactListHeader from "./contactListHeaderText";

type props = {
  scrollIndex: number;
  onPressContact: (item: contactType) => void;
  setRef: (flatList: RefObject<SectionList>) => void;
  data: any;
};

const ContactList = (props: props) => {
  const flatList = useRef<SectionList>(null);
  const { scrollIndex, data } = props;

  useEffect(() => {
    props.setRef(flatList);
  });

  return (
    <>
      <SectionList
        ref={flatList}
        sections={data}
        keyExtractor={(item, index) => item.givenName + index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <ContactListHeader headerText={title} />
        )}
        renderItem={({ item }) => {
          const {
            recordID,
            firstName,
            lastName,
            thumbnailPath,
            phoneNumber,
            description,
          } = item;
          return (
            <ContactListItem
              leftElement={
                <Avatar
                  img={thumbnailPath ? { uri: thumbnailPath } : undefined}
                  placeholder={getAvatarInitials(`${firstName} ${lastName}`)}
                />
              }
              key={recordID}
              title={`${firstName} ${lastName}`}
              contactType={description}
              //contactType={`${description}`}
              onPressContact={() => props.onPressContact(item)}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={scrollIndex}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatList.current?.scrollToLocation({
              sectionIndex: 1,
              itemIndex: info.index,
              animated: true,
            });
          });
        }}
        initialNumToRender={25}
        stickySectionHeadersEnabled={false}
      />
    </>
  );
};

export default ContactList;
