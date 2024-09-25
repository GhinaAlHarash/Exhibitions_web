import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Image,
  Link,
  Modal,
  ModalOverlay,
  Skeleton,
  Stack,
  Tag,
  TagLabel,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ExhImages from "./ExhImages";
import resizeWindow from "../services/resizeWindow";
import {
  PiCalendarCheckDuotone,
  PiCalendarMinusDuotone,
  PiClockUser,
  PiCaretRightBold,
} from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { IoTicketOutline } from "react-icons/io5";
import { MdEditNote } from "react-icons/md";
import useFetchOneExh from "../hooks/useFetchOneExh";
import { FaRegHandshake } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import useCompExhjoinReq from "../hooks/useCompExhjoinReq";
import { useEffect, useState } from "react";
import useFetchQR from "../hooks/useFetchQR";
import CustomModal from "./CustomModal";
import { FiCheckSquare } from "react-icons/fi";

const CompShowExh = () => {
  const info = useFetchOneExh();
  const qr = useFetchQR();

  let skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const { width, height } = resizeWindow();
  const [req, setReq] = useState(false);
  const [done, setdone] = useState(false);
  const request = useCompExhjoinReq(req, () => {
    setReq(false);
    setdone(true);
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const white = useColorModeValue("gray.700", "white");
  const whiteB = useColorModeValue("gray.400", "white");
  const whitetext = useColorModeValue("gray.200", "gray.500");
  const bg = useColorModeValue("white", "gray.400");

  return (
    <div style={{ overflowX: width < 482 ? "auto" : "hidden" }}>
      <Stack
        direction={{ sm: "row", base: "column" }}
        justifyContent={"space-between"}
      >
        <Text paddingX={12} marginY={1} fontSize={25}>
          <Icon marginBottom={-1} as={PiCaretRightBold} marginRight={2} />
          <Avatar
            marginX={2}
            src={`http://127.0.0.1:8000/storage/${info.data?.cover_img}`}
          />
          {localStorage.getItem("CurrentExh")}
        </Text>
        {info.data?.status == 2 &&
          localStorage.getItem("Resgistered") == "ur" &&
          (!done ? (
            <Button
              marginRight={{ sm: 10 }}
              width={32}
              marginLeft={{ base: 10 }}
              marginTop={2}
              colorScheme="yellow"
              bgColor={"yellow.400"}
              onClick={() => setReq(true)}
            >
              Request join
            </Button>
          ) : (
            <Text
              marginRight={{ sm: 10 }}
              color={"green.400"}
              marginLeft={{ base: 10 }}
              marginTop={2}
            >
              <Icon
                as={FiCheckSquare}
                boxSize={5}
                marginBottom={-1}
                marginRight={2}
              />
              DONE!
            </Text>
          ))}
        {localStorage.getItem("Resgistered") == "r" && qr.data?.img && (
          <>
            <Image
              marginRight={{ sm: 10 }}
              boxSize={20}
              src={`http://127.0.0.1:8000/storage/${qr.data?.img}`}
              onClick={onOpen}
            />
            {isOpen && <CustomModal
              buttonLabel={""}
              colorLight="gray.200"
              colorDark="#333333"
              isOpen={isOpen}
              onClose={onClose}
            >
              <Stack placeItems={"center"}>
                <Image
                  boxSize={{ md: "md", base: 52 }}
                  src={`http://127.0.0.1:8000/storage/${qr.data?.img}`}
                  onClick={() => {}}
                />
              </Stack>
            </CustomModal>}
          </>
        )}
      </Stack>
      <ExhImages images={info.data?.media} fun={info.refetch} />

      <Stack
        padding={10}
        marginTop={10}
        marginBottom={width < 636 ? -32 : 0}
        style={{
          height: (height * 8) / 20,
          width: (width * 5) / 6,
        }}
      >
        <Box>
          <Text fontSize={20}>
            <Icon
              boxSize={5}
              marginBottom={-1}
              marginRight={2}
              as={TbCategory2}
            />
            <b> Categorys: </b>
          </Text>{" "}
          <Box marginTop={2}>
            {info.data?.sections
              ? info.data?.sections.map((info, index) => (
                  <Tag
                    key={index}
                    size={"lg"}
                    marginX={1}
                    marginTop={2}
                    borderRadius="full"
                    variant="solid"
                    bgColor={"yellow.400"}
                    width={"fit-content"}
                  >
                    <TagLabel marginX={3}>{info.name}</TagLabel>
                  </Tag>
                ))
              : skeletons.map((ske) => (
                  <Skeleton
                    size={"lg"}
                    key={ske}
                    borderRadius="full"
                  ></Skeleton>
                ))}
          </Box>
          <Text fontSize={20} marginBottom={10} marginTop={10} color={white}>
            <Icon
              boxSize={6}
              marginBottom={-1}
              marginRight={2}
              as={MdEditNote}
            />
            <b>description:</b>
            <p style={{ marginTop: 14, marginLeft: 10, fontSize: 16 }}>
              {info.data?.body}
            </p>
          </Text>
        </Box>
        <Text marginBottom={8} marginLeft={4}>
          <b
            style={{
              marginLeft: -18,
              marginRight: 10,
              fontSize: 20,
            }}
          >
            <Icon
              boxSize={6}
              marginBottom={-1}
              marginRight={1}
              as={IoTicketOutline}
            />{" "}
            Tickets:{" "}
          </b>
          <text style={{ color: "#66BB6A" }}>
            {info?.data?.price == 0 || !info?.data?.price
              ? "free"
              : info?.data?.price}
            $
          </text>
        </Text>

        <Text marginBottom={8}>
          <p style={{ marginBottom: -14, fontSize: 20 }}>
            <b>
              <Icon
                boxSize={6}
                marginBottom={-1}
                marginRight={1}
                as={PiCalendarCheckDuotone}
              />{" "}
              Date:{" "}
            </b>
          </p>
          <br />
          <b style={{ marginRight: 5, marginLeft: 10 }}>from: </b>
          {info.data?.start_date}{" "}
          <b style={{ marginRight: 5, marginLeft: 30 }}>to: </b>
          {info.data?.start_date}
        </Text>

        <Text marginBottom={8}>
          <p style={{ marginBottom: -14, fontSize: 20 }}>
            <b>
              <Icon
                boxSize={6}
                marginBottom={-1}
                marginRight={1}
                as={PiClockUser}
              />{" "}
              Opening time:{" "}
            </b>{" "}
          </p>
          <br />
          <b style={{ marginRight: 5, marginLeft: 10 }}>from: </b>
          {info.data?.time.substring(0, 8)}{" "}
          <b style={{ marginRight: 5, marginLeft: 30 }}>to: </b>
          {info.data?.time.substring(11, 19)}
        </Text>

        <Text fontSize={20}>
          <Icon
            boxSize={5}
            marginBottom={-1}
            marginRight={2}
            as={GrMapLocation}
          />
          <b>Location</b>{" "}
        </Text>
        <Link marginLeft={3} marginBottom={10}>
          {info.data?.location}
        </Link>

        <Text fontSize={20}>
          <Icon
            boxSize={5}
            marginBottom={-1}
            marginRight={2}
            as={FaRegHandshake}
          />
          <b>Sponser</b>
        </Text>
        <Box marginLeft={10} marginTop={0}>
          {info.data?.exhibition_sponser?.map((spons, index) => (
            <HStack
              margin={3}
              boxSize={"fit-content"}
              key={index}
              bgColor={"gray.300"}
              height={16}
              width={44}
              borderRadius={10}
              paddingLeft={4}
            >
              <Avatar src={`http://127.0.0.1:8000/storage/${spons.img}`} />
              <Text fontWeight="bold">{spons.name}</Text>
            </HStack>
          ))}
        </Box>
        <Divider marginY={10} borderColor={white} />
      </Stack>
    </div>
  );
};

export default CompShowExh;
