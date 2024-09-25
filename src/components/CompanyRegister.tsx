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
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  PiArticleNyTimes,
  PiReadCvLogo,
  PiBuildingApartmentBold,
} from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import {
  MdAlternateEmail,
  MdOutlineContactMail,
  MdVerified,
} from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import {
  RiAccountCircleLine,
  RiVerifiedBadgeLine,
  RiPhoneLine,
} from "react-icons/ri";
import { GrCloudComputer, GrLocation } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import company2 from "../assets/company2.gif";
import resizeWindow from "../services/resizeWindow";
import validator from "validator";
import apiClient from "../services/apiClient";
import useComVerCode from "../hooks/useComVerCode";

interface Props {
  close: () => void;
}

const CompanyRegister = ({ close }: Props) => {
  const [disabled, setDisabled] = useState(true);

  const sendCode = useComVerCode();

  const { width, height } = resizeWindow();

  const [img, setImg] = useState<File>();

  // refs
  const refEmail = useRef<HTMLInputElement>(null);
  const refpassworrd = useRef<HTMLInputElement>(null);
  const refname = useRef<HTMLInputElement>(null);
  const refpassword_confirmation = useRef<HTMLInputElement>(null);
  const refphone = useRef<HTMLInputElement>(null);
  const refcomName = useRef<HTMLInputElement>(null);
  const refbusseEmail = useRef<HTMLInputElement>(null);
  const refwebsite = useRef<HTMLInputElement>(null);
  const refadd = useRef<HTMLInputElement>(null);
  const refsummery = useRef<HTMLInputElement>(null);
  const refbody = useRef<HTMLInputElement>(null);
  const refcode = useRef<HTMLInputElement>(null);

  // warnings
  const [passWarning, setPassWarning] = useState(true);
  const [emailWarning, setEmailWarning] = useState(true);
  const [nameWarning, setNameWarning] = useState(true);
  const [password_confirmationWarning, setPassword_confirmationWarning] =
    useState(true);
  const [phoneWarning, setPhoneWarning] = useState(true);
  const [comNameWarning, setcomNameWarning] = useState(true);
  const [busseEmailWarning, setbusseEmailWarning] = useState(true);
  const [websiteWarning, setwebsiteWarning] = useState(false);
  const [addWarning, setaddWarning] = useState(true);
  const [summeryWarning, setsummeryWarning] = useState(true);
  const [bodyWarning, setbodyWarning] = useState(true);
  const [codeWarning, setcodeWarning] = useState(true);

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [open, setopen] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [open2, setopen2] = useState(false);

  const handleFileChange = () => {
    const data = new FormData();

    if (img) data.append("commercial_register", img);
    if (refEmail.current?.value) data.append("email", refEmail.current?.value);
    if (refname.current?.value) data.append("name", refname.current?.value);
    if (refsummery.current?.value)
      data.append("summary", refsummery.current?.value);
    if (refbody.current?.value) data.append("body", refbody.current?.value);
    if (refphone.current?.value) data.append("phone", refphone.current?.value);
    if (refpassworrd.current?.value)
      data.append("password", refpassworrd.current?.value);
    if (refpassword_confirmation.current?.value)
      data.append(
        "password_confirmation",
        refpassword_confirmation.current?.value
      );
    if (refcomName.current?.value)
      data.append("company_name", refcomName.current?.value);
    if (refbusseEmail.current?.value)
      data.append("business_email", refbusseEmail.current?.value);
    if (refwebsite.current?.value)
      data.append("website", refwebsite.current?.value);
    if (refadd.current?.value)
      data.append("office_address", refadd.current?.value);

    apiClient
      .post(`http://127.0.0.1:8000/api/company_register`, data)
      .then((res) => {
        if (res.data?.status == 200) {
          localStorage.setItem("userId", res.data?.data[0][0].id.toString());
          localStorage.setItem("useroles", res.data?.data[0][0].roles[0]);
          localStorage.setItem("username", res.data?.data[0][0].name);
          console.log(localStorage.getItem("userId"));

          setSuccess(true);
          setTimeout(() => {
            setopen(true);
          }, 1000);
        }
        //   (window.location as any).reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (sendCode.data?.status == 200) {
      setSuccess2(true);
      setTimeout(() => {
        setopen2(true);
      }, 1000);
    }
  }, [sendCode]);

  return (
    <div>
      {!open && !open2 && (
        <motion.div
          initial={false}
          animate={{ height: success ? 0 : "auto" }}
          transition={{ duration: 0.5 }}
          style={{ overflow: "hidden" }}
        >
          <Stack
            marginTop={-10}
            padding={(5 * width) / 100}
            width={{ md: width / 2.5, base: width }}
          >
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: -200 }}
              transition={{ duration: 0.9, delay:0.7 }}
            >
              <Text textColor="darkblue" fontSize="30px" marginBottom={"20px"}  marginTop={3}>
                {" "}
                Welcome!
              </Text>
            </motion.div>

            <Stack
              spacing={(4 * height) / 100}
              style={{ overflowY: "auto" }}
              height={400}
            >
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

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={PiBuildingApartmentBold} color="gray.500" />
                </InputLeftElement>
                <Input
                  ref={refcomName}
                  type="text"
                  variant="flushed"
                  borderColor={"gray.400"}
                  placeholder="Company name"
                  onChange={(e) => {
                    if (!e.target.value) {
                      setcomNameWarning(true);
                      setDisabled(true);
                    } else {
                      setcomNameWarning(false);
                      setDisabled(false);
                    }
                  }}
                />
              </InputGroup>
              {comNameWarning && (
                <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                  Company name is required
                </p>
              )}

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdOutlineContactMail} color="gray.500" />
                </InputLeftElement>
                <Input
                  ref={refbusseEmail}
                  type="email"
                  variant="flushed"
                  borderColor={"gray.400"}
                  placeholder="Business email"
                  onChange={(e) => {
                    if (
                      !e.target.value.match(
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                      )
                    ) {
                      setbusseEmailWarning(true);
                      setDisabled(true);
                    } else {
                      setbusseEmailWarning(false);
                      setDisabled(false);
                    }
                  }}
                />
              </InputGroup>
              {busseEmailWarning && (
                <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                  Business email is required
                </p>
              )}

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={GrCloudComputer} color="gray.500" />
                </InputLeftElement>
                <Input
                  ref={refwebsite}
                  type="url"
                  variant="flushed"
                  borderColor={"gray.400"}
                  placeholder="website"
                  onChange={(e) => {
                    if (!validator.isURL(e.target.value)) {
                      setwebsiteWarning(true);
                      setDisabled(true);
                    } else {
                      setwebsiteWarning(false);
                      setDisabled(false);
                    }
                  }}
                />
              </InputGroup>
              {websiteWarning && (
                <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                  not Valid website
                </p>
              )}
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={GrLocation} color="gray.500" />
                </InputLeftElement>
                <Input
                  ref={refadd}
                  type="tex6t"
                  variant="flushed"
                  borderColor={"gray.400"}
                  placeholder="address"
                  onChange={(e) => {
                    if (!e.target.value) {
                      setaddWarning(true);
                      setDisabled(true);
                    } else {
                      setaddWarning(false);
                      setDisabled(false);
                    }
                  }}
                />
              </InputGroup>
              {addWarning && (
                <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                  address is required
                </p>
              )}

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={PiReadCvLogo} color="gray.500" />
                </InputLeftElement>
                <Input
                  ref={refsummery}
                  type="text"
                  variant="flushed"
                  borderColor={"gray.400"}
                  placeholder="summery"
                  onChange={(e) => {
                    if (!e.target.value) {
                      setsummeryWarning(true);
                      setDisabled(true);
                    } else {
                      setsummeryWarning(false);
                      setDisabled(false);
                    }
                  }}
                />
              </InputGroup>
              {summeryWarning && (
                <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                  summery is required
                </p>
              )}

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={PiArticleNyTimes} color="gray.500" />
                </InputLeftElement>
                <Input
                  ref={refbody}
                  type="text"
                  variant="flushed"
                  borderColor={"gray.400"}
                  placeholder="body"
                  onChange={(e) => {
                    if (!e.target.value) {
                      setbodyWarning(true);
                      setDisabled(true);
                    } else {
                      setbodyWarning(false);
                      setDisabled(false);
                    }
                  }}
                />
              </InputGroup>
              {bodyWarning && (
                <p style={{ color: "#ff4545", marginTop: "-30px" }}>
                  body is required
                </p>
              )}

              <InputGroup marginTop={1} marginBottom={-3}>
                <InputLeftElement pointerEvents="none">
                  <Icon
                    as={HiOutlinePhotograph}
                    color="gray.500"
                    marginBottom={3}
                  />
                </InputLeftElement>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="speaker"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setImg(file);
                    }
                  }}
                  border={"hidden"}
                />
              </InputGroup>
            </Stack>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                width={"100%"}
                colorScheme={disabled ? "gray" : "yellow"}
                textColor={disabled ? "black" : "white"}
                marginTop={disabled ? 0 : 7}
                isDisabled={disabled}
                onClick={() => {
                  event?.preventDefault();
                  handleFileChange();
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
      {open && !open2 && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: success2 ? 0 : "auto" }}
          transition={{ duration: 1 }}
          style={{ overflow: "hidden" }}
        >
          <Box width={{ md: width / 2.5, base: width }}>
            <Stack
              alignContent={"center"}
              placeItems={"center"}
              padding={5}
              textAlign={"center"}
              marginBottom={10}
            >
              <Text color={"green.300"} fontSize={26}>
                {" "}
                Great! now continue you registeration proccess
              </Text>
              <Text
                color={"gray.500"}
                fontSize={20}
                marginTop={-6}
                marginBottom={8}
              >
                {" "}
                <br />
                please check your email
                <br />
                for the verification code
                <br /> and submit it
              </Text>
              <Input
                ref={refcode}
                onChange={(e) => {
                  if (!e.target.value) {
                    setcodeWarning(true);
                  } else {
                    setcodeWarning(false);
                  }
                }}
                placeholder={"enter your code here"}
              />
              <Button
                colorScheme={disabled ? "gray" : "yellow"}
                textColor={disabled ? "black" : "white"}
                isDisabled={codeWarning}
                onClick={() => {
                  if (refcode.current?.value)
                    sendCode.mutate({ code: refcode.current?.value });
                }}
              >
                submit
              </Button>
            </Stack>
          </Box>
        </motion.div>
      )}{" "}
      {open2 && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 1 }}
          style={{ overflow: "hidden" }}
        >
          <Box width={{ md: width / 2.5, base: width }}>
            <Stack
              alignContent={"center"}
              placeItems={"center"}
              padding={5}
              textAlign={"center"}
              marginBottom={10}
            >
              <Text color={"green.300"} fontSize={26}>
                {" "}
                your request has been submitted!
              </Text>
              <Text
                color={"gray.500"}
                fontSize={20}
                marginTop={-6}
                marginBottom={8}
              >
                {" "}
                <br />
                please check your email
                <br />
                for the accept email
                <br /> then login
              </Text>
              <Image
                src={company2}
                boxSize={{ md: "250px", base: width / 2 }}
                borderRadius={300}
                marginBottom={-14}
              />
            </Stack>
          </Box>
        </motion.div>
      )}
    </div>
  );
};

export default CompanyRegister;
