
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

const setTransfluentBar = async () => {
    if(Platform.OS === "android") {
      // NavigationBar.setPositionAsync('absolute')
      // transparent backgrounds to see through
      
    await  NavigationBar.setBackgroundColorAsync('#ffffff')
      // changes the color of the button icons "dark||light"
      NavigationBar.setButtonStyleAsync("dark");
    }
  } 
  export default setTransfluentBar;