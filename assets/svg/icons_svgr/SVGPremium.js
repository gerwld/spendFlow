import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
const width = Dimensions.get("window").width;
const SvgAsset1 = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 2"
    height={width / 5}
    style={{marginTop: width * -0.055 - 5}}
    width={width}
    viewBox="0 0 1000 100"
    {...props}
  >
  <Path
      d="M1170 67.14c-161.47 18.5-297.44 16.25-403.94 7.67-147.86-11.9-212.98-33.87-367.5-48.14C242.94 12.31 106.7 15.92 0 24.24v-15h1170v57.91Z"
      data-name="Layer 1"
      style={{
        fill: "#ff8800",
      }}
    />
  </Svg>
);
export default SvgAsset1;
