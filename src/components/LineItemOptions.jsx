import React from 'react'
import { Pressable, Text } from 'react-native'
import LineItemView from './styling/LineItemView'
import { useNavigation } from '@react-navigation/native';
import { useCurrentTheme } from 'hooks';



const LineItemOptions = React.memo(({ navTo, title, value, onPress, ...rest }) => {
    const navigation = useNavigation();
    const [themeColors] = useCurrentTheme();

    const content = (
        <LineItemView pl1 rightArrow {...rest}>
            <Text style={{ flex: 1, fontSize: 17, color: themeColors.textColorHighlight || "#000" }}>{title}</Text>
            <Text style={{ marginRight: 5, marginLeft: 2, paddingTop: 0.5, fontSize: 17, fontWeight:"400", color: themeColors.chevronText || "#949dad" }}>{value}</Text>
        </LineItemView>
    )


    if (navTo) return (
        <Pressable onPress={() => navigation.navigate(navTo)}>
            {content}
        </Pressable>
    )
    else if (onPress) return (
        <Pressable onPress={onPress}>
            {content}
        </Pressable>
    )

    return content;
});

export default LineItemOptions