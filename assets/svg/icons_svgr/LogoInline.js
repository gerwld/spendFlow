import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgLogoInline = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 93.6 19.1"
    {...props}
    width={props.size ? props.size * 4 : 140}
    height={props.size ? props.size : 40}
  >
    <Path
      d="M2.1 12.6c.2.3.4.5.7.7q.45.3.9.3c.3.1.7.1 1.1.1.3 0 .6 0 .9-.1s.6-.1.9-.2.5-.3.6-.5c.2-.2.3-.5.3-.8 0-.5-.2-.8-.5-1.1-.4-.2-.8-.4-1.3-.6-.7-.1-1.3-.3-1.9-.4s-1.2-.3-1.7-.5c-.6-.2-1-.5-1.3-.9C.4 8.2.2 7.7.2 7c0-.5.1-1 .4-1.4.2-.4.6-.7.9-1s.8-.4 1.3-.5 1-.2 1.4-.2c.7 0 1.3 0 1.8.1s1 .3 1.4.5c.4.3.7.6 1 1 .2.4.4 1 .4 1.6H7q0-.45-.3-.9c-.2 0-.4-.2-.6-.3-.2-.2-.5-.3-.8-.3-.3-.1-.6-.1-.9-.1s-.5 0-.8.1-.5 0-.7.1-.4.3-.6.5c-.1.1-.2.4-.2.6 0 .3.1.6.3.8.3.2.5.4.9.5.3.1.7.3 1.1.4s.8.2 1.3.3c.4 0 .9.2 1.3.3s.8.3 1.1.6c.3.2.6.5.8.9.2.3.3.8.3 1.3 0 .7-.1 1.2-.4 1.6s-.6.8-1.1 1.1q-.6.45-1.5.6c-.6.1-1.1.2-1.6.2-.6 0-1.2-.1-1.7-.2s-1-.3-1.4-.6-.8-.7-1-1.1c-.3-.5-.4-1-.4-1.7h1.8c-.1.2 0 .5.2.8M12 4.1v1.5c.3-.6.8-1 1.4-1.3s1.3-.4 2.1-.4 1.6.2 2.2.5 1.1.7 1.6 1.2q.6.75.9 1.8c.2.7.3 1.4.3 2.2s-.1 1.5-.3 2.2q-.3 1.05-.9 1.8c-.6.75-.9.9-1.6 1.2-.6.3-1.3.4-2.2.4-.3 0-.6 0-.9-.1s-.7-.1-1-.3c-.3-.1-.6-.3-.9-.5s-.5-.5-.7-.8v5.6h-1.8v-15zM18.4 8c-.1-.5-.3-.9-.6-1.3s-.6-.7-1-.9q-.6-.3-1.5-.3c-.6 0-1.1.1-1.5.4s-.8.5-1 .9-.5.8-.6 1.3-.2 1-.2 1.5.1 1 .2 1.5.3.9.6 1.3.6.7 1.1.9c.4.2 1 .3 1.6.3s1.1-.1 1.5-.4c.4-.2.7-.6 1-.9.3-.4.4-.8.5-1.3s.2-1 .2-1.6c-.1-.4-.2-.9-.3-1.4M29.2 14.3c-.8.6-1.8.9-3.1.9-.9 0-1.6-.1-2.3-.4-.6-.3-1.2-.7-1.6-1.2s-.8-1.1-1-1.8-.3-1.5-.4-2.3c0-.8.1-1.6.4-2.3s.6-1.3 1.1-1.8 1-.9 1.6-1.2 1.3-.4 2-.4q1.5 0 2.4.6c.8.5 1.3 1 1.7 1.6s.7 1.3.8 2 .2 1.4.2 2.1h-8.1c0 .5 0 .9.2 1.4s.3.8.6 1.1.6.6 1.1.8q.6.3 1.5.3c.8 0 1.4-.2 1.9-.5s.8-.9 1-1.6H31q-.6 1.8-1.8 2.7m-.4-7c-.2-.4-.4-.7-.7-1s-.6-.5-1-.7-.7-.1-1.1-.1c-.5 0-.9.1-1.2.2s-.7.4-1 .7-.5.6-.6 1c-.2.4-.2.8-.3 1.2h6.2c0-.5-.1-.9-.3-1.3M33.5 4.1v1.7c.7-1.3 1.9-2 3.5-2q1.05 0 1.8.3c.75.3.9.5 1.2.9q.45.6.6 1.2c.1.5.2 1 .2 1.6V15H39V7.6c0-.6-.2-1.2-.6-1.6s-.9-.6-1.6-.6c-.5 0-1 .1-1.4.3s-.7.4-1 .7-.5.7-.6 1.1-.2.9-.2 1.4V15h-1.8V4.1zM50.3 15v-1.5c-.3.6-.8 1-1.4 1.3s-1.3.4-2.1.4-1.6-.2-2.2-.5-1.1-.7-1.6-1.2q-.6-.75-.9-1.8c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2.5-1.3.9-1.8c.5-.5 1-.9 1.6-1.2s1.3-.5 2.2-.5c.3 0 .6 0 .9.1s.6.2 1 .3.6.3.9.5.5.5.7.8V0h1.8v15zm-6.4-3.9c.1.5.3.9.6 1.3s.6.7 1.1.9q.6.3 1.5.3c.6 0 1.1-.1 1.5-.4s.8-.5 1-.9c.3-.4.5-.8.6-1.3s.2-1 .2-1.5-.1-1-.2-1.5-.3-.9-.6-1.3-.6-.7-1.1-.9c-.4-.2-1-.3-1.6-.3s-1.1.1-1.5.4-.8.6-1 .9c-.3.4-.4.8-.5 1.3s-.2 1-.2 1.6c0 .5.1 1 .2 1.4M63.9 0v1.7H56v4.8h7v1.7h-6.9V15h-2V0zM66.7 0v15h-1.8V0zM68.2 7.3c.2-.7.6-1.3 1-1.8s1-.9 1.7-1.2 1.4-.4 2.3-.4 1.6.1 2.3.4c.5.3 1.1.7 1.5 1.2s.8 1.1 1 1.8.3 1.4.3 2.2-.1 1.5-.3 2.2-.6 1.3-1 1.8-1 .9-1.6 1.2c-.7.3-1.4.4-2.3.4s-1.6-.1-2.3-.4-1.2-.7-1.7-1.2c-.4-.5-.8-1.1-1-1.8s-.3-1.4-.3-2.2.1-1.5.4-2.2m1.8 4c.2.5.4.9.7 1.3.3.3.7.6 1.1.8s.9.3 1.3.3.9-.1 1.3-.3.8-.4 1.1-.8c.3-.3.5-.8.7-1.3s.3-1.1.3-1.8-.1-1.2-.3-1.8c-.2-.5-.4-.9-.7-1.3-.3-.3-.7-.6-1.1-.8s-.9-.3-1.3-.3-.9.1-1.3.3-.8.4-1.1.8-.5.8-.7 1.3q-.3.75-.3 1.8t.3 1.8M88.3 15l-2.2-8.6-2.2 8.6H82L78.4 4.1h2l2.5 8.9 2.2-8.9h2l2.3 8.9 2.4-8.9h1.8L90.2 15z"
      style={{
        fill: props?.style?.color ? props.style.color : props.color || "#ffffff",
      }}
    />
  </Svg>
);
export default SvgLogoInline;
