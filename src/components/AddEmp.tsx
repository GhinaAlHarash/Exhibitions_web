import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { MdAlternateEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { RiPhoneLine } from "react-icons/ri";
import useAddemp from "../hooks/useAddEmp";
import { registerData } from "../hooks/useRegister";
import { User } from "../hooks/useLogin";
import { TRes } from "../hooks/useSendData";
import { UseMutationResult } from "@tanstack/react-query";

interface Props{
    closeModal:()=>void
}
const AddEmp = ( {closeModal}:Props) => {
  const addEmp = useAddemp(closeModal);

  const [disabled, setDisabled] = useState(false);

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
  const [phoneLenWarning, setPhoneLenWarning] = useState(false);
  useEffect(()=>{
    if (addEmp.data?.status == 200) {
        closeModal()
    }
  },[addEmp]);
  return (
    <Stack margin={3} spacing={4}>
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
          marginBottom={nameWarning ? 3 : 0}
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
        <p style={{ margin: 4, color: "#ff4545", marginTop: "-30px" }}>
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
          marginBottom={emailWarning ? 3 : 0}
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
        <p style={{ color: "#ff4545", marginTop: "-30px" }}>invalid Email</p>
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
          marginBottom={passWarning ? 3 : 0}
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
          marginBottom={password_confirmationWarning ? 1 : 0}
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
          marginBottom={phoneWarning || phoneLenWarning ? 3 : 0}
          onChange={(e) => {
            if (!e.target.value) {
              setPhoneWarning(true);
              setDisabled(true);
            } else {
              setPhoneWarning(false);
              setDisabled(false);
            }
            if (e.target.value.length != 10) {
              setPhoneLenWarning(true);
              setDisabled(true);
            } else {
              setPhoneLenWarning(false);
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
      {!phoneWarning && phoneLenWarning && (
        <p style={{ color: "#ff4545", marginTop: "-30px" }}>
          phone must be 10 digits
        </p>
      )}
      <Button
      colorScheme={disabled ? "gray" : "blue"}
        textColor={disabled ? "black" : "white"}
        isDisabled={disabled}
        marginY={3}
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
            addEmp.mutate({
              name: refname.current?.value,
              email: refEmail.current?.value,
              password: refpassworrd.current?.value,
              password_confirmation: refpassword_confirmation.current.value,
              phone: refphone.current.value,
            });
          }
        }}
      >
        {" "}
        Add{" "}
      </Button>
    </Stack>
  );
};

export default AddEmp;
