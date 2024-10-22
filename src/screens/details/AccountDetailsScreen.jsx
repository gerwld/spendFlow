import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { BaseView, STHeader } from '@components'
import { useCurrentTheme, useHeaderStyles } from 'hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { RenderCategoryOrAccount } from './TransactionDetailsScreen';
import ValueMask from 'src/components/styling/ValueMask';
import { useSelector } from 'react-redux';
import { accountsSelectors, operationsSelectors } from '@redux';
import OperationsItem from 'src/components/items/OperationsItem';
import { navigateWithState } from '@constants';
import { PencilIcon } from 'lucide-react-native';

const timestampNow = new Date().setHours(0, 0, 0, 0)
const timestampMonthAgo = timestampNow - (86400000 * 31);
const AccountDetailsScreen = ({ navigation, route }) => {
  const [themeColors] = useCurrentTheme();
  const { headerStyles } = useHeaderStyles();
  const item = useSelector((s) => accountsSelectors.selectAccountByID(s, route.params.item.id)) || route.params.item;
  const { operations } = useSelector(operationsSelectors.selectOperationsAndIDs)
  const lastOperationsIDs = useSelector((s) => operationsSelectors.selectOperationsPortionMinMax(s, timestampMonthAgo, timestampNow))

  console.log(item);



  const styles = StyleSheet.create({
    content: {
      paddingHorizontal: 20,
      paddingTop: 5,
      paddingBottom: 20
    },
    content_wrapper: {
      marginHorizontal: 10,
      marginVertical: 20,
      borderWidth: 2.2,
      borderColor: themeColors.borderColorSec,
      borderBottomWidth: 0,
      borderTopWidth: 0,
    },
    text: {
      color: themeColors.textColorHighlight
    },
    valueText: {
      color: themeColors.chevronText
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      overflow: "hidden"
    },
    icon_bg: {
      position: "absolute",
      ...StyleSheet.absoluteFill,
      zIndex: -1,
      opacity: item?.color ? (themeColors.label === "dark" ? 0.2 : 0.1) : 1,
    },
    categoryBlock: {
      flexDirection: "row",
      alignItems: 'center',
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      height: 48,
    },
    contentText: {
      flex: 1,
      fontSize: 15,
      fontWeight: "500",
      color: themeColors.textColorHighlight
    },
    title: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 18,
      fontWeight: "600",
      color: themeColors.textColorHighlight
    },
    scroll: {
      height: "100%"
    }
  });
  const showID = () => {
    if (item.id)
      alert(item.id)
  }
  const onCategoryEdit = () => {
    navigateWithState("editaccount", { itemID: item.id }, navigation)
  }

  const renderHeaderButton = (
    <View style={[headerStyles.rightComponent]}>
      <Pressable
        style={[headerStyles.headerButton]}
        onPress={onCategoryEdit}
      >
        <PencilIcon
          style={{ marginLeft: 1, marginTop: 0, alignSelf: "center" }}
          width={25}
          height={55}
          strokeWidth={2.1}
          stroke={themeColors.textColorHighlight}
        />
      </Pressable>
    </View>
  )

  return (
    <BaseView>
      <STHeader

        title="Account Details"
        onRightPress={() => navigation.navigate("edit_account_screen")}
        rightComponent={renderHeaderButton}
        navigation={navigation} />

      



        <View style={styles.content} >

          <Pressable onPress={onCategoryEdit} style={styles.item}>
            <Text style={styles.contentText}>Preview</Text>
            <RenderCategoryOrAccount {...{ icon: item?.icon, styles, color: item?.color, title: item?.title || "No category" }} />
          </Pressable>

          <Pressable onPress={showID} style={styles.item}>
            <Text style={styles.contentText}>Identifier</Text>
            <Text style={styles.valueText}>{item.id?.truncate(18) || "Operation"}</Text>
          </Pressable>

          <Text style={styles.title}>Last operations:</Text>

          <ScrollView style={styles.scroll}>
          {operations && lastOperationsIDs ?
            lastOperationsIDs.map(item =>
              <OperationsItem key={item} item={operations[item]} />
            )
            : <Text style={styles.text}>No last operations</Text>
          }
          </ScrollView>
        </View>

      
    </BaseView>
  )
}

export default AccountDetailsScreen