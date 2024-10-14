import { View, StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { produce } from 'immer';

import { useCurrentTheme, useInputFocusOnInit } from 'hooks';
import { IconGlob, LineItemView, STHeader } from '@components'
import { ItemViewIcon } from 'src/components/sheets/AddOperationSheet';
import { LucideArrowDownUp, LucideBrush, LucideImage } from 'lucide-react-native';
import CategoryItem from 'src/components/items/CategoryItem';
import { CATEGORY_TYPES_MASKS } from '@constants';

const SetCategoryScreen = ({ navigation }) => {
  const focusInputRef = React.useRef(null);
  const [themeColors] = useCurrentTheme();

  useInputFocusOnInit(focusInputRef);

  const [isValid, setValid] = React.useState(false)
  const [state, setState] = React.useState({
    categoryTitle: "",
    categoryIcon: "House",
    categoryColor: "#4DB3FF",
    categoryType: CATEGORY_TYPES_MASKS[Object.keys(CATEGORY_TYPES_MASKS)[0]].type
  })

  React.useEffect(() => {
    if(state.categoryTitle.length && !!state.categoryIcon && state.categoryType) 
      setValid(true)
    else setValid(false)
  }, [state])

  const dispatchAction = (key, value) => {
    setState(produce(draft => {
      draft[key] = value;
    }));
  }

  const onTitleChange = (value) => {
    dispatchAction("categoryTitle", value);
  }

  const navigateWithState = (route) => {
    navigation.navigate(route, {
      state,
      onGoBack: ({ data }) => {
        // Callback function to handle data from ScreenB
        setState(data);
      },
    });
  }

  const navigateToSubscreenIcon = () => navigateWithState("setcategory/icon")
  const navigateToSubscreenColor = () => navigateWithState("setcategory/color")
  const navigateToSubscreenType = () => navigateWithState("setcategory/type")


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
    }
  });

  const onPressSave =() => {
    alert(JSON.stringify(state))
  }


  return (
    <View>
      <STHeader
        navigation={navigation}
        title="Add Category"
        rightText="Save"
        rightPressDisabled={!isValid}
        rightPress={onPressSave}
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
              value: state.categoryTitle,
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
                state.categoryIcon
                  ? <View style={styles.selectedIcon}><IconGlob name={state.categoryIcon} color={themeColors.textColor} size={25} /></View>
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
                state.categoryColor
                  ? <View style={[styles.selectedColor, { backgroundColor: state.categoryColor }]} />
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

              <Text style={styles.selectItemText}>Type</Text>
              <Text style={styles.selectItemTextValue}>{state.categoryType}</Text>
            </LineItemView>
          </Pressable>
        </View>


        <Text style={[styles.label, { marginTop: 10 }]}>Preview</Text>
        <View style={[styles.segment, styles.preview]}>
          <CategoryItem iconColor={state.categoryColor || themeColors.tabsActiveColor} icon={<IconGlob color={state.categoryColor || themeColors.tabsActiveColor} name={state.categoryIcon} />} title={(state.categoryTitle || "No data").toProperCase()} value={100} isRow />
        </View>


      </ScrollView>

    </View>
  )
}

export default SetCategoryScreen