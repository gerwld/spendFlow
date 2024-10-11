import { View, Text } from 'react-native'
import React from 'react'
import BottomSheetExperimental from './BottomSheetExperimental'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const AddOperationSheet = ({isOpen, toggleSheet}) => {

  return (
    <BottomSheetExperimental isOpen={isOpen} toggleSheet={toggleSheet}>
      <ScrollView>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      <Text>dfbfbfbdfb</Text>
      </ScrollView>
    </BottomSheetExperimental>
  )
}

export default AddOperationSheet