import React from 'react'
import { Platform, Pressable, StyleSheet, Switch, View } from 'react-native';
import styled from 'styled-components/native';


import { useCurrentTheme } from 'hooks';
import Toggle from '../Toggle';
import { ChevronRight, SvgFront } from '@icons';
import { PLATFORM } from '@constants';

const LineItemView = React.memo(({ onPress,isFirstItem, isLastItem, leftIcon, children, rightArrow, toggle, toggleColor, onToggle, isEnabled, pl1, st }) => {
    const [themeColors] = useCurrentTheme();
    const LineItemViewItem = styled.View`
        padding: 0;
        padding-bottom: 1px;
        align-items:center;
        justify-content:space-between;
        flex-direction: row;
        /* background-color: ${pl1 ? themeColors.bgHighlight : "transparent"}; */
    `;

 //themeColors.borderColor

 const styles = StyleSheet.create({
    group: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 53,
        paddingRight: 5,
        borderBottomColor: themeColors.borderColor,
        borderBottomWidth: 1
    }
 })

    const content = (
        <LineItemViewItem style={[{ 
                borderTopLeftRadius: isFirstItem ? 12 : 0, 
                borderTopRightRadius: isFirstItem ? 12 : 0, 
                borderBottomLeftRadius: isLastItem ? 12 : 0, 
                borderBottomRightRadius: isLastItem ? 12 : 0, 
                paddingLeft: pl1 ? 15 : 0, 
                marginBottom: pl1 ? 0 : 7, 
                ...st 
            }, 
            !pl1 && {borderTopWidth: 0, borderTopWidth: 0}]}>
            {leftIcon ? <View style={{ height: 30, width: 30, marginRight: 12 }}>{leftIcon}</View> : null}

            <View style={[styles.group, isLastItem && {borderBottomWidth: 0, marginTop: -1, borderTopWidth: 0}]}>
                {leftIcon ? <View style={{ flex: 1, flexDirection: "row" }}>{children}</View> : children}
                {rightArrow ? <SvgFront style={{ marginLeft: 2, marginRight: 10, marginTop: 1}} size={17} color={themeColors.chevron} /> : null}
            </View>
            {toggle ?
                PLATFORM === "ios"
                    ? <Switch
                        style={{ marginRight: 10 }}
                        trackColor={{ false: '#d7dcde', true: (toggleColor ? toggleColor : '#81b0ff') }}
                        thumbColor={"#ffffff"}
                        ios_backgroundColor={themeColors.thumbBackgroundIos}
                        onValueChange={onToggle ? onToggle : null}
                        value={isEnabled}
                        {...Platform.select({
                            web: {
                                activeThumbColor: "white"
                            }
                        })}
                    />
                    : <Toggle
                        style={{ marginRight: 10 }}
                        toggleColor={(toggleColor ? toggleColor : '#81b0ff')}
                        backgroundColor={themeColors.thumbBackground}
                        onToggle={() => onToggle(!isEnabled)}
                        value={isEnabled}
                    />
                : null}
        </LineItemViewItem>
    );

    if(onPress) return <Pressable onPress={onPress}>{content}</Pressable>
    return content;

});



export default LineItemView;