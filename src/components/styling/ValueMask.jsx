import { useCurrentTheme } from "hooks";
import { Text } from "react-native";


const ValueMask = ({value, type, style}) => {
  const [themeColors] = useCurrentTheme();
  let color;
  let formattedValue = value;

  switch (type) {
    case "OPERATION_TYPE_EXPENSE":
      color = themeColors.red;
      formattedValue = "-" + value;
      break;
    case "OPERATION_TYPE_INCOME":
      color = themeColors.green;
      formattedValue = "+" + value;
      break;
    case "OPERATION_TYPE_operation":
      color = themeColors.gray;
      break;
    default:
      color = themeColors.textColorHighlight; // Fallback color
  }

  return (
    <Text style={[{ color: color }, style]}>
      {formattedValue}
    </Text>
  );
};

export default ValueMask;