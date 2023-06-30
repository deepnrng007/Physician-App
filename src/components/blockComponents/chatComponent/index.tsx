/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ViewStyle } from "react-native";
import {
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { View, Keyboard } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import {
  getDateFormatForDay,
  getFileDetails,
  getFileNameFromPath,
  getMessageFormat,
  getReversedFileType,
  getUTCTimeNow,
  isAndroid,
  isBothTypeSame,
  isEqualIgnoreCase,
  isSameDayMessage,
  isSameUserNameMessage,
  notifyMsg,
  openDocxPDFFiles,
  openGallary,
} from "../../../utils/utils";
import { ClipIcon, SendIcon } from "../../../utils/imagePaths";
import { langVar, themes, translate } from "../../../enums";
import AppButton from "../../baseComponents/appButton";
import { scale } from "react-native-size-matters";
import AttachmentBox from "../attachmentBox";
import CameraComponent from "../../baseComponents/cameraComponent";
import {
  attachmentType,
  encriptedStorageKeys,
  mediaTypes,
} from "../../../enums/constants";
import ImageWithLoader from "../../baseComponents/imageWithLoader";
import PreviewMedia from "../previewMedia";
import DisplayDay from "./displayDay";
import DisplayPdf from "./displayPdf";
import EventHOC from "../../baseComponents/eventHOC";
import { hasContainOnlySpaces } from "../../../utils/validations";
import DisplayTextMessage from "./displayTextMessage";
import logger from "../../../utils/logger";
import {
  getEncryptedStorage,
  removeEncryptedStorage,
  setEncryptedStorage,
} from "../../../utils/encryptedStorage";
import AppText from "../../baseComponents/appText";
import useAppSelector from "../../customHooks/useAppSelector";
import { Conversation, Message } from "@twilio/conversations";
import { global } from "../../../global";
import { setTwilioClient } from "../../../screens/helper";
import { Loader } from "../..";

type ChatComponentProps = {
  messages: any[];
  currentUser: any;
  onMessage?: any;
  isKeyboardVisible: boolean;
  onEndScrolledReached: any;
  isConversationExist: boolean;
  scrollToIndex?: number;
  isAppInForground: boolean;
  isNameShownforSingleConversation: boolean;
  disableSendOption?: boolean;
  onOpenAttachment?: any; //function
  isLoadingRequired?: boolean;
  addMessage?: {
    fileSize?: number;
    content: string;
    type: string;
    fileName?: string;
  };
};

const ChatComponent = ({
  messages,
  currentUser,
  onMessage,
  addMessage,
  isKeyboardVisible,
  onEndScrolledReached,
  isConversationExist,
  scrollToIndex,
  isAppInForground,
  isNameShownforSingleConversation,
  disableSendOption,
  onOpenAttachment,
  isLoadingRequired,
}: ChatComponentProps) => {
  const [messageList, setMessageList] = useState([{}]);
  const [scrollTo, setScrollTo] = useState(scrollToIndex);
  const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedDocumentData, setSelectedDocumentData] = React.useState<any>();
  const [unreadCount, setunreadCount] = useState(Number.MAX_SAFE_INTEGER);
  const [readCount, setreadCount] = useState(0);
  const [loading, setLoading] = useState(isLoadingRequired);
  const [isFirstTimemsgSend, setisFirstTimemsgSend] = useState(true);
  const CONVERSATIONREF = useRef<Conversation>();
  const isAppOpened = useRef(isAppInForground);
  let lastMessageIndex: number | null = null;
  const unsubscribePartcipantUpdate = useRef<Conversation>();
  const chatListRef = useRef<any>();
  const [viewURL, setViewURL] = useState<any>({
    type: "",
    uri: "",
    isUploading: false,
  });
  const { idsData } = useAppSelector((state) => {
    return {
      idsData: state.chatIds,
    };
  });
  const {
    idsDetails: { conversationTwilioID, conversationID },
  } = idsData;

  useEffect(() => {
    if (addMessage && !isConversationExist) {
      const { content, fileName = "", fileSize = 0, type } = addMessage;
      let msg = {};
      msg = getMessageFormat({
        content,
        type: getReversedFileType(type),
        fileSize,
        fileName,
        uploadingFlag: true,
        currentUser,
      });
      setMessageList([msg]);
    }
    return () => {
      if (unsubscribePartcipantUpdate && unsubscribePartcipantUpdate.current) {
        unsubscribePartcipantUpdate.current.removeAllListeners();
      }
    };
  }, []);

  useEffect(() => {
    if (isAppInForground) {
      isAppOpened.current = true;
      if (CONVERSATIONREF && CONVERSATIONREF.current)
        CONVERSATIONREF.current.setAllMessagesRead();
    } else isAppOpened.current = false;
  }, [isAppInForground]);

  useEffect(() => {
    if (conversationID && isAppInForground) {
      setEncryptedStorage(
        encriptedStorageKeys.CONVERSATION_ID_KEY,
        conversationID
      );
    } else if (!isAppInForground)
      removeEncryptedStorage(encriptedStorageKeys.CONVERSATION_ID_KEY);
    return () => {
      updateChatVisitTime();
      removeEncryptedStorage(encriptedStorageKeys.CONVERSATION_ID_KEY);
    };
  }, [conversationID, isAppInForground]);

  useEffect(() => {
    if (conversationTwilioID) {
      registerTwilioClient();
    }
  }, [conversationTwilioID]);

  const getUnreadMessages = async (conversation: any) => {
    const participants = conversation.getParticipants();
    const count = (await conversation.getMessagesCount()) - 1;
    participants
      .then(async function (currentParticipants: any) {
        if (
          currentParticipants.every(
            (item: any) => item.lastReadMessageIndex !== null
          )
        ) {
          const filteredList = currentParticipants.filter(
            (item: any) => item.identity !== currentUser.ownereMail
          );
          setreadCount(
            Math.max(
              ...filteredList.map((item: any) => item.lastReadMessageIndex)
            ) + 1
          );
          setunreadCount(
            count -
              Math.min(
                ...filteredList.map((item: any) => item.lastReadMessageIndex)
              )
          );
        } else setunreadCount(0);
      })
      .catch((err: any) => logger.log("steppppppppp 8:", err));
  };

  const updateChatVisitTime = async () => {
    const data = await getEncryptedStorage(
      encriptedStorageKeys.LASTCHATSCREENVISIT
    );
    if (data) {
      const result: any[] = JSON.parse(data);
      const index = result.findIndex((item) => item.convoID === conversationID);
      if (index === -1) {
        result.push({
          convoID: conversationID,
          lastVisitTime: getUTCTimeNow(),
        });
        setEncryptedStorage(encriptedStorageKeys.LASTCHATSCREENVISIT, result);
      } else {
        result[index].lastVisitTime = getUTCTimeNow();
        setEncryptedStorage(encriptedStorageKeys.LASTCHATSCREENVISIT, result);
      }
    } else {
      const arr = [];
      arr.push({ convoID: conversationID, lastVisitTime: getUTCTimeNow() });
      setEncryptedStorage(encriptedStorageKeys.LASTCHATSCREENVISIT, arr);
    }
  };

  const registerTwilioClient = async () => {
    if (global.TWILIOCLIENT === null)
      await setTwilioClient(global.ACCESS_TOKEN as any);
    fetchConversationMessage(global.TWILIOCLIENT, conversationTwilioID);
  };

  const setCountValues = () => {
    setunreadCount((prev) => prev + 1);
  };

  const fetchConversationMessage = async (client: any, TwilioID: string) => {
    client
      .getConversationBySid(TwilioID)
      .then((conversation: Conversation) => {
        CONVERSATIONREF.current = conversation;
        conversation.setAllMessagesRead();
        unsubscribePartcipantUpdate.current = conversation.on(
          "participantUpdated",
          async () => {
            await getUnreadMessages(conversation);
          }
        );
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        conversation.on("messageAdded", async (message1: Message) => {
          const {
            body,
            index,
            attributes: { user, fileType, createdAt, fileName, fileSize },
          } = message1["state"];
          if (
            body &&
            lastMessageIndex !== index &&
            user._id !== currentUser._id
          ) {
            if (isAppOpened.current) conversation.setAllMessagesRead();
            const smg = getMessageFormat({
              content: body,
              type: getReversedFileType(fileType),
              currentUser: user,
              createdAt,
              fileName,
              fileSize,
            });
            onSend(smg);
            lastMessageIndex = index;
          } else {
            if (isFirstTimemsgSend && isAppOpened.current) {
              conversation.setAllMessagesRead();
              setisFirstTimemsgSend(false);
            }
            await getUnreadMessages(conversation);
          }
        });
        logger.log("Conversation handlers configured!!");
      })
      .catch((err: any) => {
        logger.log("conversation: ", err);
      });
  };

  useEffect(() => {
    if (onOpenAttachment) onOpenAttachment(isAttachmentVisible);
  }, [isAttachmentVisible]);

  useEffect(() => {
    if (addMessage && isConversationExist) {
      if (messages && messages[0] && messages[0]._id) {
        const { content, fileName = "", fileSize = 0, type } = addMessage;
        let msg = {};
        msg = getMessageFormat({
          content,
          type: getReversedFileType(type),
          fileSize,
          fileName,
          uploadingFlag: true,
          currentUser,
        });
        setMessageList([msg, ...messages]);
      }
    } else if (!addMessage && !isConversationExist) {
      setMessageList(messages);
      setTimeout(() => {
        if (chatListRef && scrollTo && scrollTo > 0) {
          chatListRef?.current?._messageContainerRef?.current.scrollToIndex({
            index: scrollTo,
            animated: true,
          });
          setScrollTo(0);
        }
      }, 1500);
    } else if (!addMessage && isConversationExist) setMessageList(messages);
  }, [messages]);

  useEffect(() => {
    uploadTypeOfMedia(selectedDocumentData);
  }, [selectedDocumentData]);

  const uploadTypeOfMedia = (documentData: any) => {
    if (
      documentData &&
      Array.isArray(documentData) &&
      documentData[0].size !== undefined
    ) {
      const { size, fileCopyUri, type, name } = documentData[0]
        ? documentData[0]
        : documentData;
      if (size <= 5242880) {
        if (isBothTypeSame(type, mediaTypes.IMAGE)) {
          if (onMessage) onMessage(documentData[0]);
          else
            onSend(
              getMessageFormat({
                type: mediaTypes.IMAGE,
                content: fileCopyUri,
                uploadingFlag: true,
                fileSize: size,
                fileName: name,
                currentUser,
              })
            );
        } else if (isBothTypeSame(type, mediaTypes.PDF)) {
          if (onMessage) onMessage(documentData[0]);
          else
            onSend(
              getMessageFormat({
                type: mediaTypes.PDF,
                content: fileCopyUri,
                uploadingFlag: true,
                fileSize: size,
                fileName: name,
                currentUser: currentUser,
              })
            );
        } else if (isBothTypeSame(type, mediaTypes.DOC)) {
          if (onMessage) onMessage(documentData[0]);
          else
            onSend(
              getMessageFormat({
                type: mediaTypes.DOC,
                content: fileCopyUri,
                uploadingFlag: true,
                fileSize: size,
                fileName: name,
                currentUser: currentUser,
              })
            );
        }
      } else {
        notifyMsg("File size limit Exceed, file size not more than 5MB");
      }
    }
  };

  const onSend = useCallback((message = []) => {
    setMessageList((previousMessages) =>
      GiftedChat.append(previousMessages as any, message)
    );
    setCountValues();
  }, []);

  const openDocuments = async () => {
    setSelectedDocumentData(await openDocxPDFFiles());
  };

  const openGallaryImgVideo = async () => {
    setSelectedDocumentData(await openGallary());
  };

  const onClickAttachment = () => {
    setIsAttachmentVisible(!isAttachmentVisible);
    Keyboard.dismiss();
  };

  const onSelectAttachmentType = (type: string) => {
    setIsAttachmentVisible(false);
    if (type == attachmentType.DOCUMENT) openDocuments();
    else if (type === attachmentType.CAMERA) setIsCameraOn(true);
    else if (type === attachmentType.GALLERY) openGallaryImgVideo();
  };

  const closeCamera = () => {
    setIsCameraOn(false);
  };

  const onMessageSend = (text: string) => {
    setInputMessage("");

    if (onMessage) {
      onMessage({
        content: text,
        type: mediaTypes.TEXT,
      });
    } else
      onSend(
        getMessageFormat({
          type: mediaTypes.TEXT,
          content: text,
          uploadingFlag: true,
          fileSize: 0,
          fileName: "",
          currentUser: currentUser,
        })
      );
  };

  const renderMessage = ({
    name,
    content,
    date,
    uploadingFlag,
    index,
    _id,
    userId,
  }: any) => {
    return (
      <DisplayTextMessage
        name={name}
        content={content}
        date={date}
        uploadingFlag={uploadingFlag}
        readCount={readCount}
        unreadCount={unreadCount}
        index={index}
        _id={_id}
        userId={userId}
      />
    );
  };

  const renderImage = ({
    type,
    uri,
    uploadingFlag,
    fileSize,
    fileName,
    index,
    _id,
    userId,
    date,
  }: any) => {
    return (
      <AppButton onPress={() => setViewURL({ uri, type })}>
        <ImageWithLoader
          uri={uri}
          isUploading={uploadingFlag}
          fileSize={fileSize}
          fileName={fileName}
          fileType={type}
          date={date}
          unreadCount={unreadCount}
          readCount={readCount}
          index={index}
          _id={_id}
          userId={userId}
        />
      </AppButton>
    );
  };

  const renderPdfFile = ({ message, date, index, _id, userId }: any) => {
    const {
      message: { type, content, uploadingFlag, fileSize, fileName },
    } = message;
    return (
      <DisplayPdf
        type={type}
        uri={content}
        uploadingFlag={uploadingFlag}
        fileSize={fileSize}
        fileName={fileName}
        date={date}
        unreadCount={unreadCount}
        readCount={readCount}
        index={index}
        _id={_id}
        userId={userId}
      />
    );
  };

  const renderBubble = (message: any) => {
    const { currentMessage = {}, previousMessage = {} } = message;
    const {
      user: { _id = "", createdAt = "", name = "" },
      message: {
        type = "",
        content = "",
        uploadingFlag = false,
        fileSize = 0,
        fileName = "",
      } = {},
      createdAt: localDate,
      index,
    } = currentMessage;
    const userId = currentUser?._id;
    const displayName =
      userId !== _id &&
      isSameUserNameMessage(currentMessage, previousMessage) &&
      isNameShownforSingleConversation;
    const isDisplayDate = isSameDayMessage(currentMessage, previousMessage);
    const date = localDate ? localDate : createdAt;
    return type !== "" ? (
      <LinearGradient
        colors={["#BCDFEF", "#94D4B4"]}
        style={[styles.gradient, userId === _id && { padding: 0 }]}
      >
        <View style={[styles.bubble, userId === _id && styles.currentUSer]}>
          {(displayName ||
            (isNameShownforSingleConversation &&
              isDisplayDate &&
              userId !== _id)) && <AppText style={styles.name}>{name}</AppText>}
          {isEqualIgnoreCase(type, mediaTypes.TEXT) &&
            renderMessage({
              name,
              content,
              date,
              uploadingFlag,
              index,
              _id,
              userId,
            })}
          {isEqualIgnoreCase(type, mediaTypes.IMAGE) &&
            renderImage({
              type,
              uri: content,
              uploadingFlag,
              fileSize,
              fileName,
              date,
              index,
              _id,
              userId,
            })}
          {(isEqualIgnoreCase(type, mediaTypes.PDF) ||
            isEqualIgnoreCase(type, mediaTypes.DOC)) &&
            renderPdfFile({
              message: currentMessage,
              date,
              index,
              _id,
              userId,
            })}
        </View>
      </LinearGradient>
    ) : (
      <View />
    );
  };

  const renderDay = (data: any) => {
    const { currentMessage, previousMessage } = data;
    const isDisplayDate = isSameDayMessage(currentMessage, previousMessage);
    const dateText = getDateFormatForDay(currentMessage.createdAt);
    return isDisplayDate ? <DisplayDay dateText={dateText} /> : null;
  };
  const renderToolBar = (props: any) => {
    const isEnableAttachement = !disableSendOption && inputMessage.length === 0;
    return (
      <InputToolbar
        {...props}
        containerStyle={[
          {
            bottom:
              !isAndroid() && isKeyboardVisible
                ? scale(messageList.length > 0 ? 15 : -15)
                : 0,
          },
        ]}
        renderSend={() => null}
        renderComposer={() => (
          <View style={styles.composerView}>
            <View
              style={
                [
                  styles.textInputContainer,
                  inputMessage && { width: "87%" },
                ] as ViewStyle
              }
            >
              <Composer
                {...props}
                disableComposer={disableSendOption}
                textInputStyle={{ color: themes.gray20 }}
                placeholder={translate.t(langVar.writeMessageHere)}
                placeholderTextColor={themes.gray20Opacity40}
                onTextChanged={(e) => {
                  if (hasContainOnlySpaces(e)) {
                    props.onTextChanged(e);
                    setInputMessage(e);
                  } else {
                    props.onTextChanged("");
                    setInputMessage("");
                  }
                }}
              />

              <AppButton
                testID={"attachmentIconID"}
                onPress={isEnableAttachement ? onClickAttachment : () => {}}
                style={{ opacity: isEnableAttachement ? 1 : 0.4 }}
              >
                <ClipIcon />
              </AppButton>
            </View>
            <Send {...props} containerStyle={styles.sendButton}>
              <SendIcon />
            </Send>
          </View>
        )}
      />
    );
  };

  const onImageCapture = (uri: string) => {
    if (uri) {
      setViewURL({ type: mediaTypes.IMAGE, uri, isUploading: true });
    }
  };

  const onClosePreviewMedia = () => {
    setViewURL({ type: "", uri: "", isUploading: false });
  };

  const checkScrollToTop = (data: any) => {
    if (onEndScrolledReached) onEndScrolledReached(data);
  };

  const onClickUpload = async (uri: string) => {
    if (uri) {
      closeCamera();
      onClosePreviewMedia();
      const { size, path } = await getFileDetails(uri);
      if (size <= 5242880) {
        if (onMessage) {
          onMessage({
            fileCopyUri: path,
            type: mediaTypes.IMAGE,
            size,
            name: getFileNameFromPath(path),
          });
        } else
          onSend(
            getMessageFormat({
              type: mediaTypes.IMAGE,
              content: uri,
              uploadingFlag: true,
              fileSize: size,
              fileName: getFileNameFromPath(path),
              currentUser: currentUser,
            })
          );
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!isCameraOn && (
        <PreviewMedia
          data={viewURL}
          onClose={onClosePreviewMedia}
          onClickUpload={onClickUpload}
        />
      )}
      <CameraComponent
        viewURL={viewURL}
        onClosePreviewMedia={onClosePreviewMedia}
        onClickUpload={onClickUpload}
        visible={isCameraOn}
        onCloseCamera={closeCamera}
        onCaptured={onImageCapture}
      />
      {isAttachmentVisible && !isKeyboardVisible && (
        <AppButton
          onPress={() => setIsAttachmentVisible(false)}
          style={
            [
              styles.attachmentContainer,
              {
                bottom: isAndroid() ? scale(55) : scale(53),
              },
            ] as ViewStyle
          }
        >
          <AttachmentBox
            testID={"attachmentTestID"}
            onPress={onSelectAttachmentType}
          />
        </AppButton>
      )}

      {!loading ? (
        <GiftedChat
          ref={(component) => (chatListRef.current = component)}
          extraData={unreadCount as any}
          listViewProps={{
            onEndReached: (data: any) => checkScrollToTop(data),
            initialScrollIndex: 0,
            onScrollToIndexFailed: (error: any) => {
              setTimeout(() => {
                chatListRef?.current?._messageContainerRef?.current.scrollToIndex(
                  {
                    index: error.index,
                    animated: true,
                  }
                );
              }, 300);
            },
          }}
          messages={
            messageList.map((m, index) => {
              return { ...m, index };
            }) as any
          }
          onSend={(message) => onMessageSend(message[0].text.trim())}
          user={currentUser}
          showAvatarForEveryMessage
          maxComposerHeight={scale(80)}
          renderBubble={renderBubble}
          renderAvatar={() => null}
          renderDay={renderDay}
          renderInputToolbar={renderToolBar}
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default EventHOC(ChatComponent);

ChatComponent.defaultProps = {
  onEndScrolledReached: () => {},
  isConversationExist: false,
  isNameShownforSingleConversation: false,
  disableSendOption: false,
  isLoadingRequired: true,
};
