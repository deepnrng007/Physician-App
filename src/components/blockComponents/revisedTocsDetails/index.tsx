import { View, ViewStyle } from "react-native";
import React from "react";
import AppText from "../../baseComponents/appText";
import DotSymbol from "../../baseComponents/dotSymbol";
import Underline from "../../baseComponents/underline";
import styles from "./styles";
import { langVar, themes, translate } from "../../../enums";
import { FlatList } from "react-native-gesture-handler";
import { getIsLocation, getLocaleTime } from "../../../utils/utils";
import useAppSelector from "../../customHooks/useAppSelector";
import AppButton from "../../baseComponents/appButton";

const RevisedTocsDetails = ({ revisedDetails, getHight, navigateTo }: any) => {
  const { revised } = revisedDetails;
  const revisedList = revised;
  const { configData } = useAppSelector((state) => state.configData);
  const RenderTitle = ({ title, date }: any) => {
    return (
      <View style={styles.titleDate}>
        <AppText style={styles.reviseTitle}>{title}</AppText>
        <AppText style={styles.date}>{date}</AppText>
      </View>
    );
  };

  const onClickCard = () => {
    if (navigateTo) navigateTo();
  };

  const renderRevisedItems = ({ item, index }: any) => {
    const {
      CreatedDateTime,
      TransitionOfCareItems,
      Version,
      AnticipatedAcuteLos,
    } = item;
    const isOriginal = Version === 1;
    return (
      <View onLayout={getHight} style={styles.reviseContainer}>
        <View
          style={{
            alignItems: "center",
            flex: 10,
            justifyContent: "center",
          }}
        >
          <Underline
            style={{
              backgroundColor: index > 0 ? "#979797" : "transparent",
              width: 1,
              flex: 1,
            }}
          />
          <DotSymbol style={{ marginTop: 0, backgroundColor: "#979797" }} />
          <Underline
            style={{
              backgroundColor:
                index === revisedList.length - 1 ? "transparent" : "#979797",
              width: 1,
              flex: 1,
            }}
          />
        </View>
        <AppButton
          onPress={() => (revisedList.length !== Version ? {} : onClickCard())}
          style={
            [
              styles.revisedCard,
              revisedList.length !== Version
                ? {
                    backgroundColor: themes.LightGray8,
                  }
                : { backgroundColor: themes.LightGreen9 },
            ] as ViewStyle
          }
        >
          <>
            <RenderTitle
              title={
                isOriginal
                  ? translate.t(langVar.originalToc)
                  : translate.t(langVar.tocRevised)
              }
              date={getLocaleTime(CreatedDateTime, "MM/DD/YYYY hh:mm a")}
            />
            {AnticipatedAcuteLos && (
              <View style={styles.row}>
                <DotSymbol style={styles.botStyle as ViewStyle} />
                <AppText style={styles.label}>
                  <AppText style={[styles.title]}> {" Acute LOS: "}</AppText>
                  {AnticipatedAcuteLos}
                  {AnticipatedAcuteLos > 1 ? " Days" : " Day"}
                </AppText>
              </View>
            )}
            {TransitionOfCareItems &&
              TransitionOfCareItems.length > 0 &&
              TransitionOfCareItems.map((item: any, index: number) => {
                const { PacTypeName, ProviderName, TargetLOS } = item;
                const isLocationBase = getIsLocation(
                  configData?.LocationTypes,
                  PacTypeName
                );
                return (
                  <View style={styles.row} key={index}>
                    <DotSymbol style={styles.botStyle as ViewStyle} />
                    {translate.t(langVar.homeWithoutService) !== item ? (
                      <>
                        <View style={styles.col1}>
                          <AppText numberOfLines={1} style={[styles.label]}>
                            <AppText style={[styles.label, styles.title]}>
                              {" "}
                              {PacTypeName}
                              {": "}
                            </AppText>
                            {`${ProviderName}`}
                          </AppText>
                        </View>

                        <View style={styles.col2}>
                          <AppText style={styles.label}>
                            <AppText style={[styles.title]}>
                              {isLocationBase ? "LOS: " : "Visits: "}
                            </AppText>
                            {TargetLOS +
                              (isLocationBase
                                ? TargetLOS > 1
                                  ? " Days"
                                  : " Day"
                                : "")}
                          </AppText>
                        </View>
                      </>
                    ) : (
                      <AppText numberOfLines={1} style={[styles.label]}>
                        {" "}
                        Home without services
                      </AppText>
                    )}
                  </View>
                );
              })}
          </>
        </AppButton>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={revised}
        renderItem={renderRevisedItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default RevisedTocsDetails;
