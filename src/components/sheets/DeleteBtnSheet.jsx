import { useCurrentTheme } from "hooks";
import { useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import ConfirmDeleteSheet from "./ConfirmDeleteSheet";
import { useNavigation } from "@react-navigation/native";



const DeleteBtnSheet = ({action, itemTitle, actionTitle, sheetTitle, setHeight= 400, marginTop = 40}) => {
  const navigation = useNavigation()
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
        desc: `Are you sure you want to delete ${itemTitle ? "the " : ""}${actionTitle}${itemTitle ? " \"" + itemTitle + "\"" : ""}? This action cannot be undone. The ${actionTitle} will remain visible in past transactions.`,
        desctiption: "",
        callbackAction: onDelete }} />
    </View>
  )
}

export default DeleteBtnSheet;