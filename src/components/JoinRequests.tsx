import {
  Box,
  Button,
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
import { HiMiniUserCircle } from "react-icons/hi2";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import useJoinRequests from "../hooks/useJoinRequests";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAccCompJoin } from "../hooks/useAccCompJoin";
import useRejCompJion from "../hooks/useRejCompJion";

const JoinRequests = () => {
  const companies = useJoinRequests();
  const [acc, setAcc] = useState(false);
  const [idAcc, setIdAcc] = useState(-1);
  const accComp = useAccCompJoin(acc, idAcc, () => {
    setIdAcc(-1);
    setAcc(false);
    companies.refetch();
  });

  const [rej, setRej] = useState(false);
  const [idRej, setIdRej] = useState(-1);
  const rejComp = useRejCompJion(rej, idRej, () => {
    setIdAcc(-1);
    setAcc(false);
    companies.refetch();
  });

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
    <TableContainer>
      <Table variant="simple" marginTop={3} overflow={"auto"}>
        <TableCaption>no more companies applied</TableCaption>
        <Thead>
          <Tr>
            <Show above="xs">
              <Th fontSize={20} color={white}>
                #
              </Th>
            </Show>
            <Th paddingLeft={14} color={white}>
              company
            </Th>
            <Th isNumeric color={white}>
              accept / decline
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {companies.data?.map((info, index) => (
            <Tr key={index}>
              <Show above="xs">
                <Td color={white}>{index + 1}</Td>
              </Show>
              <Td
                color={white}
                onClick={() => {
                  localStorage.setItem("CurrentProfile", info.id.toString());
                  navigate("/dash/viewProfile");
                }}
              >
                <Icon
                  marginBottom={-2}
                  color={white}
                  boxSize={7}
                  as={HiMiniUserCircle}
                />{" "}
                {info.userable.company_name}
              </Td>
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
  );
};

export default JoinRequests;
