import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useCurrentTheme } from 'hooks';
import CategoryItem from 'src/components/items/CategoryItem';
import { LucideApple } from 'lucide-react-native';
import { LucidePopcorn } from 'lucide-react-native';
import { LucidePlus } from 'lucide-react-native';
import { LucideBookHeart } from 'lucide-react-native';
import { LucideTrain } from 'lucide-react-native';
import { LucideCat } from 'lucide-react-native';
import { Landmark } from 'lucide-react-native';
import { ShieldCheck } from 'lucide-react-native';
import { ArrowBigDownDash } from 'lucide-react-native';
import { LucideRepeat2 } from 'lucide-react-native';
import { EthernetPort } from 'lucide-react-native';

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

    const dataArray = React.useMemo(() => [
        {
            id: 1,
            title: "Entertainment",
            icon: <LucidePopcorn stroke="#ff3939" />,
            iconColor: "#ff3939",
        },
        {
            id: 2,
            title: "Groceries",
            icon: <LucideApple stroke="#3988ff" />,
            iconColor: "#3988ff",
        },
        {
            id: 3,
            title: "Education",
            icon: <LucideBookHeart stroke="#ff8c39" />,
            iconColor: "#ff8c39",
        },
        {
            id: 4,
            title: "Transport",
            icon: <LucideTrain stroke="#39ff6e" />,
            iconColor: "#39ff6e",
        },
        {
            id: 5,
            title: "Savings",
            icon: <Landmark stroke="#3999ff" />,
            iconColor: "#3999ff",
        },
        {
            id: 6,
            title: "Pets",
            icon: <LucideCat stroke="#decd36" />,
            iconColor: "#decd36",
        },
        {
            id: 7,
            title: "Debt Payments",
            icon: <ArrowBigDownDash stroke="#ff39ff" />,
            iconColor: "#ff39ff",
        },
        {
            id: 8,
            title: "Insurance",
            icon: <ShieldCheck stroke="#31e2cd" />,
            iconColor: "#31e2cd",
        },
        {
            id: 9,
            title: "Subscriptions",
            icon: <EthernetPort stroke="#5236f4" />,
            iconColor: "#5236f4",
        },
        {
            id: 10,
            title: "Add new",
            icon: <LucidePlus stroke="#b3b9bf" />,
            iconColor: "#b3b9bf",
            isAddNew: true,
        },
    ], []);
    
    return (
        <View style={styles.block}>
            {dataArray.map(item => 
                <CategoryItem key={item.id} iconColor={item.iconColor} icon={item.icon} title={item.title} isRow />
        )}
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
