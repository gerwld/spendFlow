import React from 'react';
import { StyleSheet, Dimensions,ScrollView } from 'react-native';
import { IconGlob } from '@components';
import { shallowEqual, useSelector } from 'react-redux';
import { categoriesSelectors } from '@redux';

import ReportItem from './items/ReportItem';
import { navigateWithState } from '@constants';
import { useNavigation } from '@react-navigation/native';

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
    width: "100%",
    maxHeight:"100%",
    marginTop: 5,
    flex: 1,
    paddingHorizontal: 6
  },
});

export const MonthReport = React.memo(({currentType, currentItem, isCurrentPage}) => {
  const navigation = useNavigation()
  const {categories, categoriesArray} = useSelector(state => categoriesSelectors.selectCategoriesAndIDs(state), shallowEqual)
  
  // "details_screen"
  const onCategoryPress = (item, id) => {
    const category = {...item, id};
    navigateWithState("category_details_screen", {item: category}, navigation)
  }

 return (
    <ScrollView style={styles.pageExpensesContent} contentContainerStyle={styles.pageExpensesContent} >
      {categoriesArray?.length 
        ? categoriesArray.map((item, index) => {
      // filter by currentType if specified
       if(categories[item].type === currentType || !currentType) return (
        <ReportItem {...{
          onPress: () => onCategoryPress(categories[item], item),
          isCurrent: currentItem === item,
          title: categories[item].title,
          iconColor: categories[item].color,
          key: item,
          item: categories[item],
          icon: <IconGlob {...{name: categories[item].icon, color: categories[item].color}} />,
          size: 24,
          isRow: true,
          index,
          isCurrentPage
        }} />
      )
      
     }) : null}
    </ScrollView>
  );
});

export default React.memo(MonthReport);
