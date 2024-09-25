import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useAppSections from "../hooks/useAppSections";
import useDelAppSec from "../hooks/useDelAppSec";
import { useEffect, useRef, useState } from "react";
import { PiPlusBold, PiCaretDownLight } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import CustomModal from "./CustomModal";
import useAddSec from "../hooks/useAddSec";

const AppSections = () => {
  const sections = useAppSections();
  const addSec = useAddSec(() => {
    onClose();
    sections.refetch();
  });

  const [del, setDel] = useState(false);
  const [id, setId] = useState(-1);
  const DelSec = useDelAppSec(del, id, () => {
    sections.refetch();
  });

  const [disabled, setDisabled] = useState(true);

  const refSec = useRef<HTMLInputElement>(null);
  const [secWarning, setsecWarning] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (del && DelSec.backStatus === 200) {
      setId(-1);
      setDel(false);
    }
  }, [id, del, sections, addSec, DelSec]);

  return (
    <VStack>
      <>
        {sections.data?.map((info, index) => (
          <p key={index}>
            {info.name}
            <Button
              colorScheme="red"
              marginLeft={10}
              onClick={() => {
                setId(info.id);
                setDel(true);
              }}
            >
              delete
            </Button>
          </p>
        ))}
      </>
      <Tooltip
        label="Add new section"
        placement="bottom"
        bg="yellow.300"
        color="black"
      >
        <span
          style={{
            zIndex: 99999,
            display: "inline-block",
            position: "fixed",
            marginLeft: "calc(75% - 100px)",
            marginTop: "70vh",
          }}
        >
          <Icon
            boxShadow={"lg"}
            boxSize={12}
            padding={2}
            borderRadius={100}
            bgColor={"yellow.500"}
            as={PiPlusBold}
            onClick={onOpen}
          />
        </span>
      </Tooltip>
      <CustomModal
        buttonLabel={"Enter section name"}
        isOpen={isOpen}
        onClose={onClose}
        colorLight="gray.200"
        colorDark="#333333"
      >
        <>
          <InputGroup marginBottom={5}>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdAlternateEmail} color="gray.500" />
            </InputLeftElement>
            <Input
              ref={refSec}
              variant="flushed"
              borderColor={"gray.400"}
              placeholder="Section name"
              onChange={(e) => {
                if (!e.target.value) {
                  setsecWarning(true);
                  setDisabled(true);
                } else {
                  setsecWarning(false);
                  setDisabled(false);
                }
              }}
            />
          </InputGroup>
          <Button
            colorScheme={disabled ? "gray" : "blue"}
            textColor={disabled ? "black" : "white"}
            isDisabled={disabled}
            marginY={3}
            onClick={() => {
              event?.preventDefault();
              if (refSec.current && refSec.current?.value) {
                addSec.mutate({
                  name: refSec.current?.value,
                });
              }
            }}
          >
            Add{" "}
          </Button>
        </>
      </CustomModal>
    </VStack>
  );
};

export default AppSections;
