
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

const setTransfluentBar = () => {
    if(Platform.OS === "android") {
      // NavigationBar.setPositionAsync('absolute')
      // transparent backgrounds to see through
      
      NavigationBar.setBackgroundColorAsync('#ffffff00')
      // changes the color of the button icons "dark||light"
      // NavigationBar.setButtonStyleAsync("light");
    }
  } 
  export default setTransfluentBar;