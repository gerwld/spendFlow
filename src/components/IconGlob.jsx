import { icons } from 'lucide-react-native';

const arr = []

const IconGlob = ({ name, color, size, stroke }) => {
  const LucideIcon = icons[name];
  const LucideIconFallback = icons["Image"];

  if(LucideIcon) 
    return <LucideIcon color={color} size={size} strokeWidth={stroke || 1.7} />;

  return <LucideIconFallback color={color || "gray"} size={size} strokeWidth={stroke || 1.7} />;
};

export default IconGlob;