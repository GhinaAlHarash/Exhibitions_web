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
import { useNavigate } from "react-router-dom";
import useFetchAllComp from "../hooks/useFetchAllComp";
import useCompStore from "../stores/useCompStore";

const SearchComp = () => {
  const white = useColorModeValue("gray.700", "white");
  const { companys: companies } = useCompStore();
  const navigate = useNavigate();
  return (
    <TableContainer>
      <Table variant="simple" marginTop={3} overflow={"auto"}>
        <TableCaption>no more companies</TableCaption>
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
            <Show above="md">
              <Th color={white}>Email</Th>
            </Show>
            <Th color={white}>status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {companies?.map((info, index) => (
            <Tr key={index}>
              <Show above="xs">
                <Td color={white}>{index + 1}</Td>
              </Show>
              <Td
                color={white}
                onClick={() => {
                  localStorage.setItem(
                    "CurrentProfile",
                    info.user[0].id.toString()
                  );
                  navigate("/dash/viewProfile");
                }}
              >
                <Icon
                  marginBottom={-2}
                  color={white}
                  boxSize={7}
                  as={HiMiniUserCircle}
                />{" "}
                {info.company_name}
              </Td>
              <Show above="md">
                <Td color={"blue.300"}>{info.business_email}</Td>
              </Show>
              <Td color={info.status == "1" ? "green.400" : "yellow.400"}>
                {info.status == "1" ? "accepted" : "pendding"}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SearchComp;
