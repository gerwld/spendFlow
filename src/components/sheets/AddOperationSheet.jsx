import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet from './BottomSheet'
import { useCurrentTheme } from 'hooks';
import { useNavigation } from '@react-navigation/native'

const AddOperationSheet = ({ isOpen, toggleSheet }) => {
  const [themeColors] = useCurrentTheme();
  const navigation = useNavigation();

  console.log(navigation.setOptions);
  
  return (
    <BottomSheet
      backgroundColor={themeColors.bgHighlight}
      isOpen={isOpen}
      toggleSheet={toggleSheet}>
      <Text>dsvsdv</Text>
    </BottomSheet>
  )
}

export default AddOperationSheet