import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { BaseView, IconGlob, STHeader } from '@components'
import SelectCategoryItem from 'src/components/items/SelectCategoryItem'
import { useDispatch, useSelector } from 'react-redux'
import { categoriesSelectors } from '@redux'
import { useCurrentTheme } from 'hooks'
import { LucideGripVertical } from 'lucide-react-native'
import DragList from 'react-native-drag-n-drop-everywhere'
import { categoriesActions } from '@actions'

const { width, height } = Dimensions.get("window")

const EditCategoriesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [themeColors] = useCurrentTheme();
  const { categoriesArray } = useSelector(categoriesSelectors.selectCategoriesAndIDs)
  
  const styles = StyleSheet.create({
    addNewButton: {
      position: "absolute",
      bottom: 100,
      left: width / 2 - 115,
      width: 210,

      alignItems: 'center',
      justifyContent: 'center',
  
      borderRadius: 50,
      shadowColor: "#4e9bff",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,

      elevation: 17,
    },
    itemsList: {
      height: height,
      paddingHorizontal: 20,
      marginTop: 15
    },
    btn_drag: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      height: 39,
    },
  });
  

  const renderAddNew = (
    <View style={styles.addNewButton}>
      <SelectCategoryItem  {...{
        onPress: () => navigation.navigate("setcategory"),
        icon: <IconGlob {...{ name: "Plus", color: "#ffffff", stroke: 2.4, size: 25, }} />,
        iconColor: "#ffffff",
        title: "Add New Category",
        isRow: true,
        isAddNew: true,
      }} />
    </View>
  )

  function renderItem({item}) {
    return (
      <RenderCategoryBlock itemID={item} />
    );
  }

  const renderGrip = () => (
    <Pressable style={styles.btn_drag}>
      <LucideGripVertical size={22} color={themeColors.textColor} />
    </Pressable>
  )

  const onSort = (IDsArray) => {
    if(Array.isArray(IDsArray) && IDsArray.length === categoriesArray.length)
      dispatch(categoriesActions.swapCategoriesIDs(IDsArray))
  }

  return (
    <BaseView>
      <STHeader {...{ navigation, title: "Manage categories" }} />

      <DragList
        key={categoriesArray[0]}
        data={categoriesArray}
        itemsGap={5}
        style={styles.itemsList}
        contentContainerStyle={{ paddingBottom: 200 }}
        renderItem={renderItem}
        backgroundOnHold={themeColors.background}
        itemHeight={48}
        renderGrip={renderGrip}

        callbackNewDataIds={onSort}
        itemContainerStyle={{ borderWidth: 1, borderColor: themeColors.borderColor}}
        itemBorderRadius={8}
      />

      {renderAddNew}
    </BaseView>
  )
}


const RenderCategoryBlock = ({ itemID, pressableProps, isDragging }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    item: {
      flexDirection: "row",
      alignItems: "center",
      padding: 4,
      paddingRight: 0,
      borderRadius: 10,
      overflow: "hidden"
    },

    icon: {
      width: 40,
      height: 40,
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      overflow: "hidden"
    },
    icon_bg: {
      ...StyleSheet.absoluteFill,
      opacity: 0.1
    },
    title: {
      flex: 1,
      fontSize: 15,
      color: themeColors.textColorHighlight,
      marginRight: 10
    },
    btn_edit: {
      color: themeColors.tabsActiveColor,
      fontSize: 15,
      paddingHorizontal: 6,
    },
  });
  const item = useSelector((state) => categoriesSelectors.selectCategoryByID(state, itemID))

  const onEditPress = () => {
    alert(itemID)
  }

  return (
    <View style={styles.item} key={itemID}>

      <View style={styles.icon}>
        <IconGlob name={item.icon} color={item.color} />
        <View style={[styles.icon_bg, { backgroundColor: item.color }]} />
      </View>

      <Text style={styles.title}>{item.title}</Text>

      <Pressable onPress={onEditPress}>
        <Text style={styles.btn_edit}>Edit</Text>
      </Pressable>

    </View>
  )
}

export default EditCategoriesScreen