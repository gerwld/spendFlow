import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { useCurrentTheme, useHeaderStyles } from "hooks";
import { AlignJustify } from "lucide-react-native";
import { PencilIcon } from "lucide-react-native";

export const HomeHeader = React.memo(
  ({ navigation, leftChild, rightChild }) => {
    const [themeColors] = useCurrentTheme();
    const { headerStyles, HEADER_HEIGHT_SAFE } = useHeaderStyles();

    const styles = StyleSheet.create({
      headerButton: {
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: HEADER_HEIGHT_SAFE,
        minHeight: 55,
        width: 55,
      },
      headerBalance: {
        color: themeColors.textColorHighlight,
        fontSize: 24,
        lineHeight: 24,
        fontWeight: "600",
      },
      headerBalanceSup: {
        color: themeColors.textColor,
        fontSize: 15,
        fontWeight: "400",
        lineHeight: 15,
        marginBottom: 3,
      },
    });

    return (
      <View style={headerStyles.header}>
        <View style={headerStyles.headerContent}>
          <View style={headerStyles.leftComponent}>
            {leftChild ? (
              leftChild
            ) : (
              <Pressable
                style={styles.headerButton}
                onPress={() => navigation.navigate("settings")}
              >
                <AlignJustify
                  style={{ marginLeft: 1, marginTop: 1, alignSelf: "center" }}
                  width={31}
                  height={55}
                  strokeWidth={2.1}
                  stroke={themeColors.textColorHighlight}
                />
              </Pressable>
            )}
          </View>
          <View style={headerStyles.centerComponent}>
            <Text style={styles.headerBalanceSup}>Total balance</Text>
            <Text style={styles.headerBalance}>400 PLN</Text>
          </View>
          <View style={headerStyles.rightComponent}>
            {rightChild ? (
           rightChild(headerStyles.headerButton, themeColors.textColorHighlight)
            ) : (
              <Pressable
                style={headerStyles.headerButton}
                onPress={() => navigation.navigate("addhabit")}
              >
                <PencilIcon
                  style={{ marginLeft: 1, marginTop: 0, alignSelf: "center" }}
                  width={25}
                  height={55}
                  strokeWidth={2.1}
                  stroke={themeColors.textColorHighlight}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  }
);
