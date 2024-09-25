import {
  Button,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Show,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useFetchEmp from "../hooks/useFetchEmp";
import resizeWindow from "../services/resizeWindow";
import { PiPlusBold, PiCaretDownLight } from "react-icons/pi";
import CustomModal from "./CustomModal";
import AddEmp from "./AddEmp";
import useDeleteEmp from "../hooks/useDeleteEmp";
import { useEffect, useState } from "react";

const Employee = () => {
  const Emp = useFetchEmp();

  const [del, setDel] = useState(false);
  const [id, setId] = useState(-1);
  const DelEmp = useDeleteEmp(del, id, () => {
    Emp.refetch();
    setId(-1);
    setDel(false);
  });

  const { width, height } = resizeWindow();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack>
      {" "}
      <>
        <HStack
          marginBottom={-6}
          borderRadius={10}
          padding={5}
          width={(width * 3) / 4}
          justifyContent={"space-between"}
        >
          <Text fontSize={18}>name</Text> <Text fontSize={18}>phone</Text>
          <Show above="md">
            <Text fontSize={18}>is available</Text>{" "}
          </Show>
          <Text fontSize={18}>more </Text>
        </HStack>
        {Emp.data?.map((info, index) => (
          <>
            <HStack
              key={index}
              margin={2}
              borderRadius={10}
              padding={5}
              height={14}
              bgColor={"gray.400"}
              width={(width * 3) / 4}
              justifyContent={"space-between"}
            >
              <Text fontSize={18}>{info.name}</Text>{" "}
              <Text fontSize={18}>{info.phone} </Text>
              <Show above="md">
                <Text fontSize={18}>
                  {info.userable.is_available ? "available" : "unavailable"}
                </Text>
              </Show>
              <Popover placement="bottom-start">
                <PopoverTrigger>
                  <Button boxSize={9} bgColor={"gray.400"}>
                    {" "}
                    <Icon as={PiCaretDownLight} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight="semibold">
                    Employee information
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <p>name: {info.name}</p>
                    <p>email: {info.email}</p>
                    <p>phone: {info.phone}</p>
                    <p>
                      status:{" "}
                      {info.userable.is_available ? "available" : "unavailable"}
                    </p>
                  </PopoverBody>
                  <PopoverFooter>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        setId(info.id);
                        setDel(true);
                      }}
                    >
                      Delete
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </HStack>
          </>
        ))}
      </>
      <Tooltip
        label="Add new employee"
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
            marginTop: "75vh",
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
          >
            Emergency Exit
          </Icon>
        </span>
      </Tooltip>
      <CustomModal
        buttonLabel={"Enter employee info"}
        isOpen={isOpen}
        onClose={onClose}
        colorLight="gray.200"
        colorDark="#333333"
      >
        <AddEmp
          closeModal={() => {
            Emp.refetch();
            onClose();
          }}
        />
      </CustomModal>
    </VStack>
  );
};

export default Employee;
