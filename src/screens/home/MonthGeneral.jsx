import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useCurrentTheme } from 'hooks';
import CategoryItem from 'src/components/items/CategoryItem';
import { LucideApple, LucidePopcorn, LucidePlus, LucideBookHeart, LucideTrain, LucideCat, Landmark, ShieldCheck, ArrowBigDownDash, EthernetPort } from 'lucide-react-native';

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
  const dataArray = React.useMemo(() => [
    { id: 1, title: 'Entertainment', icon: <LucidePopcorn stroke="#ff3939" />, iconColor: '#ff3939' },
    { id: 2, title: 'Groceries', icon: <LucideApple stroke="#3988ff" />, iconColor: '#3988ff' },
    { id: 3, title: 'Education', icon: <LucideBookHeart stroke="#ff8c39" />, iconColor: '#ff8c39' },
    { id: 4, title: 'Transport', icon: <LucideTrain stroke="#39ff6e" />, iconColor: '#39ff6e' },
    { id: 5, title: 'Savings', icon: <Landmark stroke="#3999ff" />, iconColor: '#3999ff' },
    { id: 6, title: 'Pets', icon: <LucideCat stroke="#decd36" />, iconColor: '#decd36' },
    { id: 7, title: 'Debt Payments', icon: <ArrowBigDownDash stroke="#ff39ff" />, iconColor: '#ff39ff' },
    { id: 8, title: 'Insurance', icon: <ShieldCheck stroke="#31e2cd" />, iconColor: '#31e2cd' },
    { id: 9, title: 'Subscriptions', icon: <EthernetPort stroke="#5236f4" />, iconColor: '#5236f4' },
    { id: 10, title: 'Add new', icon: <LucidePlus stroke="#b3b9bf" />, iconColor: '#b3b9bf', isAddNew: true },
  ], []);

  return (
    <View style={styles.pageExpensesContent}>
      {dataArray.map(item => (
        <CategoryItem key={item.id} iconColor={item.iconColor} icon={item.icon} title={item.title} isRow />
      ))}
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
