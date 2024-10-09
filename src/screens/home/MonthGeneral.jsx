import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useCurrentTheme } from 'hooks';
import CategoryBlock from 'src/components/CategoryBlock';
import { LucideApple } from 'lucide-react-native';
import { LucidePopcorn } from 'lucide-react-native';
import { LucidePlus } from 'lucide-react-native';
import { LucideBookHeart } from 'lucide-react-native';
import { LucideTrain } from 'lucide-react-native';
import { LucideCat } from 'lucide-react-native';
import { Landmark } from 'lucide-react-native';
import { ShieldCheck } from 'lucide-react-native';
import { ArrowBigDownDash } from 'lucide-react-native';

const width = Dimensions.get("screen").width

const MonthGeneral = ({calendarDate, calendarIndex}) => {
const [page, setPageIndex] = React.useState(0);
const [themeColors] = useCurrentTheme();
const styles = StyleSheet.create({
block: {
    width: Math.min(width - 30, 400),
    flexDirection: "row",
    gap: 2,
    minHeight: 80,
    marginTop: 5,
    marginBottom: 14,
    alignSelf: "center",
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
        {/* <Text>date: {calendarDate}</Text>
        <Text>index: {calendarIndex}</Text> */}

        {isActive(0) && <PageExpenses stroke="#ff3939"/>}
        {isActive(1) && <PageIncomes stroke="#ff3939"/>}
      
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
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10,
        rowGap: 12,
        marginHorizontal: 15
        
    },
    });
    
    return (
        <View style={styles.block}>
            <CategoryBlock
            iconColor="#ff3939"
            icon={<LucidePopcorn stroke="#ff3939"/>}
            title="Entertainment"
            isRow />
            <CategoryBlock
            iconColor="#3988ff"
            icon={<LucideApple stroke="#3988ff"/>}
            title="Groceries"
            isRow />
            <CategoryBlock
            iconColor="#ff8c39"
            icon={<LucideBookHeart stroke="#ff8c39"/>}
            title="Education"
            isRow />
            <CategoryBlock
            iconColor="#39ff6e"
            icon={<LucideTrain stroke="#32dc60"/>}
            title="Transport"
            isRow />
              <CategoryBlock
            iconColor="#3999ff"
            icon={<Landmark stroke="#3999ff"/>}
            title="Savings"
            isRow />
            
            <CategoryBlock
            iconColor="#ffe816"
            icon={<LucideCat stroke="#decd36"/>}
            title="Pets"
            isRow />
          
             <CategoryBlock
            iconColor="#ff39ff"
            icon={<ArrowBigDownDash stroke="#ff39ff"/>}
            title="Debt Payments"
            isRow />
            <CategoryBlock
            iconColor="#36f4dd"
            icon={<ShieldCheck stroke="#31e2cd"/>}
            title="Insurance"
            isRow />
           
            <CategoryBlock
            // iconColor="#535353"
            icon={<LucidePlus stroke="#b3b9bf"/>}
            title="Add new"
            isRow
            isAddNew />
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
