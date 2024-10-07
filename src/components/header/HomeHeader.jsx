import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Add2, Gear3, SvgLogoInline } from '@icons';
import { useCurrentTheme, useHeaderStyles } from 'hooks';

export const HomeHeader = React.memo(({ navigation, leftChild, rightChild }) => {

   const {headerStyles,
    HEADER_HEIGHT_SAFE,
    headerGradientStart,
    headerGradientEnd} = useHeaderStyles();
    
    const [themeColors] = useCurrentTheme();


    const styles = StyleSheet.create({
        headerButton: {
            flexShrink: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: HEADER_HEIGHT_SAFE,
            width: 55,
        },
        headerBalance: {
            color: themeColors.textColorHighlight,
            fontSize: 24,
            fontWeight: '600',
        },
        headerBalanceSup: {
            color: themeColors.textColor,
            fontSize: 15,
            fontWeight: '400',
        }
    });
    
    return (
    <View style={headerStyles.header}>
        {/* <LinearGradient
            colors={[headerGradientStart || '#9ad7ff', headerGradientEnd || '#3c95d0']}
            start={{ x: 0.2, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={headerStyles.header}
        > */}
            <View style={headerStyles.headerContent}>
                <View style={headerStyles.leftComponent}>
                    {leftChild ? leftChild : (
                        <Pressable style={styles.headerButton} onPress={() => navigation.navigate('settings')}>
                                <Gear3 width={33} height={33} color={themeColors.textColorHighlight}/>
                        </Pressable>
                    )}
                </View>
                <View style={headerStyles.centerComponent}>
                    <Text style={styles.headerBalanceSup}>Total balance</Text>
                    <Text style={styles.headerBalance}>400 PLN</Text>
                </View>
                <View style={headerStyles.rightComponent}>
                    {rightChild ? rightChild : (
                        <Pressable style={headerStyles.headerButton} onPress={() => navigation.navigate('addhabit')}>
                                <Add2 width={47} height={46} color={themeColors.textColorHighlight}/>
                        </Pressable>
                    )}
                </View>
            </View>
        {/* </LinearGradient> */}
        </View>

    );
});

