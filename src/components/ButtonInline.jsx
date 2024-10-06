import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const ButtonInline = ({ children, text, alignEnd }) => {
  const styles = StyleSheet.create({
    hb: {
      flex: 1,
      alignItems: alignEnd ? "flex-end" : "flex-start"
    },
    back: {
      padding: 10,
    },
  });
  return (
    <View style={styles.hb}>
      <TouchableOpacity style={styles.back}>
    
        {text ? <Text>{text}</Text> : null}
        {children ? children : null}

      </TouchableOpacity>
    </View>
  );
};

export default ButtonInline;
