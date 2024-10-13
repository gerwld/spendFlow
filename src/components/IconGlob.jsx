import { icons } from 'lucide-react-native';

const arr = []

const IconGlob = ({ name, color, size }) => {
  const LucideIcon = icons[name];
  const LucideIconFallback = icons["Image"];

  if(LucideIcon) 
    return <LucideIcon color={color} size={size} />;

  return <LucideIconFallback color={color || "gray"} size={size} />;
};

export default IconGlob;