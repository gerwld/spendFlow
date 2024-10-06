import React from "react";
import { View } from "react-native";
import Svg, {
  Circle,
  G,
  Defs,
  RadialGradient,
  Stop,
  Text,
} from "react-native-svg";

const DonutChart = ({ segments, gapSize = 0.5, centerText = "$1244", centerTextColor }) => {
  const size = 190; // size of the donut chart
  const strokeWidth = 40; // width of the donut
  const radius = (size - strokeWidth) / 2; // radius of the circle
  const outerRadius = size / 2; // outer radius including the stroke width
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  let cumulativePercentage = 0; // To track the cumulative percentage for each segment

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor="#ffffff00" stopOpacity="0" />
            <Stop
              offset={100 - strokeWidth + 2 + "%"}
              stopColor="#ffffff00"
              stopOpacity="0"
            />
            <Stop
              offset={100 - strokeWidth + 5 + "%"}
              stopColor="#ffffff"
              stopOpacity="0.4"
            />
            <Stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </RadialGradient>
        </Defs>
        <G rotation="90" origin={`${size / 2}, ${size / 2}`}>
          {/* Iterate over segments to draw each portion */}
          {segments.map((segment, index) => {
            const { color, percentage } = segment;
            const startOffset = (circumference * cumulativePercentage) / 100; // Where the segment starts
            const segmentLength =
              (circumference * (percentage - gapSize)) / 100; // Adjust segment length to account for the gap
            cumulativePercentage += percentage; // Update cumulative percentage for the next segment

            return (
              <Circle
                key={index}
                stroke={color}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentLength} ${circumference}`} // Adjust the segment length and make use of the full circumference
                strokeDashoffset={-startOffset} // Offset for correct positioning
                strokeLinecap="butt" // Change to 'round' if you want rounded edges
                fill="transparent"
              />
            );
          })}
        </G>
        {/* Radial gradient overlay */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={outerRadius} // Set radius to outerRadius to cover the entire donut chart
          fill="url(#grad)" // Apply the radial gradient
        />

        <Text
          x={size / 2 - 1}
          y={(size / 2) + (size / 21)}
          origin={`${size / 2}, ${size / 2}`}
          rotation="90"
          fontSize={size / 8.8}
          fontWeight={500}
          fill={centerTextColor || "black"}
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          {centerText}
        </Text>
      </Svg>
    </View>
  );
};

export default DonutChart;
