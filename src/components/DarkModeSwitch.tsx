import { HStack, Icon, Switch, Text, useColorMode } from "@chakra-ui/react";
import { animate, motion } from "framer-motion";
import { useState } from "react";
import { PiMoonStars, PiSun } from "react-icons/pi";

const DarkModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [t,setT]=useState(0);

  return (
    <motion.div 
    transition={{ duration: 0.2 }}
    whileHover={{ scale:1.13}}
    >
      <motion.div
      initial={{rotateZ:t}}
      animate={{rotateZ:t+360}}
      transition={{ duration: 0.5 }}
      >
        <Icon
        marginTop={1}
          boxSize={7}
          as={colorMode === "dark" ? PiMoonStars : PiSun}
          onClick={(value)=>{toggleColorMode(); setT(t+360)}}
          color={colorMode === "dark" ? "blue.400" : "yellow.500"}
        />
      </motion.div></motion.div>
  );
};

export default DarkModeSwitch;
