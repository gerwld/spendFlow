import React from 'react'
import { BaseView, HomeHeader } from '@components'

const OperationsScreen = ({ navigation }) => {
  return (
    <BaseView>
      <HomeHeader navigation={navigation} />
      {/* <MonthGeneral/> */}
      {/* <ExpensesSub/> */}
    </BaseView>
  )
}

export default OperationsScreen