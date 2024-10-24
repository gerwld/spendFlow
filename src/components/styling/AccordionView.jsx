
import { useCurrentTheme } from 'hooks';
import { LucideChevronDown, LucideChevronUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';


const AccordionView = ({items}) => {
  const SECTIONS = items;
  const [activeSections, setActiveSections] = useState([]);
  const [themeColors] = useCurrentTheme();
  

  const renderHeader = (section) => {
    const isActive = SECTIONS.indexOf(section) === activeSections[0];
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
        
        {isActive ? <LucideChevronUp size={22} color={themeColors.chevron}/> : <LucideChevronDown size={22} color={themeColors.chevron}/>}
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        {section.content}
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  const styles = StyleSheet.create({
    header: {
      backgroundColor: themeColors.bgHighlight,
      paddingVertical: 14,
      paddingHorizontal: 15,
      borderRadius: 10,
      marginBottom: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    headerText: {
      fontSize: 16,
      fontWeight: '500',
      color: themeColors.textColorHighlight
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 5,
      paddingBottom: 20,
    },
  });

  return (
    <Accordion
      sections={SECTIONS}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSections}
    />
  );
};



export default AccordionView;


