import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Link,
  useDisclosure,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import successlog from "../assets/successlog.gif";
import resizeWindow from "../services/resizeWindow";
import useLogin from "../hooks/useLogin";
import ForgetPassword from "./ForgetPassword";
import CustomModal from "./CustomModal";

interface Props {
  close: (n: string) => void;
}
const LoginForm = ({ close }: Props) => {
  const loginUser = useLogin();

  const [cnt, setCnt] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { width, height } = resizeWindow();
  const refEmail = useRef<HTMLInputElement>(null);
  const refpassworrd = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [open, setopen] = useState(false);
  const [passWarning, setPassWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);

  useEffect(() => {
    if (loginUser.data?.status == 200) {
      localStorage.removeItem("CurrentExh");
      setSuccess(true);
      console.log(localStorage.getItem("useroles"));
      setTimeout(() => {
        setopen(true);
      }, 1000);
      setTimeout(() => {
        if (loginUser.data?.data.roles[0] === "admin") {
          localStorage.removeItem("CurrentPage");
          localStorage.setItem("CurrentPage", "employees");
          localStorage.removeItem("clicked");
          localStorage.setItem("clicked", "1");
          navigate("/dash/employees");
        } else if (loginUser.data?.data.id === 2) {
          localStorage.removeItem("CurrentPage");
          localStorage.setItem("CurrentPage", "all companies");
          localStorage.removeItem("clicked");
          localStorage.setItem("clicked", "2");
          navigate("/dash/companies");
        } else {
          localStorage.removeItem("CurrentPage");
          localStorage.setItem("CurrentPage", "exhabitations");
          localStorage.removeItem("clicked");
          localStorage.setItem("clicked", "0");
          navigate("/dash/exhabitations");
        }
      }, 4000);
    } else if (!cnt && loginUser.data?.status) {
      setCnt(true);
      onOpen();
    }
  }, [loginUser]);

  return (
    <>
      {!open && (
        <motion.div
          initial={false}
          animate={{ height: success ? 0 : "auto" }}
          transition={{ duration: 0.5 }}
          style={{ overflow: "hidden" }}
        >
          <Stack
            spacing={(5 * height) / 100}
            padding={(5 * width) / 100}
            width={{ md: width / 2.5, base: width }}
            marginBottom={5}
          >
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: -200 }}
              transition={{ duration: 0.9 }}
            >
              <Text textColor="darkblue" fontSize="30px" marginBottom={"20px"}>
                {" "}
                Welcome!
              </Text>
            </motion.div>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={MdAlternateEmail} color="gray.500" />
              </InputLeftElement>
              <Input
                ref={refEmail}
                type="email"
                variant="flushed"
                borderColor={"gray.400"}
                placeholder="Email"
                onChange={(e) => {
                  if (
                    !e.target.value.match(
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    )
                  ) {
                    setEmailWarning(true);
                    setDisabled(true);
                  } else {
                    setEmailWarning(false);
                    setDisabled(false);
                  }
                }}
              />
            </InputGroup>
            {emailWarning && (
              <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                invalid Email
              </p>
            )}

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={TbPasswordUser} color="gray.500" />
              </InputLeftElement>
              <Input
                ref={refpassworrd}
                type="password"
                variant="flushed"
                borderColor={"gray.400"}
                placeholder="Password"
                onChange={(e) => {
                  if (e.target.value.length < 8) {
                    setPassWarning(true);
                    setDisabled(true);
                  } else {
                    setPassWarning(false);
                    setDisabled(false);
                  }
                }}
              />
            </InputGroup>
            {passWarning && (
              <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                password must be atleast 8 characters
              </p>
            )}

            <ForgetPassword />

            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                width={"100%"}
                colorScheme={disabled ? "gray" : "yellow"}
                textColor={disabled ? "black" : "white"}
                marginTop={"-10px"}
                isDisabled={disabled}
                onClick={() => {
                  setCnt(false);
                  event?.preventDefault();
                  if (
                    refEmail.current &&
                    refEmail.current?.value &&
                    refpassworrd.current &&
                    refpassworrd.current.value
                  ) {
                    loginUser.mutate({
                      email: refEmail.current?.value,
                      password: refpassworrd.current?.value,
                    });
                  }
                }}
              >
                login
              </Button>
            </motion.div>
            <Stack
              placeContent={"center"}
              textAlign={"center"}
              marginBottom={{md:-16, base:-10}}
              marginTop={6}
            >
              <motion.div whileHover={{ scale: 1.12 }}>
                <Link
                  onClick={() => close("E")}
                  textColor="blue.500"
                  fontSize="15px"
                >
                  {" "}
                  Signup as Orginazer
                </Link>
              </motion.div>
              <Box
                position="relative"
                paddingX="20"
                marginY={1.5}
                marginTop={2.5}
              >
                <Divider borderColor="grey" />
                <AbsoluteCenter
                  bg="white"
                  textColor="grey"
                  px="4"
                  marginTop={-0.5}
                >
                  or
                </AbsoluteCenter>
              </Box>

              <motion.div whileHover={{ scale: 1.12 }}>
                <Link
                  onClick={() => close("C")}
                  textColor="blue.500"
                  fontSize="15px"
                >
                  {" "}
                  Signup as Company
                </Link>
              </motion.div>
            </Stack>
          </Stack>
        </motion.div>
      )}
      {open && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.5 }}
          style={{ overflow: "hidden" }}
        >
          <Box width={{ md: width / 2.5, base: width }}>
            <Image
              src={successlog}
              boxSize={{ md: "250px", base: width / 2 }}
              borderRadius={300}
              marginLeft={{
                xl: width / 10,
                lg: width / 15,
                md: width / 33,
                base: width / 4,
              }}
            />
          </Box>
        </motion.div>
      )}
      {isOpen && cnt && (
        <CustomModal
          buttonLabel={"Ops!"}
          isOpen={isOpen}
          onClose={() => {
            onClose();
          }}
          colorLight="gray.400"
          colorDark="#333333"
        >
          <Text textColor={"red"} marginTop={-3} marginBottom={3}>
            {loginUser.data?.message}{" "}
          </Text>
        </CustomModal>
      )}
    </>
  );
};

export default LoginForm;
