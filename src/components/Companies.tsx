import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
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
const Companies = () => {
  const companies = useCompReqExh();

  const [acc, setAcc] = useState(false);
  const [idAcc, setIdAcc] = useState(-1);
  const accComp = useAccCompExh(acc, idAcc, companies.refetch);

  const [rej, setRej] = useState(false);
  const [idRej, setIdRej] = useState(-1);
  const rejComp = useRejCompExh(rej, idRej, companies.refetch);

  const white = useColorModeValue("gray.700", "white");

  const navigate = useNavigate();

  useEffect(() => {
    if (acc && accComp.backStatus === 200) {
      setIdAcc(-1);
      setAcc(false);
      //(window.location as any).reload();
    }

    if (rej && rejComp.backStatus === 200) {
      setIdRej(-1);
      setRej(false);

      //(window.location as any).reload();
    }
  }, [rej, acc, idAcc, idRej, accComp, rejComp]);

  return (
    <Box>
      <TableContainer>
        <Table variant="simple" marginTop={3} overflow={"auto"}>
          <TableCaption>no more companies applied</TableCaption>
          <Thead>
            <Tr>
              <Th paddingLeft={14} color={white}>
                company
              </Th>
              <Show above="md">
                <Th paddingLeft={14} color={white}>
                  email
                </Th>
              </Show>
              <Th isNumeric color={white}>
                accept / decline
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {companies.data?.map((info, index) => (
              <Tr key={index}>
                <Td color={white}>
                  <HStack
                    onClick={() => {
                      localStorage.setItem(
                        "CurrentProfile",
                        info.id.toString()
                      );
                      navigate("/dash/viewProfile");
                    }}
                  >
                    {info.userable.img ? (
                      <Avatar
                        boxSize={10}
                        src={`http://127.0.0.1:8000/storage/${info.userable.img}`}
                      />
                    ) : (
                      <Icon
                        marginBottom={-2}
                        color={white}
                        boxSize={7}
                        as={HiMiniUserCircle}
                      />
                    )}{" "}
                    <Text marginTop={info.userable.img ? -1 : 1}>
                      {info.userable.company_name}
                    </Text>
                  </HStack>
                </Td>
                <Show above="md">
                  <Td color={"blue.300"}>{info.userable.business_email}</Td>
                </Show>
                <Td color={white} isNumeric>
                  <Button
                    width={12}
                    colorScheme="green"
                    onClick={() => {
                      if (info.id) setIdAcc(info.id);
                      setAcc(true);
                    }}
                  >
                    <Icon boxSize={"100%"} as={PiCheckBold} />
                  </Button>{" "}
                  <Button
                    width={12}
                    colorScheme="red"
                    onClick={() => {
                      if (info.id) setIdRej(info.id);
                      setRej(true);
                    }}
                  >
                    <Icon boxSize={"100%"} as={PiXBold} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Companies;
