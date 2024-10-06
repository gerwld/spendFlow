import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgBack = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size|| 24}
    height={props.size|| 24}
    viewBox="0 0 17.9 32"
    {...props}
  >

<Path 
 fill="currentColor"
d="M4.7,16l9.8,9.8c0.3,0.3,0.5,0.7,0.5,1.2c0,0.4-0.2,0.8-0.5,1.2c-0.3,0.3-0.7,0.5-1.2,0.5c-0.4,0-0.8-0.2-1.2-0.5L1.9,17.9
	c-0.3-0.3-0.5-0.6-0.6-0.9s-0.2-0.7-0.2-1s0.1-0.7,0.2-1c0.1-0.3,0.3-0.6,0.6-0.9L12.2,3.8c0.3-0.3,0.7-0.5,1.2-0.5
	c0.5,0,0.9,0.2,1.2,0.5C14.9,4.2,15,4.6,15,5c0,0.4-0.2,0.8-0.5,1.2L4.7,16z"/>
  </Svg>
);
export default SvgBack;
