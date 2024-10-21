import { View, StyleSheet, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { produce } from 'immer';

import { useCurrentTheme, useInputFocusOnInit } from 'hooks';
import { IconGlob, LineItemView, STHeader } from '@components'
import { ItemViewIcon } from 'src/components/sheets/AddOperationSheet';
import { LucideArrowDownUp, LucideBrush, LucideImage } from 'lucide-react-native';
import CategoryItem from 'src/components/items/CategoryItem';
import { CATEGORY_TYPES_MASKS } from '@constants';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesActions } from "@actions";;
import uuid from 'react-native-uuid';
import { categoriesSelectors } from '@redux';
import ConfirmDeleteSheet from 'src/components/sheets/ConfirmDeleteSheet';

const SetCategoryScreen = ({ navigation, route, isEdit }) => {
  // focus on ref
  const focusInputRef = React.useRef(null);
  !isEdit && useInputFocusOnInit(focusInputRef);


  const dispatch = useDispatch();
  const [themeColors] = useCurrentTheme();


  const [isValid, setValid] = React.useState(false)
  const initialState = {
    title: "",
    icon: "House",
    color: "#4DB3FF",
    type: CATEGORY_TYPES_MASKS[Object.keys(CATEGORY_TYPES_MASKS)[0]].type
  }
  const [state, setState] = React.useState({ ...initialState })

  const onSubmit = () => {
    // ~65ms in assign benchmark (removes Object.proto)
    const cleanObj = Object.create(null);
    Object.assign(cleanObj, state);

    if (isEdit) {
      Object.assign(cleanObj, { id: route.params.itemID });
      dispatch(categoriesActions.editCategory(cleanObj, route.params.itemID));
    }
    else {
      Object.assign(cleanObj, { id: uuid.v4() });
      dispatch(categoriesActions.addCategory(cleanObj));
    }

    setState(initialState);
    navigation.goBack()
  }

  const dispatchLocalAction = (key, value) => {
    setState(produce(draft => {
      draft[key] = value;
    }));
  }

  const onTitleChange = (value) => {
    dispatchLocalAction("title", value);
  }

  const navigateWithState = (route) => {
    navigation.navigate(route, {
      state,
      // Callback function to handle data from ScreenB
      onGoBack: ({ data }) => {
        setState(data);
      },
    });
  }

  const navigateToSubscreenIcon = () => navigateWithState("setcategory/icon")
  const navigateToSubscreenColor = () => navigateWithState("setcategory/color")
  const navigateToSubscreenType = () => navigateWithState("setcategory/type")

  // state "form" validation
  React.useEffect(() => {
    if (state.title.length && !!state.icon && !!state.type)
      setValid(true)
    else setValid(false)
  }, [state])

  const styles = StyleSheet.create({
    content: {
      height: "100%",
      marginTop: 15,
      marginHorizontal: 18,
      paddingBottom: 30,
    },
    segment: {

      marginBottom: 10,
    },
    input: {
      fontSize: 19,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginHorizontal: 4,
      marginBottom: 6,
      borderRadius: 10,
      borderWidth: 1.5,
      minHeight: 52,
      color: themeColors.textColor,
      borderColor: themeColors.borderColorSec,
    },
    label: {
      color: themeColors.textColor,
      fontWeight: "500",
      fontSize: 14,
      marginBottom: 5,
      marginLeft: 8
    },
    selectItemText: {
      fontSize: 16,
      color: themeColors.textColor
    },
    selectItemTextValue: {
      fontSize: 17,

      marginLeft: "auto",
      marginRight: 7,
      color: themeColors.chevronText
    },
    selectedIcon: {
      width: 41,
      height: 41,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: themeColors.borderColorTh,
      borderRadius: 15,
      padding: 7,
      marginLeft: "auto",
      marginRight: 5,


    },
    selectedColor: {
      width: 40,
      height: 40,
      borderRadius: 15,
      padding: 7,
      marginLeft: "auto",
      marginRight: 6,
      opacity: 0.25,

    },
    preview: {
      maxWidth: 200
    },
    deleteBTNParent: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40
    },
    deleteBTN: {
      padding: 10,
      fontSize: 17,
      color: themeColors.red
    }
  });

  const categoryItem = useSelector(((s) => categoriesSelectors.selectCategoryByID(s, route?.params?.itemID)))

  React.useEffect(() => {
    if(categoryItem && isEdit)
      setState({ ...state, ...categoryItem })
  }, [categoryItem])


  const DeleteBtn = () => {
    const [isOpen, setOpenSheet] = useState(false);
    const toggleSheet = () => setOpenSheet(!isOpen);

    const onDelete = () => {
      setOpenSheet(false);
      dispatch(categoriesActions.deleteCategory(route.params.itemID))
      navigation.goBack()
    }

    return (
      <View style={styles.deleteBTNParent}>
        <Pressable onPress={toggleSheet}>
          <Text style={styles.deleteBTN}>Delete Category</Text>
        </Pressable>
        <ConfirmDeleteSheet {...{ 
          toggleSheet, 
          isOpen,
          title: "Delete Category",
          desc: `Are you sure you want to delete the category${state.title ? " \"" + state.title + "\"" : ""}? This action cannot be undone. The category will remain visible in past transactions.`,
          desctiption: "",
          callbackAction: onDelete }} />
      </View>
    )
  }




  if (!categoryItem?.type && isEdit) return null;
  return (
    <View>
      <STHeader
        navigation={navigation}
        title={(isEdit ? "Edit" : "Add") + " Category"}
        rightText="Save"
        rightPressDisabled={!isValid}
        rightPress={onSubmit}
      />

      <ScrollView style={styles.content}>

        <View style={styles.segment}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            {...{
              ref: focusInputRef,
              placeholder: "Provide name",
              placeholderTextColor: themeColors.placeholderColor,
              maxLength: 16,
              style: styles.input,
              value: state.title,
              onChangeText: onTitleChange
            }} />
        </View>

        <View style={styles.segment}>
          <Pressable onPress={navigateToSubscreenIcon} style={{ width: "100%" }} >
            <LineItemView isOperation pl1 isLastItem rightArrow>
              <ItemViewIcon
                {...{
                  icon: <LucideImage stroke={themeColors.textColor} strokeWidth={1.9} width={24} height={24} />,
                  defBackground: themeColors.bgHighlightSec,
                  theme: themeColors.label
                }} />

              <Text style={styles.selectItemText}>Select Icon</Text>

              {
                state.icon
                  ? <View style={styles.selectedIcon}><IconGlob name={state.icon} color={themeColors.textColor} size={25} /></View>
                  : <Text style={styles.selectItemTextValue}>Default</Text>
              }

            </LineItemView>
          </Pressable>
        </View>

        <View style={styles.segment}>
          <Pressable onPress={navigateToSubscreenColor} style={{ width: "100%" }} >
            <LineItemView isOperation pl1 isLastItem rightArrow>
              <ItemViewIcon
                {...{
                  icon: <LucideBrush color={themeColors.textColor} strokeWidth={2} width={24} height={22} />,
                  defBackground: themeColors.bgHighlightSec,
                  theme: themeColors.label
                }} />



              <Text style={styles.selectItemText}>Select Color</Text>

              {
                state.color
                  ? <View style={[styles.selectedColor, { backgroundColor: state.color }]} />
                  : <Text style={styles.selectItemTextValue}>Gray</Text>
              }
            </LineItemView>
          </Pressable>
        </View>

        <View style={styles.segment}>
          <Pressable onPress={navigateToSubscreenType} style={{ width: "100%" }} >
            <LineItemView isOperation pl1 isLastItem rightArrow>
              <ItemViewIcon
                {...{
                  icon: <LucideArrowDownUp stroke={themeColors.textColor} strokeWidth={2} width={22} height={22} />,
                  defBackground: themeColors.bgHighlightSec,
                  theme: themeColors.label
                }} />

              <Text style={styles.selectItemText}>Operation Type</Text>
              <Text style={styles.selectItemTextValue}>{state.type}</Text>
            </LineItemView>
          </Pressable>
        </View>


        <Text style={[styles.label, { marginTop: 10 }]}>Preview</Text>
        <View style={[styles.segment, styles.preview]}>
          <CategoryItem iconColor={state.color || themeColors.tabsActiveColor} icon={<IconGlob color={state.color || themeColors.tabsActiveColor} name={state.icon} />} title={(state.title || "Category").toProperCase()} value={100} isRow />
        </View>


        {isEdit && route.params.itemID
          ? <DeleteBtn />
          : null}

      </ScrollView>

    </View>
  )
}

export default SetCategoryScreen