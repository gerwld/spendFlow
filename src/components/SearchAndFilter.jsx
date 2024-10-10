import React from 'react'
import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import { LucideSearch } from 'lucide-react-native';
import { LucideFilter } from 'lucide-react-native';
import { useCurrentTheme } from 'hooks';

const SearchAndFilter = () => {
  const [themeColors] = useCurrentTheme();
  const [inputValue, setInputValue] = React.useState("");
  const styles = StyleSheet.create({
    block: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "center",
      marginLeft: 18,
      marginRight: 4,
      marginTop: -4
    },
    input: {
      height: 37,
      paddingLeft: 40,
      borderWidth: 1.2,
      borderColor: themeColors.borderColorSec,
      borderRadius: 10
    },
    inputParent: {
      flex: 1,
      minWidth: 300,
      height: 36,
    },
    inputIcon: {
      position: "absolute",
      top: 4,
      left: 4,
    },
    filterButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    t: {

    },
  });

  return (
    <View style={styles.block}>
      <View style={styles.inputParent}>
        <LucideSearch
          style={styles.inputIcon}
          stroke={themeColors.borderColorTh}
          width="28" height="28" />
        <TextInput
          editable
          numberOfLines={1}
          onChangeText={setInputValue}
          value={inputValue}
          style={styles.input}
        />
      </View>
      <Pressable style={styles.filterButton}>
        <LucideFilter
          stroke={themeColors.tabsActiveColor}
          width="24"
          height="24" />
      </Pressable>
    </View>
  )
}

export default SearchAndFilter