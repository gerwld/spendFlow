import { Text, StyleSheet, Pressable, View, ScrollView } from 'react-native'
import React from 'react'
import { BaseView, IconGlob, STHeader } from '@components'
import { useCurrentTheme, useHeaderStyles } from 'hooks';
import { PencilIcon } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { categoriesSelectors, operationsSelectors } from '@redux';
import { navigateWithState } from '@constants';
import SetOperationSheet from 'src/components/sheets/SetOperationSheet';

const TransactionDetailsScreen = ({ navigation, route }) => {
  const [themeColors] = useCurrentTheme();
  const { headerStyles } = useHeaderStyles();
  // const item = route.params.item || {};
  const item = useSelector((s) => operationsSelectors.selectOperationByID(s, route.params.item.id))
  const categoryItem = useSelector((s) => categoriesSelectors.selectCategoryByID(s, item.categoryID))

  const styles = StyleSheet.create({
    text: {
      color: themeColors.textColorHighlight
    },
    icon: {
      width: 35,
      height: 35,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      overflow: "hidden"
    },
    icon_bg: {
      position: "absolute",
      ...StyleSheet.absoluteFill,
      backgroundColor: categoryItem?.color || themeColors.bgHighlightSec,
      zIndex: -1,
      opacity: categoryItem?.color ? (themeColors.label === "dark" ? 0.2 : 0.1) : 1,
    },
    categoryBlock: {
      flexDirection: "row",
      alignItems: 'center',
    }
  });

  



  const navigateToEdit = () => {
    navigateWithState("edittransaction", {itemID: item.id}, navigation)
  }

  const [isSheetOpen, toggleSheetOpen] = React.useState(false);

  const toggleSheet = () => {
    toggleSheetOpen(!isSheetOpen);
  };
  
  

  const renderHeaderButton = (
    <View style={[headerStyles.rightComponent]}>
      <Pressable
        style={[headerStyles.headerButton]}
        onPress={toggleSheet}
      >
        <PencilIcon
          style={{ marginLeft: 1, marginTop: 0, alignSelf: "center" }}
          width={25}
          height={55}
          strokeWidth={2.1}
          stroke={themeColors.textColorHighlight}
        />
      </Pressable>
    </View>
  )

  return (
    <BaseView style={styles.content}>
      <STHeader
        title="Transaction Details"
        rightComponent={renderHeaderButton}
        navigation={navigation} />


    <ScrollView>
      <Text style={styles.text}>{item.title || "No title"}</Text>
      <Text style={styles.text}>{((item.value || "0") + " " + item.currency)}</Text>

      <Text style={styles.text}>{item.type}</Text>

      
      <View style={styles.categoryBlock}>
        <View style={styles.icon}>
          <IconGlob name={categoryItem?.icon} color={categoryItem?.color}/>
          <View style={styles.icon_bg} />
        </View>

        <Text style={styles.text}>{categoryItem?.title || "No category"}</Text>
      </View>
    </ScrollView>

    <SetOperationSheet {...{
      isOpen: isSheetOpen,
      toggleSheet,
      isEdit: true,
      item
    }}/>
    </BaseView>
  )
}

export default TransactionDetailsScreen