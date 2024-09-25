import {
  Divider,
  HStack,
  Image,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <Stack marginTop={3} marginRight={130}>
      <HStack
        justifyContent="space-between"
        marginX={5}
        marginRight={10}
        padding="10px"
      >
        <Image src={logo} boxSize={"60px"} marginX={7} />
        <Tabs marginLeft={-10} variant="soft-rounded" colorScheme="yellow">
          <TabList>
            <Tab marginX={3} onClick={() => navigate("")}>
              <motion.div whileHover={{ rotate: -6 }}>Home</motion.div>
            </Tab>
            <Tab
              marginX={3}
              onClick={() => {
                localStorage.removeItem("CurrentPage");
                localStorage.setItem("CurrentPage", "Home");
                navigate("/exhabitations");
                console.log(localStorage.getItem("CurrentPage"));
              }}
            >
              <motion.div whileHover={{ rotate: -6 }}>exhabitations</motion.div>
            </Tab>
            <Tab marginX={3} onClick={() => navigate("/login")}>
              <motion.div whileHover={{ rotate: -6 }}>login/sign up</motion.div>
            </Tab>
          </TabList>
        </Tabs>
        <DarkModeSwitch />
      </HStack>
      <Divider />
    </Stack>
  );
};

export default Nav;
