import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BaseView, STHeader } from '@components';
import { useCurrentTheme } from 'hooks';
import AccordionView from 'src/components/styling/AccordionView';


const FAQScreen = ({ navigation }) => {
  const [themeColors] = useCurrentTheme();
  const [currentShow, setShow] = useState(null); // Track the expanded item

  const styles = StyleSheet.create({
    t: {
      color: themeColors.textColorHighlight,
      lineHeight: 20
    },
    animatedView: {
      overflow: 'hidden',
    },
    wrapper: {
      marginHorizontal: 10,
    },
  });


  const SECTIONS = [
    {
      id: "af9b5971-d216-45a8-80a8-303f1a4241f4",
      title: 'First',
      content: <Text style={styles.t}>Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis quod consequatur atque officiis sunt voluptatibus aut perferendis natus similique enim autem neque et reiciendis sapiente nesciunt consectetur deleniti, minus non?...</Text>,
    },
    {
      id: "aa2bb01d-8756-4dee-a39a-fcfe8dd234e2",
      title: 'Second',
      content: <Text style={styles.t}>Lorem ipsum...</Text>,
    },
  ];

  return (
    <BaseView>
      <STHeader title="FAQ" navigation={navigation} />
      <View style={styles.wrapper}>
        <AccordionView items={SECTIONS} />
      </View>
    </BaseView>
  );
};



export default FAQScreen;
