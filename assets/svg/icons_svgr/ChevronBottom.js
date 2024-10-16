import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgChevronBottom = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.style.width || 10}
    height={props.style.height || 7}
    viewBox="0 0 10 7"
    fill="none"
    {...props}
  >
    <Path
      fill="#4F5A78"
      d="M5.778 6.038a1 1 0 0 1-1.556 0L1.12 2.2A1 1 0 0 1 1.898.571h6.204a1 1 0 0 1 .778 1.63z"
    />
  </Svg>
);
export default SvgChevronBottom;
