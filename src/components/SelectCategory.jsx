import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CategoryItem from 'src/components/items/CategoryItem';
import { IconGlob } from '@components';
import { shallowEqual, useSelector } from 'react-redux';
import { categoriesSelectors } from '@redux';
import { useNavigation } from '@react-navigation/native';
import SelectCategoryItem from './items/SelectCategoryItem';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  block: {
    width: Math.min(width - 30, 1000),
    alignSelf: "center",
    flexDirection: 'row',
    gap: 2,
    minHeight: 80,
    marginTop: 5,
    marginHorizontal: 19,
    marginBottom: 14,
    padding: 7,
    borderRadius: 16,
  },
  child: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childActive: {
    borderRadius: 12,
  },
  headerText: {
    fontSize: 17,
  },
  subText: {
    fontSize: 21,
    fontWeight: '400',
    paddingTop: 2,
  },
  subTextExpense: { color: '#d33434' },
  subTextIncome: { color: '#34d386' },
  pageExpensesContent: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
    rowGap: 6,
  },
});

const SelectCategory = React.memo(({currentType, onPress, currentItem}) => {
  const navigation = useNavigation();
  const {categories, categoriesArray} = useSelector(state => categoriesSelectors.selectCategoriesAndIDs(state), shallowEqual)

  const renderAddNew = (
    <SelectCategoryItem  {...{  
      onPress: () => navigation.navigate("addcategory"),
      icon: <IconGlob {...{name: "Plus", color: "#ffffff", stroke: 2, size: 22,}} />,
      iconColor: "#ffffff",
      title: "Add New",
      
      isRow: true,
      isAddNew: true,
    }} />
  )

  const onCategoryPress = (itemID) => {
    onPress && onPress(itemID) 
  }

 return (
    <View style={styles.pageExpensesContent}>
      {categoriesArray?.length 
        ? categoriesArray.map(item => {
        
      // filter by currentType if specified, return all if not
       if(categories[item].type === currentType || !currentType) return (
        <SelectCategoryItem {...{
          onPress: () => onCategoryPress(item),
          isCurrent: currentItem === item,
          title: categories[item].title,
          iconColor: categories[item].color,
          key: item,
          icon: <IconGlob {...{name: categories[item].icon, color: categories[item].color}} />,
          size: 24,
          isRow: true,
        }} />
      )
      
     }) : null}
        
       {renderAddNew}

    </View>
  );
});

export default React.memo(SelectCategory);
