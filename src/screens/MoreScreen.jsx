import React from 'react'
import { BaseView, HomeHeader } from '@components'
import InfiniteCalendar from 'src/components/calendar/InfiniteCalendar'

const MoreScreen = ({ navigation }) => {
  return (
    <BaseView>
      <HomeHeader navigation={navigation} />
      <InfiniteCalendar/>
    </BaseView>
  )
}

export default MoreScreen