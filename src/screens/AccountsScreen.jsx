import React from 'react'
import { BaseView, HomeHeader } from '@components'

const AccountsScreen = ({navigation}) => {
  return (
    <BaseView>
      <HomeHeader navigation={navigation} />
      {/* <MonthGeneral/> */}
      {/* <ExpensesSub/> */}
    </BaseView>
  )
}

export default AccountsScreen