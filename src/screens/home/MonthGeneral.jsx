import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useCurrentTheme } from 'hooks';
import CategoryItem from 'src/components/items/CategoryItem';
import { LucideApple, LucidePopcorn, LucidePlus, LucideBookHeart, LucideTrain, LucideCat, Landmark, ShieldCheck, ArrowBigDownDash, EthernetPort } from 'lucide-react-native';
import { IconGlob } from '@components';
import { shallowEqual, useSelector } from 'react-redux';
import { categoriesSelectors } from '@redux';

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
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    rowGap: 12,
    marginHorizontal: 15,
  },
});

const MonthGeneral = ({ calendarDate, calendarIndex }) => {
  const [page, setPage] = React.useState(0);
  const [themeColors] = useCurrentTheme();

  const isActive = (pg) => pg === page;

  const setActive = (pg) => setPage(pg);

  const memoizedStyles = React.useMemo(() => ({
    block: [styles.block, { backgroundColor: themeColors.monthGeneral }],
    headerText: [styles.headerText, { color: themeColors.textColor }],
    childActive: [styles.childActive, { backgroundColor: themeColors.monthGeneralActive }],
    childActiveHeader: { color: themeColors.textColorHighlight },
  }), [themeColors]);

  return (
    <View>
      <View style={memoizedStyles.block}>
        <Pressable onPress={() => setActive(0)} style={[styles.child, isActive(0) && memoizedStyles.childActive]}>
          <Text style={[memoizedStyles.headerText, isActive(0) && memoizedStyles.childActiveHeader]}>Expenses</Text>
          <Text style={[styles.subText, styles.subTextExpense]}>400 PLN</Text>
        </Pressable>
        <Pressable onPress={() => setActive(1)} style={[styles.child, isActive(1) && memoizedStyles.childActive]}>
          <Text style={[memoizedStyles.headerText, isActive(1) && memoizedStyles.childActiveHeader]}>Incomes</Text>
          <Text style={[styles.subText, styles.subTextIncome]}>400 PLN</Text>
        </Pressable>
      </View>


      {page === 0 && <PageExpenses />}
      {page === 1 && <PageIncomes />}
    </View>
  );
};

const PageExpenses = React.memo(() => {
  const {categories, categoriesArray} = useSelector(state => categoriesSelectors.selectCategoriesAndIDs(state), shallowEqual)
  console.log(categories, categoriesArray);
  
  const dataArray = React.useMemo(() => [
    { id: 1, title: 'Entertainment', icon: "Popcorn", iconColor: '#ff3939' },
    { id: 2, title: 'Groceries', icon: "Apple", iconColor: '#3988ff' },
    { id: 3, title: 'Education', icon: "BookHeart", iconColor: '#ff8c39' },
    { id: 4, title: 'Transport', icon: "BusFront", iconColor: '#39ff6e' },
    { id: 5, title: 'Savings', icon: "Landmark", iconColor: '#3999ff' },
    { id: 6, title: 'Pets', icon: "Cat", iconColor: '#decd36' },
    { id: 7, title: 'Debt Payments', icon: "ArrowBigDownDash", iconColor: '#ff39ff' },
    { id: 8, title: 'Insurance', icon: "ShieldCheck", iconColor: '#31e2cd' },
    { id: 9, title: 'Subscriptions', icon: "EthernetPort", iconColor: '#6147f5' },
  ], []);

  const renderAddNew = (
    <CategoryItem  {...{  
      navigateTo: "setcategory",
      icon: <IconGlob {...{name: "Plus", color: "#b3b9bf"}} />,
      iconColor: "#b3b9bf",
      title: "Add New",
      size: 24,
      isRow: true,
      isAddNew: true,
    }} />
  )

 return (
    <View style={styles.pageExpensesContent}>
      {categoriesArray?.length 
        ? categoriesArray.map(item => (
        <CategoryItem {...{
          // ...categories[item],
          title: categories[item].title,
          iconColor: categories[item].color,
          key: item,
          icon: <IconGlob {...{name: categories[item].icon, color: categories[item].color}} />,
          size: 24,
          isRow: true
        }} />
      )) : null}
        
       {renderAddNew}

    </View>
  );
});

const PageIncomes = React.memo(() => {
  return (
    <View>
      <Text>PageIncomes</Text>
    </View>
  );
});

export default React.memo(MonthGeneral);
