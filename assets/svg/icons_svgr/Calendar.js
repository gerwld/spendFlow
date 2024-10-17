import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const SvgCalendar = (props) => {
  const color = props?.style?.color || "#4F5A78";
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.style.width || 14}
    height={props.style.height || 11}
    viewBox="0 0 14 11"
    fill="none"
    {...props}
  >
    <Rect width={13} height={10} x={0.5} y={0.5} stroke={color} rx={2.5} />
    <Path fill={color} stroke={color} strokeWidth={1.4} d="M1.5 1.5h11v2h-11z" />
  </Svg>
)};
export default SvgCalendar;
