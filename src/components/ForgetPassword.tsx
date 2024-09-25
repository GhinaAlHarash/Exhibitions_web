import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useSendEmail from "../hooks/useSendEmail";
import CustomModal from "./CustomModal";
import useSendVerCode from "../hooks/useSendVerCode";
import useSetNewPass from "../hooks/useSetNewPass";
import useRefreshCode from "../hooks/useRefreshCode";

interface Props {
  open: () => void;
}

const ForgetPassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  const initialRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const PassRef = useRef<HTMLInputElement>(null);
  const PassConfRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(false);
  const [steps, setSteps] = useState(1);
  const [opened, setopened] = useState(false);
  const [pressed, setpressed] = useState(false);
  const [refresh, setrefresh] = useState(false);

  const sendEmail = useSendEmail();
  const sendcode = useSendVerCode();
  const sendNewPass = useSetNewPass();
  const refreshCode = useRefreshCode(refresh);

  const customOnClose =()=>{onClose(); setSteps(1); setError(false);}

  useEffect(() => {
    if (steps == 1 && pressed && !error && sendEmail.data?.status == 200) {
      setSteps(2); setpressed(false);
    } else if (steps == 2 && pressed  && !error && sendcode.data?.status == 200) {
      setSteps(3); setpressed(false);
    }else if (steps == 2 && pressed &&refresh && !error && refreshCode.backStatus == 200) {
      setrefresh(false);
    } else if (steps == 3 && pressed &&!error && sendNewPass.data?.status == 200) {
      onClose(); setpressed(false); setSteps(1);
      console.log(sendEmail);
    } else if (!opened && sendEmail.status == "error") {
      setError(true);
      setopened(true);
    }

    console.log(steps);
  }, [sendEmail, steps, error, refresh]);

  return (
    <>
      <motion.div whileHover={{ scale: 1.03 }}>
        <Text
          textColor="grey"
          fontSize="15px"
          marginTop={-6}
          textAlign={"end"}
          onClick={() => {
            onOpen();
            setError(false);
          }}
        >
          {" "}
          forget password?
        </Text>
      </motion.div>
      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          buttonLabel={
            error
              ? ""
              : steps == 1
              ? "Please enter your email so we can help you!"
              : steps == 2
              ? "enter the code sent to your email"
              : "enter your new passsword"
          }
          onClose={onClose}
          colorLight="gray.300"
          colorDark="#333333"
        >
          {error && (
            <Text textColor={"red.600"}>
              ops! false input, please try again
            </Text>
          )}
          {steps === 1 && !error && (
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={initialRef} placeholder="enter your email here" />
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    event?.preventDefault();
                    if (initialRef.current && initialRef.current?.value) {
                      sendEmail.mutate({ email: initialRef.current?.value });
                      setopened(false); setpressed(true);
                    }
                  }}
                >
                  Next
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                    setError(false);
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </FormControl>
          )}

          {steps === 2 && !error && (
            <FormControl>
              <FormLabel>verification code</FormLabel>
              <Input ref={codeRef} placeholder="enter the code here" />
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    event?.preventDefault();
                    if (codeRef.current && codeRef.current?.value) {
                      sendcode.mutate({ code: codeRef.current?.value });
                      setopened(false); setpressed(true);
                    }
                  }}
                >
                  Next
                </Button>
                <Button
                  colorScheme={"green"}
                  onClick={() => {
                    setError(false); setrefresh(true);
                    if (!refreshCode.error) return <Text textColor={'green'}>code resent succsessfully</Text>;
                    else return <Text textColor={'red'}>an error accured, please try again</Text>; 
                  }}
                >
                  refresh
                </Button>
              </ModalFooter>
            </FormControl>
          )}

          {steps === 3 && !error && (
            <FormControl>
              <FormLabel>ResetPassword</FormLabel>
              <Input ref={PassRef} placeholder="enter the new password here"  marginTop={3}/>
              <Input ref={PassConfRef}placeholder="enter password confrmation here" marginTop={3}/>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    event?.preventDefault();
                    if (PassRef.current && PassRef.current?.value && PassConfRef.current && PassConfRef.current?.value) {
                      sendNewPass.mutate({ password: PassRef.current?.value, password_confirmation:PassConfRef.current?.value});
                      setopened(false); setpressed(true);
                    }
                  }}
                >
                  Done!
                </Button>
              </ModalFooter>
            </FormControl>
          )}
        </CustomModal>
      )}
    </>
  );
};

export default ForgetPassword;
