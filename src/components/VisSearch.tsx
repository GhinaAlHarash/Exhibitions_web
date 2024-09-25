import {
  Button,
  Icon,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Show,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useFetchAllVis from "../hooks/useFetchAllVis";
import {
  PiCaretDownLight,
  PiGenderIntersexBold,
  PiWallet,
} from "react-icons/pi";
import { useEffect, useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { RiAccountCircleLine, RiPhoneLine } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import useDelVis from "../hooks/useDelVis";
import useAddMoney from "../hooks/useAddMoney";
import useVisStore from "../stores/useVisStore";

const VisSearch = () => {
  const white = useColorModeValue("gray.700", "white");
  const whitereal = useColorModeValue("white", "blue.800");

  const [idMoney, setIdMoney] = useState(-1);
  const addMoney = useAddMoney(idMoney.toString(), () => {});
  const [price, setPrice] = useState("");

  const [del, setDel] = useState(false);
  const [id, setId] = useState(-1);
  const DelVis = useDelVis(del, id, () => {});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { vistors: visitors } = useVisStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (del && DelVis.backStatus == 200) {
      setId(-1);
      setDel(false);
    }
    if (addMoney.data?.status == 200 && idMoney != -1) {
      setIdMoney(-1);
      onClose();
    }
  }, [DelVis, addMoney]);
  return (
    <TableContainer>
      <Table variant="simple" marginTop={3} overflow={"auto"}>
        <TableCaption>no more visitors</TableCaption>
        <Thead>
          <Tr>
            <Show above="xs">
              <Th fontSize={20} color={white}>
                #
              </Th>
            </Show>
            <Th paddingLeft={14} color={white}>
              username
            </Th>
            <Show above="md">
              <Th color={white}>Email</Th>
            </Show>
            <Th color={white}>more</Th>
          </Tr>
        </Thead>
        <Tbody>
          {visitors?.map((info, index) => (
            <Tr key={index}>
              <Show above="xs">
                <Td color={white}>{index + 1}</Td>
              </Show>
              <Td color={white}>
                <Icon
                  marginBottom={-2}
                  color={white}
                  boxSize={7}
                  as={HiMiniUserCircle}
                />{" "}
                {info.name}
              </Td>
              <Show above="md">
                <Td color={"blue.300"}>{info.email}</Td>
              </Show>
              <Td>
                <Popover
                  placement="bottom-start"
                  onClose={onClose}
                  isOpen={isOpen}
                  onOpen={onOpen}
                >
                  <PopoverTrigger>
                    <Button boxSize={9} bgColor={whitereal}>
                      {" "}
                      <Icon
                        as={PiCaretDownLight}
                        onClick={() => {
                          setPrice("");
                          setIdMoney(-1);
                        }}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader fontWeight="semibold">
                      Visitor information
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <p style={{ marginBottom: 6 }}>
                        <Icon
                          marginBottom={-0.5}
                          marginRight={2}
                          as={RiAccountCircleLine}
                        />{" "}
                        {info.name}
                      </p>
                      <p style={{ marginBottom: 6 }}>
                        <Icon
                          marginBottom={-0.5}
                          marginRight={2}
                          as={MdAlternateEmail}
                        />{" "}
                        {info.email}
                      </p>
                      <p style={{ marginBottom: 6 }}>
                        <Icon
                          marginBottom={-0.5}
                          marginRight={2}
                          as={RiPhoneLine}
                        />{" "}
                        {info.phone}
                      </p>
                      <p style={{ marginBottom: 6 }}>
                        <Icon
                          marginBottom={-0.5}
                          marginRight={2}
                          as={PiGenderIntersexBold}
                        />{" "}
                        {info.userable.gender}
                      </p>
                      <p style={{ marginBottom: 6 }}>
                        <Icon marginRight={2} as={FaBirthdayCake} />{" "}
                        {info.userable.birth_date}
                      </p>
                      <Text color={"green.400"}>
                        <Icon
                          marginBottom={-1}
                          boxSize={5}
                          color={white}
                          marginLeft={-0.5}
                          marginRight={3}
                          as={PiWallet}
                        />
                        500$
                        <Input
                          width={32}
                          height={8}
                          value={price}
                          type="number"
                          marginX={2}
                          marginLeft={10}
                          onChange={(e) => {
                            e.target.value
                              ? setPrice(e.target.value)
                              : setPrice("");
                          }}
                        />
                        <Button
                          colorScheme="blue"
                          width={12}
                          height={8}
                          isDisabled={!price || price == "0"}
                          marginTop={-1.5}
                          onClick={() => {
                            setIdMoney(info.id);
                            addMoney.mutate({
                              amount: price == "" ? 0 : Number(price),
                            });
                          }}
                        >
                          add
                        </Button>
                      </Text>
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
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default VisSearch;
