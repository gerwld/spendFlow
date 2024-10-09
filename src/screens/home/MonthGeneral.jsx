import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useCurrentTheme } from 'hooks';
import CategoryBlock from 'src/components/CategoryBlock';

const MonthGeneral = ({calendarDate, calendarIndex}) => {
const [page, setPageIndex] = React.useState(0);
const [themeColors] = useCurrentTheme();
const styles = StyleSheet.create({
block: {
    flexDirection: "row",
    gap: 2,
    minHeight: 80,
    margin: 15,
    padding: 7,
    borderRadius: 16,
    backgroundColor: themeColors.monthGeneral,
},
child: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},
child_active: {
    backgroundColor: themeColors.monthGeneralActive,
    borderRadius: 12,
},
headerText: {
    fontSize: 17,
    color: themeColors.textColor,
},
child_active_h: {
    color: themeColors.textColorHighlight,
},
subText: {
    fontSize: 21,
    fontWeight: "400",
    paddingTop: 2,
},
child_active_exp: {
    color: "#d33434"
},
child_active_inc: {
    color: "#34d386"
},
});

const isActive = (pg, style) => pg === page && style ? styles[style] : pg === page;
const setActive = (pg) => setPageIndex(pg);

  return (
    <View>
        <View style={styles.block}>
        <Pressable 
            onPress={() => setActive(0)} 
            style={[styles.child, isActive(0, 'child_active')]}>

            <Text style={[styles.headerText, isActive(0, 'child_active_h')]}>Expenses</Text>
            <Text style={[styles.subText, styles.child_active_exp]}>400 PLN</Text>
        </Pressable>
        <Pressable 
            onPress={() => setActive(1)} 
            style={[styles.child, isActive(1, 'child_active')]}>

            <Text style={[styles.headerText, isActive(1, 'child_active_h')]}>Incomes</Text>
            <Text style={[styles.subText, styles.child_active_inc]}>400 PLN</Text>
        </Pressable>
        </View>
        <Text>date: {calendarDate}</Text>
        <Text>index: {calendarIndex}</Text>

        {isActive(0) && <PageExpenses/>}
        {isActive(1) && <PageIncomes/>}
      
    </View>
  )
}

const PageExpenses = () => {
    return (
        <View>
            <PageExpensesContent/>

        </View>
    )
}

const PageExpensesContent = () => {
    
    const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: "wrap",
        gap: 10,
        
    },
    });
    
    return (
        <View style={styles.block}>
            <CategoryBlock isRow/>
            <CategoryBlock isRow/>
            <CategoryBlock isRow/>
            <CategoryBlock isRow/>
        </View>
    )
}

const PageIncomes = () => {
    return (
        <View>
            <Text>PageIncomes</Text>
        </View>
    )
}

export default MonthGeneral
