import { View, Text, StyleSheet, Dimensions, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { BaseView, IconGlob, STHeader } from '@components'
import SelectCategoryItem from 'src/components/items/SelectCategoryItem'
import { useSelector } from 'react-redux'
import { categoriesSelectors } from '@redux'
import { useCurrentTheme } from 'hooks'
import { LucideGripVertical } from 'lucide-react-native'
import DragList from 'react-native-draglist'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const { width, height } = Dimensions.get("window")

const EditCategoriesScreen = ({ navigation }) => {

  const { categoriesArray } = useSelector(categoriesSelectors.selectCategoriesAndIDs)
  const [data, setData] = useState(categoriesArray);
  const styles = StyleSheet.create({
    addNewButton: {
      position: "absolute",
      bottom: 100,
      left: width / 2 - 105,
      width: 210,
    },
    itemsList: {
      height: height,
      paddingHorizontal: 20,
      marginTop: 15
    },
  });

  const renderAddNew = (
    <View style={styles.addNewButton}>
      <SelectCategoryItem  {...{
        onPress: () => navigation.navigate("setcategory"),
        icon: <IconGlob {...{ name: "Plus", color: "#ffffff", stroke: 2, size: 25, }} />,
        iconColor: "#ffffff",
        title: "Add New Category",
        isRow: true,
        isAddNew: true,
      }} />
    </View>
  )

  function renderItem(info) {
    const { item, onDragStart, onDragEnd, isActive } = info;
    const pressableProps = {
      onPressIn: onDragStart,
      onPressOut: onDragEnd,
    }

    return (
      <RenderCategoryBlock itemID={item} pressableProps={pressableProps} isDragging={isActive} />
    );
  }

  async function onReordered(fromIndex, toIndex) {
    const copy = [...data];
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]);
    setData(copy);
  }

  function keyExtractor(str) {
    return str;
  }

  return (
    <BaseView>
      <STHeader {...{ navigation, title: "Manage categories" }} />

      <DragList
        data={data}
        style={styles.itemsList}
        contentContainerStyle={{ paddingBottom: 300 }}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
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
      marginBottom: 5,
      padding: 4,
      paddingRight: 0,
      borderRadius: 10,
      overflow: "hidden"
    },
    item_bg: {
      ...StyleSheet.absoluteFill,
      borderRadius: 10,
      backgroundColor: themeColors.bgHighlight,
      zIndex: -1
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
      paddingHorizontal: 5,
      marginRight: 10
    },
    btn_drag: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      height: 39,
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
        {/* <View style={[styles.icon_bg, { backgroundColor: item.color }]} /> */}
      </View>

      <Text style={styles.title}>{item.title}</Text>

      <Pressable onPress={onEditPress}>
        <Text style={styles.btn_edit}>Edit</Text>
      </Pressable>

      <Pressable style={styles.btn_drag} {...pressableProps}>
        <LucideGripVertical size={22} color={themeColors.textColor} />
      </Pressable>
      {isDragging && Platform.OS === "ios" && <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(900)} style={[styles.item_bg,]} />}
    </View>
  )
}

export default EditCategoriesScreen