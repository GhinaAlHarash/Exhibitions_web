import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { RiPhoneLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import register from "../assets/register.gif";
import resizeWindow from "../services/resizeWindow";
import useRegister from "../hooks/useRegister";

interface Props {
  close: () => void;
}

const RegisterForm = ({ close }: Props) => {
  const RegisterUser = useRegister();
  const [disabled, setDisabled] = useState(true);

  const { width, height } = resizeWindow();

  // refs
  const refEmail = useRef<HTMLInputElement>(null);
  const refpassworrd = useRef<HTMLInputElement>(null);
  const refname = useRef<HTMLInputElement>(null);
  const refpassword_confirmation = useRef<HTMLInputElement>(null);
  const refphone = useRef<HTMLInputElement>(null);

  // warnings
  const [passWarning, setPassWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [nameWarning, setNameWarning] = useState(false);
  const [password_confirmationWarning, setPassword_confirmationWarning] =
    useState(false);
  const [phoneWarning, setPhoneWarning] = useState(false);

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [open, setopen] = useState(false);

  useEffect(() => {
    if (RegisterUser.data?.status == 200) {
      setSuccess(true);
      setTimeout(() => {
        setopen(true);
      }, 1000);
      setTimeout(() => {
        navigate("/dash");
      }, 4000);
    }
  }, [RegisterUser]);

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
            marginTop={-10}
            spacing={(4 * height) / 100}
            padding={(5 * width) / 100}
            width={{ md: width / 2.5, base: width }}
          >
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: -200 }}
              transition={{ duration: 0.9, delay:0.7 }}
            >
              <Text textColor="darkblue" fontSize="30px" marginBottom={"20px"} marginTop={3}>
                {" "}
                Welcome!
              </Text>
            </motion.div>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={RiAccountCircleLine} color="gray.500" />
              </InputLeftElement>
              <Input
                ref={refname}
                type="text"
                variant="flushed"
                borderColor={"gray.400"}
                placeholder="name"
                onChange={(e) => {
                  if (!e.target.value) {
                    setNameWarning(true);
                    setDisabled(true);
                  } else {
                    setNameWarning(false);
                    setDisabled(false);
                  }
                }}
              />
            </InputGroup>
            {nameWarning && (
              <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                name is required
              </p>
            )}

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

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={RiVerifiedBadgeLine} color="gray.500" />
              </InputLeftElement>
              <Input
                ref={refpassword_confirmation}
                type="password"
                variant="flushed"
                borderColor={"gray.400"}
                placeholder="Password confirmation"
                onChange={(e) => {
                  if (e.target.value.length < 8) {
                    setPassword_confirmationWarning(true);
                    setDisabled(true);
                  } else {
                    setPassword_confirmationWarning(false);
                    setDisabled(false);
                  }
                }}
              />
            </InputGroup>
            {password_confirmationWarning && (
              <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                password must be atleast 8 characters
              </p>
            )}

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={RiPhoneLine} color="gray.500" />
              </InputLeftElement>
              <Input
                ref={refphone}
                type="tel"
                variant="flushed"
                borderColor={"gray.400"}
                placeholder="phone"
                onChange={(e) => {
                  if (!e.target.value) {
                    setPhoneWarning(true);
                    setDisabled(true);
                  } else {
                    setPhoneWarning(false);
                    setDisabled(false);
                  }
                }}
              />
            </InputGroup>
            {phoneWarning && (
              <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                phone is required
              </p>
            )}

            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                width={"100%"}
                colorScheme={disabled ? "gray" : "yellow"}
                textColor={disabled ? "black" : "white"}
                marginTop={disabled ? 0 : 7}
                isDisabled={disabled}
                onClick={() => {
                  event?.preventDefault();
                  if (
                    refname.current &&
                    refname.current?.value &&
                    refEmail.current &&
                    refEmail.current?.value &&
                    refpassworrd.current &&
                    refpassworrd.current.value &&
                    refpassword_confirmation.current &&
                    refpassword_confirmation.current.value &&
                    refphone.current &&
                    refphone.current.value
                  ) {
                    RegisterUser.mutate({
                      name: refname.current?.value,
                      email: refEmail.current?.value,
                      password: refpassworrd.current?.value,
                      password_confirmation:
                        refpassword_confirmation.current.value,
                      phone: refphone.current.value,
                    });
                  }
                }}
              >
                Register
              </Button>
            </motion.div>
            <HStack
              placeContent={"center"}
              textAlign={"center"}
              marginTop={disabled ? -5 : 0}
            >
              <Text textColor="grey" fontSize="15px">
                {" "}
                already have an account?
              </Text>
              <motion.div whileHover={{ scale: 1.12 }}>
                <Link onClick={close} textColor="blue.500" fontSize="15px">
                  {" "}
                  login
                </Link>
              </motion.div>
            </HStack>
          </Stack>
        </motion.div>
      )}
      {open && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 1 }}
          style={{ overflow: "hidden" }}
        >
          <Box width={{ md: width / 2.5, base: width }}>
            <Image
              src={register}
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
    </>
  );
};

export default RegisterForm;
