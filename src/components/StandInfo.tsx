import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiMiniUserCircle } from "react-icons/hi2";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import useCompReqExh from "../hooks/useCompReqExh";
import useAccCompExh from "../hooks/useAccCompExh";
import useRejCompExh from "../hooks/useRejCompExh";
import { useNavigate } from "react-router-dom";
import useFetchStandInfo from "../hooks/useFetchStandInfo";
import useAddMoney from "../hooks/useAddMoney";
import useStandBooking from "../hooks/useStandBooking";
import useComProfile from "../hooks/useComProfile";
import useAccCompStand from "../hooks/useAccCompStand";

interface Props {
  standId: string;
  fun:()=>void
}

const StandInfo = ({ standId, fun }: Props) => {
  const companies = useFetchStandInfo(standId);

  localStorage.removeItem("CurrentProfile");

  const profileInfo = useComProfile();

  const [acc, setAcc] = useState(false);
  const [idAcc, setIdAcc] = useState(-1);
  const accComp = useAccCompStand(acc, idAcc, standId, () => {companies.refetch(); fun()});

  const white = useColorModeValue("gray.700", "white");
  const whiteB = useColorModeValue("gray.400", "gray.500");

  const [price, setPrice] = useState("");

  const addMoney = useStandBooking(() => {
    setPrice("");
    companies.refetch();
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (acc && accComp.backStatus === 200) {
      setIdAcc(-1);
      setAcc(false);
      //(window.location as any).reload();
    }
  }, [acc, idAcc, accComp]);

  return (
    <Box marginX={{ base: -2, md: 0 }}>
      {localStorage.getItem("useroles") == "company" ? (
        <HStack marginY={5}>
          <InputGroup borderColor={whiteB}>
            {" "}
            <InputRightElement
              marginRight={2}
              color="green.500"
              fontSize="1.2em"
            >
              $
            </InputRightElement>
            <Input
              value={price}
              type="number"
              marginX={2}
              placeholder="enter your bet here"
              marginLeft={10}
              onChange={(e) => {
                e.target.value ? setPrice(e.target.value) : setPrice("");
              }}
            />
          </InputGroup>

          <Button
            colorScheme="blue"
            width={40}
            marginBottom={-1.5}
            isDisabled={!price || price == "0"}
            marginTop={-1.5}
            onClick={() => {
              addMoney.mutate({
                stands: [
                  {
                    id: Number(standId),
                    stand_price: price == "" ? 0 : Number(price),
                  },
                ],
              });
            }}
          >
            add your bet
          </Button>
        </HStack>
      ):<></>}
      <TableContainer
        marginTop={10}
        borderColor={white}
        style={{ overflowY: "auto" }}
        height={480}
      >
        <Table variant="simple" marginTop={3} overflow={"auto"}>
          <TableCaption>no more companies applied</TableCaption>
          <Thead>
            <Tr>
              <Th color={white} borderColor={white}>
                company
              </Th>
              <Th color={white} borderColor={white}>
                price
              </Th>
              {(localStorage.getItem("useroles") == "employee" ||
                localStorage.getItem("useroles") == "organizer") && (
                <Th isNumeric color={white} borderColor={white}>
                  accept
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {companies.data?.length ?
              companies.data?.map((info, index) => (
                <Tr key={index}>
                  <Td color={white} borderColor={whiteB}>
                    <HStack marginY={info.company.img ? -0.5 : 0}>
                      <Show above="md">
                        {info.company.img ? (
                          <Avatar
                            boxSize={8}
                            src={`http://127.0.0.1:8000/storage/${info.company.img}`}
                          />
                        ) : (
                          <Icon
                            marginBottom={-1}
                            color={whiteB}
                            marginLeft={-0.5}
                            boxSize={9}
                            as={HiMiniUserCircle}
                          />
                        )}{" "}
                      </Show>
                      {localStorage.getItem("useroles") == "company" &&
                      profileInfo.data?.userable.id == info.company.id ? (
                        <Text
                          fontSize={18}
                          marginTop={info.company.img ? -0.5 : 0}
                        >
                          <b>{info.company.company_name}</b>
                        </Text>
                      ) : (
                        <Text marginTop={info.company.img ? -1 : 0}>
                          {info.company.company_name}
                        </Text>
                      )}
                    </HStack>
                  </Td>
                  <Td color={"green.500"} borderColor={whiteB}>
                    {info.stand_price} $
                  </Td>
                  {(localStorage.getItem("useroles") == "employee" ||
                    localStorage.getItem("useroles") == "organizer") && (
                    <Td color={white} isNumeric borderColor={whiteB}>
                      <Button
                        width={12}
                        colorScheme="green"
                        onClick={() => {
                          if (info.company.id) setIdAcc(info.company.id);
                          setAcc(true);
                        }}
                      >
                        <Icon boxSize={"100%"} as={PiCheckBold} />
                      </Button>{" "}
                    </Td>
                  )}
                </Tr>
              )):<></>}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StandInfo;
