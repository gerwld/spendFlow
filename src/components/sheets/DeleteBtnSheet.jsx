import { useCurrentTheme } from "hooks";
import { useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import ConfirmDeleteSheet from "./ConfirmDeleteSheet";
import { useTranslation } from "react-i18next";



const DeleteBtnSheet = ({action, itemTitle, actionTitle, sheetTitle, setHeight= 400, marginTop = 40, sheetDesc, tKey}) => {
  const {t} = useTranslation();
  const [themeColors] = useCurrentTheme();
  const [isOpen, setOpenSheet] = useState(false);
  const toggleSheet = () => setOpenSheet(!isOpen);

  const onDelete = () => {
    setOpenSheet(false);
    action();
    // navigation.goBack()
  }


  const styles = StyleSheet.create({
    deleteBTNParent: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop
    },
    deleteBTN: {
      padding: 10,
      fontSize: 17,
      color: themeColors.red
    }
  });


  return (
    <View style={styles.deleteBTNParent}>
      <Pressable onPress={toggleSheet}>
        <Text style={styles.deleteBTN}>{sheetTitle || "Delete"}</Text>
      </Pressable>
      <ConfirmDeleteSheet {...{ 
        toggleSheet, 
        isOpen,
        title: sheetTitle,
        setHeight,
        desc: t(tKey, { itemName: itemTitle }),
        description: "",
        callbackAction: onDelete }} />
    </View>
  )
}

export default DeleteBtnSheet;