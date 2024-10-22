import { Text, StyleSheet, Pressable, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BaseView, IconGlob, STHeader } from '@components'
import { useCurrentTheme, useHeaderStyles } from 'hooks';
import { PencilIcon } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { accountsSelectors, categoriesSelectors, operationsSelectors } from '@redux';
import SetOperationSheet from 'src/components/sheets/SetOperationSheet';
import ValueMask from 'src/components/styling/ValueMask';
import ZigzagLines from "react-native-zigzag-lines"

const TransactionDetailsScreen = ({ navigation, route }) => {
  const [themeColors] = useCurrentTheme();
  const { headerStyles } = useHeaderStyles();
  const [width, setWidth] = useState()


  const item = useSelector((s) => operationsSelectors.selectOperationByID(s, route.params.item.id))
  const categoryItem = useSelector((s) => categoriesSelectors.selectCategoryByID(s, item.categoryID))
  const accountItem = useSelector((s) => accountsSelectors.selectAccountByID(s, item.accoutID))


  const [isSheetOpen, toggleSheetOpen] = React.useState(false);
  const toggleSheet = () => {
    toggleSheetOpen(!isSheetOpen);
  };


  const RenderCategoryOrAccount = ({ icon, color, title }) => (
    <View style={styles.categoryBlock}>
      <View style={styles.icon}>
        <IconGlob name={icon} color={color} size={20} />
        <View style={[styles.icon_bg, { backgroundColor: color || themeColors.thumbBackground }]} />
      </View>

      <Text style={styles.valueText}>{title}</Text>
    </View>
  )


  const styles = StyleSheet.create({
    content: {
      paddingHorizontal: 22,
      paddingTop: 5,
      paddingBottom: 20
    },
    content_wrapper: {
      marginHorizontal: 12,
      marginVertical: 20,
      borderWidth: 2.5,
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
      opacity: categoryItem?.color ? (themeColors.label === "dark" ? 0.2 : 0.1) : 1,
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
    }
  });


  const renderHeaderButton = (
    <View style={[headerStyles.rightComponent]}>
      <Pressable
        style={[headerStyles.headerButton]}
        onPress={toggleSheet}
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
        title="Operation Details"
        rightComponent={renderHeaderButton}
        navigation={navigation} />


      <ScrollView>
        <View onLayout={e => setWidth(e.nativeEvent.layout.width)}>


        <View style={styles.content_wrapper}>
          {typeof width == 'number' && <ZigzagLines
            width={width}
            color={themeColors.borderColorSec}
          />}

          <View style={styles.content} >
            <View style={styles.item}>
              <Text style={styles.contentText}>Title</Text>
              <Text style={styles.valueText}>{item.title || "Operation"}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.contentText}>Desctiption</Text>
              <Text style={styles.valueText}>{item.desc || "No desctiption"}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.contentText}>Value</Text>
              <ValueMask {...{ value: (item.value || "0") + " " + item.currency, type: item.type, style: {fontSize: 18, fontWeight: "500"} }} />
            </View>

            <View style={styles.item}>
              <Text style={styles.contentText}>Operation type</Text>
              <Text style={styles.valueText}>{item.type}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.contentText}>Date</Text>
              <Text style={styles.valueText}>{item.timestamp}</Text>
            </View>


            <View style={styles.item}>
              <Text style={styles.contentText}>Category</Text>
              <RenderCategoryOrAccount {...{ icon: categoryItem?.icon, color: categoryItem?.color, title: categoryItem?.title || "No category" }} />
            </View>

            <View style={styles.item}>
              <Text style={styles.contentText}>Accout</Text>
              <RenderCategoryOrAccount {...{ icon: accountItem?.icon, color: accountItem?.color, title: accountItem?.title || "No account" }} />
            </View>
          </View>


          {typeof width == 'number' && <ZigzagLines
            position="bottom"
            width={width}
            color={themeColors.borderColorSec}
          />}
          </View>

        </View>
      </ScrollView>

      <SetOperationSheet {...{
        isOpen: isSheetOpen,
        toggleSheet,
        isEdit: true,
        item
      }} />
    </BaseView>
  )
}

export default TransactionDetailsScreen