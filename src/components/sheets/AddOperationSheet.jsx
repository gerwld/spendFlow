import { Text, Platform } from 'react-native'
import React from 'react'
import BottomSheetExperimental from './BottomSheetExperimental'
import { ScrollView } from 'react-native-gesture-handler'
import BottomSheet from './BottomSheet'
import { useCurrentTheme } from 'hooks'

const AddOperationSheet = ({ isOpen, toggleSheet }) => {
  const [themeColors] = useCurrentTheme();

  const renderContent = (
    <ScrollView>
      
    </ScrollView>
  )
















  return Platform.OS === "ios" || Platform.OS === "web"
  
    ? <BottomSheetExperimental isOpen={isOpen} toggleSheet={toggleSheet} backgroundColor={themeColors.bgHighlight}>
      {renderContent}
    </BottomSheetExperimental>

    : <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet} backgroundColor={themeColors.bgHighlight}>
      {renderContent}
    </BottomSheet>

}

export default AddOperationSheet