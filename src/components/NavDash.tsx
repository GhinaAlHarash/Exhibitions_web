import {
  Box,
  Collapse,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";
import logo from "../assets/logo.png";
import { RiSearchEyeLine } from "react-icons/ri";
import { PiBell, PiBellRinging, PiCheckBold } from "react-icons/pi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import resizeWindow from "../services/resizeWindow";
import { useEffect, useRef, useState } from "react";
import useExhSearch from "../hooks/useExhSearch";
import useExhStore from "../stores/useExhStore";
import { TRes } from "../hooks/useSendData";
import { Exh } from "../hooks/useFetchExh";
import useSearchComp from "../hooks/useSearchComp";
import useVisSearch from "../hooks/useVisSearch";
import CustomModal from "./CustomModal";
import useNotification from "../hooks/useNotification";

const NavDash = () => {
  const notification = useNotification();

  const blue = useColorModeValue("#0F2869", "gray.800");
  const white = useColorModeValue("gray.700", "gray.300");
  const whiteB = useColorModeValue("gray.300", "gray.300");
  const whiteDrawer = useColorModeValue("gray.100", "gray.700");
  const [open, setOpen] = useState(false);
  const [openNotific, setopenNotific] = useState(false);
  const { width, height } = resizeWindow();
  const refname = useRef<HTMLInputElement>(null);
  const Exhs = useExhSearch();
  const companies = useSearchComp();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [touch, setTouch] = useState(false);
  const visitors = useVisSearch();

  return (
    <>
      <HStack justifyContent="space-between" paddingX="10px" paddingY={2}>
        <HStack>
          <Image src={logo} boxSize={"45px"} />

          {localStorage.getItem("CurrentPage") == "exhabitations" ||
          localStorage.getItem("CurrentPage") == "ExhSearch" ||
          localStorage.getItem("CurrentPage") == "all companies" ||
          localStorage.getItem("CurrentPage") == "compSearch" ||
          localStorage.getItem("CurrentPage") == "visitors" ||
          localStorage.getItem("CurrentPage") == "visSearch" ? (
            <>
              <motion.div
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.13 }}
              >
                <Icon
                  as={RiSearchEyeLine}
                  color={"white"}
                  bgColor={blue}
                  borderRadius={100}
                  boxSize={9}
                  padding={2}
                  marginLeft={5}
                  marginTop={2}
                  marginBottom={-1}
                  onClick={() => {
                    setOpen(!open);
                  }}
                />
              </motion.div>{" "}
              {
                <Collapse in={open} >
                  <InputGroup size="md" paddingTop={1}>
                    <Input
                      ref={refname}
                      type="text"
                      variant="filled"
                      placeholder="search exhabitations"
                      
                      width={width / 1.83}
                      onChange={(e) => {
                        if (
                          localStorage.getItem("CurrentPage") ==
                            "exhabitations" ||
                          localStorage.getItem("CurrentPage") == "ExhSearch"
                        )
                          Exhs.mutate({ title: e.target.value });
                        else if (
                          localStorage.getItem("CurrentPage") ==
                            "all companies" ||
                          localStorage.getItem("CurrentPage") == "compSearch"
                        )
                          companies.mutate({ name: e.target.value });
                        else visitors.mutate({ name: e.target.value });
                      }}
                    />
                  </InputGroup>
                </Collapse>
              }
            </>
          ) : (
            <></>
          )}
        </HStack>
        {!(open && width < 768) && (
          <HStack marginRight={4} marginTop={1}>
            <motion.div whileHover={{ rotateZ: 25 }}>
              <Icon
                as={notification.data?.data.length ? PiBellRinging : PiBell}
                color={notification.data?.data.length ? "red.500" : white}
                borderRadius={100}
                boxSize={6}
                marginTop={1}
                marginRight={3}
                onClick={() => onOpen()}
              />
            </motion.div>
            <DarkModeSwitch />{" "}
          </HStack>
        )}
      </HStack>
      <Divider />
      {isOpen && (
        <Drawer
          isOpen={isOpen}
          size={"sm"}
          placement="right"
          onClose={() => {
            setTimeout(() => setTouch(false), 500);
            onClose();
            console.log(isOpen + "inclose");
          }}
        >
          <DrawerContent
            overflow={"auto"}
            margin={14}
            marginTop={16}
            paddingBottom={5}
            maxHeight={500}
            height={"fit-content"}
            borderRadius={20}
            bgColor={whiteDrawer}
          >
            <DrawerHeader>Notification </DrawerHeader>

            <Divider borderColor={whiteB} />
            <DrawerBody>
              <Text marginTop={5} fontSize={17}>
                {notification.data?.data.map((info, index) => (
                  <Box key={index}>
                    <Text color={"yellow.500"} fontSize={14}>
                      <b>{info.data}</b><br/>
                      <Text style={{fontSize:12, marginLeft:310, color:'black'}} marginTop={2} marginBottom={-2}>mark as read</Text>
                    </Text>
                    {(
                      <Divider borderColor={whiteB} marginTop={8} />
                    )}
                    </Box>
                ))}
              </Text>
              
                    <Text fontSize={12} marginTop={3} marginLeft={5} paddingBottom={5}  marginRight={-5}   marginBottom={-2}><Box  marginBottom={-4} marginLeft={-5} boxSize={4} bgColor={'gray.300'}/>mark all as read</Text>
                  
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default NavDash;
