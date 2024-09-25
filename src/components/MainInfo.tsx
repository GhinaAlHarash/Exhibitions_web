import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ExhImages from "./ExhImages";
import { ChangeEvent, useEffect, useState } from "react";
import resizeWindow from "../services/resizeWindow";
import {
  PiCalendarCheckDuotone,
  PiCalendarMinusDuotone,
  PiClockUser,
  PiCaretRightBold,
} from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { LiaSitemapSolid } from "react-icons/lia";
import { IoTicketOutline } from "react-icons/io5";
import { MdEditNote } from "react-icons/md";
import { PiXBold } from "react-icons/pi";
import useFetchOneExh from "../hooks/useFetchOneExh";
import { FaRegHandshake } from "react-icons/fa";
import { TbCategory2, TbZoomInArea, TbZoomOutArea } from "react-icons/tb";
import { FaSquarePlus } from "react-icons/fa6";
import useAppSections from "../hooks/useAppSections";
import useAddSecToExh from "../hooks/useAddSecToExh";
import AddSponser from "./AddSponser";
import noMap from "../assets/noMap.png";
import useDelSpons from "../hooks/useDelSpons";
import useDelExhGat from "../hooks/useDelExhGat";
import useUpdateExh from "../hooks/useUpdateExh";
import StatusStepper from "./StatusStepper";
import apiClient from "../services/apiClient";
import useMaininfoStore from "../stores/useRerender";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import useShowUpdate from "../hooks/useShowUpdate";
import useAcceptChanges from "../hooks/useAcceptChanges";
import useDeclineChanges from "../hooks/useDeclineChanges";
import { useNavigate } from "react-router-dom";
import usedeleteExh from "../hooks/usedeleteExh";

const Maininfo = () => {
  let skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const showupdates = useShowUpdate();
  const info = useFetchOneExh();

  const navigate = useNavigate();

  const [accChanges, setAccchanges] = useState(false);
  const [decChanges, setDecChanges] = useState(false);

  useAcceptChanges(accChanges, () => {
    setAccchanges(false);
    showupdates.refetch();
    info.refetch();
  });

  useDeclineChanges(decChanges, () => {
    setDecChanges(false);
    showupdates.refetch();
    info.refetch();
  });

  const [delExh, setDelExh] = useState(false);
  const DeletExh = usedeleteExh(delExh, () => {
    localStorage.removeItem("CurrentPage");
    localStorage.setItem("CurrentPage", "exhabitations");
    navigate("/dash/exhabitations");
  });

  const [delSpon, setDelSpon] = useState(false);
  const [idSpon, setIdSpon] = useState(-1);

  const [delGat, setDelGat] = useState(false);
  const [idGat, setIdGat] = useState(-1);

  const sections = useAppSections();
  const delSponser = useDelSpons(delSpon, idSpon, () => info.refetch());
  const delGategory = useDelExhGat(delGat, idGat, () => info.refetch());
  const AddSecToExh = useAddSecToExh();
  const update = useUpdateExh(() => info.refetch());

  const [ticket, setTicket] = useState("");
  const [price, setPrice] = useState("");
  const { width, height } = resizeWindow();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dis, setDis] = useState("");
  const [SD, setSD] = useState("");
  const [FD, setFD] = useState("");
  const [ST, setST] = useState("");
  const [FT, setFT] = useState("");
  const [resetUpdate, setResetUpdate] = useState(true);
  const [addsec, setAddSec] = useState(1);
  const [hi, setHi] = useState(0);
  const [refetch, setRefetch] = useState(0);

  const { isOpen: isOpenMore, onToggle } = useDisclosure();

  const white = useColorModeValue("gray.700", "white");
  const whiteB = useColorModeValue("gray.400", "white");
  const whitetext = useColorModeValue("gray.200", "gray.500");
  const bg = useColorModeValue("white", "gray.400");

  const formattedTime = (inputTime: string) => {
    console.log(inputTime);
    const [hours, minutes] = inputTime.split(":");
    const parsedHours = parseInt(hours, 10);
    const suffix = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours = parsedHours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${suffix}`;
  };

  function convertTo24HourFormat(time12Hour: string) {
    const [time, period] = time12Hour.split(" ");
    const [hours, minutes] = time.split(":");

    let convertedHours = parseInt(hours, 10);
    if (period === "PM") {
      convertedHours += 12;
    }

    // Ensure hours are in the range 00-23
    convertedHours %= 24;

    return `${convertedHours.toString().padStart(2, "0")}:${minutes}`;
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const data = new FormData();

    const file =
      event.target.files && event.target.files[0]
        ? event.target.files[0]
        : null;
    console.log(event.target.value.toString());

    if (file && hi) {
      data.append("cover_img", file);
      console.log("one");
    } else if (file) {
      data.append("exhibition_map", file);
      console.log("two");
    }
    if (info.data?.id) data.append("id", info.data?.id.toString());
    if (info.data?.body) data.append("body", info.data?.body);
    if (info.data?.title) data.append("title", info.data?.title);
    if (info.data?.start_date) data.append("start_date", info.data?.start_date);
    if (info.data?.end_date) data.append("end_date", info.data?.end_date);
    if (info.data?.time) data.append("time", info.data?.time);
    if (info.data?.price) data.append("price", info.data?.price.toString());
    if (info.data?.location) data.append("location", info.data?.location);
    if (info.data?.number_of_stands)
      data.append("number_of_stands", info.data?.number_of_stands.toString());

    apiClient
      .post(
        `http://127.0.0.1:8000/api/updateExhibition/${localStorage.getItem(
          "CurrentExhId"
        )}`,
        data
      )
      .then((res) => {
        info.refetch();
        setHi(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (id: string) => {
    document?.getElementById(id)?.click();
  };

  useEffect(() => {
    console.log("hi" + delGat);
    if (delSpon && delSponser.backStatus == 200) {
      setIdSpon(-1);
      setDelSpon(false);
    }

    if (delGat && delGategory.backStatus == 200) {
      setIdGat(-1);
      setDelGat(false);
    }

    if (!resetUpdate && update.data?.status == 200) {
      setFD("");
      setST("");
      setFT("");
      setSD("");
      setDis("");
      setPrice("");
      setTicket("");
      setResetUpdate(true);
    }
    if (refetch && AddSecToExh.data?.status == 200) {
      setRefetch(0);
      info.refetch();
    }
  }, [delSpon, info.data, refetch, delGat, sections, update]);

  return (
    <div style={{ overflowX: width < 482 ? "auto" : "hidden" }}>
      {update.isLoading ||
      delSponser.isLoading ||
      delGategory.isLoading ||
      AddSecToExh.isLoading ? (
        <></>
      ) : null}
      <Text paddingX={12} marginY={1} fontSize={25}>
        <Icon marginBottom={-1} as={PiCaretRightBold} marginRight={2} />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="hi"
        />
        <Tooltip
          label="edit cover image"
          placement="bottom"
          bg="gray.300"
          color="black"
        >
          <Avatar
            marginX={2}
            onClick={() => {
              setHi(1);
              handleClick("hi");
            }}
            src={`http://127.0.0.1:8000/storage/${info.data?.cover_img}`}
          />
        </Tooltip>
        {localStorage.getItem("CurrentExh")}{" "}
        {localStorage.getItem("useroles") == "employee" && (
          <Button
            colorScheme="red"
            marginLeft={5}
            height={8}
            onClick={() => {
              setDelExh(true);
            }}
          >
            delete
          </Button>
        )}
      </Text>
      <Box marginY={10} paddingBottom={10}>
        {(dis || FT || ST || FD || SD || ticket || price) && (
          <HStack paddingBottom={8} placeContent={"center"}>
            <Button
              fontSize={16}
              width={width / 3}
              colorScheme="blue"
              onClick={() => {
                setResetUpdate(false);
                let t =
                  (ST ? formattedTime(ST) : info.data?.time.substring(0, 8)) +
                  " - " +
                  (FT ? formattedTime(FT) : info.data?.time.substring(11, 19));
                update.mutate({
                  id: info.data?.id,
                  body: dis ? dis : info.data?.body,
                  title: info.data?.title,
                  cover_img: "",
                  start_date: SD ? SD : info.data?.start_date,
                  end_date: FD ? FD : info.data?.end_date,
                  time: t,
                  price:
                    ticket || price
                      ? ticket == "free"
                        ? 0
                        : price == "0"
                        ? 0
                        : Number(price)
                      : info.data?.price,
                  location: info.data?.location,
                  exhibition_map: "",
                  number_of_stands: info.data?.number_of_stands,
                });
              }}
            >
              update changes
            </Button>
          </HStack>
        )}

        {showupdates.data != null &&
          localStorage.getItem("useroles") == "employee" && (
            <HStack paddingBottom={5} placeContent={"center"} spacing={5}>
              <Button colorScheme="green" onClick={() => setAccchanges(true)}>
                Accept Changes
              </Button>
              <Button colorScheme="red" onClick={() => setDecChanges(true)}>
                Decline Changes
              </Button>
            </HStack>
          )}
        <ExhImages images={info.data?.media} fun={info.refetch} />
      </Box>

      {info.isLoading ? (
        <></>
      ) : (
        <StatusStepper
          status={
            info.data?.status && info.data?.status >= 0 ? info.data?.status : 0
          }
          fun={info.refetch}
        />
      )}
      <Divider margin={10} borderColor={white} />

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
            Categorys
          </Text>{" "}
          <Box marginTop={2}>
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <IconButton
                  marginTop={1}
                  marginRight={3}
                  boxSize={10}
                  bgColor={bg}
                  color={"blue.700"}
                  aria-label=""
                  icon={<FaSquarePlus size={28} />}
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>add category</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <HStack marginY={2}>
                      <Select
                        onChange={(val) => {
                          setAddSec(Number(val.target.value));
                        }}
                      >
                        {sections.data?.map((sec, index) => (
                          <option value={sec.id} key={index}>
                            {sec.name}
                          </option>
                        ))}
                      </Select>
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          console.log(addsec);
                          AddSecToExh.mutate({ sections: [{ id: addsec }] });
                          setRefetch(1);
                        }}
                      >
                        add
                      </Button>
                    </HStack>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>

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
                    <TagCloseButton
                      onClick={() => {
                        setIdGat(info.id);
                        setDelGat(true);

                        console.log("hi25" + delGat);
                        setRefetch(1);
                      }}
                    />
                    <TagLabel marginX={3}>{info.name}</TagLabel>
                  </Tag>
                ))
              : skeletons.map((index) => (
                  <Skeleton
                    size={"lg"}
                    key={index}
                    borderRadius="full"
                  ></Skeleton>
                ))}
          </Box>
          <Divider marginY={10} borderColor={white} />
          <Text fontSize={20} marginBottom={5} color={white}>
            <Icon
              boxSize={6}
              marginBottom={-1}
              marginRight={2}
              as={MdEditNote}
            />
            description:
            {dis && (
              <Badge marginLeft={3} bgColor={"blue.400"} textColor={"white"}>
                {" "}
                edited
              </Badge>
            )}
          </Text>
          <Textarea
            bgColor={whitetext}
            borderColor={white}
            borderRadius={10}
            height={{ base: 60, md: 160 }}
            value={dis ? dis : info.data?.body}
            onChange={(e) => {
              e.target.value ? setDis(e.target.value) : setDis(" ");
            }}
            placeholder={"description"}
            textColor={white}
            size="sm"
            fontSize={16}
          />
          {showupdates.data != null &&
            showupdates.data.body != info.data?.body && localStorage.getItem("useroles") == "employee" && (
              <Box marginTop={2}>
                <Badge
                  marginLeft={3}
                  marginTop={-1}
                  fontSize={13}
                  bgColor={"red.400"}
                  textColor={"white"}
                >
                  {" "}
                  Requested to change by organizer
                </Badge>

                <Link
                  onClick={onToggle}
                  marginLeft={2}
                  color={"gray.500"}
                  fontSize={13}
                >
                  <b>...show more</b>
                </Link>

                <Collapse in={isOpenMore} animateOpacity>
                  <Box
                    p="40px"
                    color="white"
                    mt="4"
                    bg="red.300"
                    rounded="md"
                    shadow="md"
                  >
                    <Text>
                      <b>new discription:</b> {showupdates.data.body}
                    </Text>
                  </Box>
                </Collapse>
              </Box>
            )}
        </Box>
        <Divider marginY={10} borderColor={white} />
        <Text fontSize={20} color={white}>
          <Icon
            as={IoTicketOutline}
            boxSize={6}
            marginBottom={-1}
            marginRight={2}
          />
          Tickets:{" "}
          {(ticket || price) && (
            <Badge marginLeft={3} bgColor={"blue.400"} textColor={"white"}>
              {" "}
              edited
            </Badge>
          )}
        </Text>
        <Stack
          marginX={10}
          marginTop={5}
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: 7, sm: 0 }}
        >
          <RadioGroup
            onChange={setTicket}
            value={
              ticket
                ? ticket
                : info.data?.price == 0 || !info.data?.price
                ? "free"
                : "paid"
            }
          >
            <Stack direction="row" spacing={4} marginRight={7} color={white}>
              <Radio value="free">free</Radio>
              <Radio value="paid">paid</Radio>
            </Stack>
          </RadioGroup>

          {(ticket
            ? ticket == "paid"
            : info.data?.price && info.data?.price != 0) && (
            <InputGroup>
              <InputLeftElement color="green.500" fontSize="1.2em">
                $
              </InputLeftElement>
              <Input
                value={
                  price
                    ? price == "0"
                      ? ""
                      : price
                    : info.data?.price.toString()
                }
                width={40}
                type="number"
                borderColor={whiteB}
                onChange={(e) => {
                  e.target.value ? setPrice(e.target.value) : setPrice("0");
                }}
              />
            </InputGroup>
          )}
        </Stack>
        {showupdates.data != null &&
          showupdates.data.price != info.data?.price && localStorage.getItem("useroles") == "employee" && (
            <Box marginTop={5}>
              <Badge
                marginLeft={3}
                marginTop={-1}
                fontSize={13}
                bgColor={"red.400"}
                textColor={"white"}
              >
                {" "}
                Requested to change by organizer
              </Badge>

              <Link
                onClick={onToggle}
                marginLeft={2}
                color={"gray.500"}
                fontSize={13}
              >
                <b>...show more</b>
              </Link>

              <Collapse in={isOpenMore} animateOpacity>
                <Box
                  p="40px"
                  color="white"
                  mt="4"
                  bg="red.300"
                  rounded="md"
                  shadow="md"
                >
                  <Text> new peice: {showupdates.data.price} $</Text>
                </Box>
              </Collapse>
            </Box>
          )}

        <Divider marginY={10} borderColor={white} />

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 5, md: 8 }}
        >
          <Box>
            <Text marginBottom={SD ? 2 : 3}>
              <Icon
                boxSize={5}
                marginBottom={-1}
                marginRight={2}
                as={PiCalendarCheckDuotone}
              />
              Start Date
              {SD && (
                <Badge marginLeft={3} bgColor={"blue.400"} textColor={"white"}>
                  {" "}
                  edited
                </Badge>
              )}
            </Text>

            <Input
              width={{ md: width / 3, base: (width * 2.5) / 4 }}
              borderColor={whiteB}
              type="date"
              value={SD ? SD : info.data?.start_date}
              onChange={(e) => {
                console.log(e.target.value);
                setSD(e.target.value);
              }}
            />
          </Box>
          <Box>
            <Text marginBottom={FD ? 2 : 3}>
              <Icon
                as={PiCalendarMinusDuotone}
                boxSize={5}
                marginBottom={-1}
                marginRight={2}
              />
              End Date{" "}
              {FD && (
                <Badge marginLeft={3} bgColor={"blue.400"} textColor={"white"}>
                  {" "}
                  edited
                </Badge>
              )}
            </Text>
            <Input
              width={{ md: width / 3, base: (width * 2.5) / 4 }}
              borderColor={whiteB}
              type="date"
              value={FD ? FD : info.data?.end_date}
              onChange={(e) => {
                console.log(e.target.value);
                setFD(e.target.value);
              }}
            />
          </Box>
        </Stack>
        {showupdates.data != null && localStorage.getItem("useroles") == "employee"&& 
          (showupdates.data.start_date != info.data?.start_date ||
            showupdates.data.end_date != info.data?.end_date) && (
            <Box marginTop={2}>
              <Badge
                marginLeft={3}
                marginTop={-1}
                fontSize={13}
                bgColor={"red.400"}
                textColor={"white"}
              >
                {" "}
                Requested to change by organizer
              </Badge>

              <Link
                onClick={onToggle}
                marginLeft={2}
                color={"gray.500"}
                fontSize={13}
              >
                <b>...show more</b>
              </Link>

              <Collapse in={isOpenMore} animateOpacity>
                <Box
                  p="40px"
                  color="white"
                  mt="4"
                  bg="red.300"
                  rounded="md"
                  shadow="md"
                >
                  <Text>
                    <b>new start date:</b> {showupdates.data.start_date}
                    <br />
                    <b>new end date:</b> {showupdates.data.end_date}
                  </Text>
                </Box>
              </Collapse>
            </Box>
          )}

        <Divider marginY={10} borderColor={white} />

        <Text fontSize={20}>
          <Icon
            boxSize={6}
            marginBottom={-1}
            marginRight={2}
            as={PiClockUser}
          />
          Opening time
          {(ST || FT) && (
            <Badge marginLeft={3} bgColor={"blue.400"} textColor={"white"}>
              {" "}
              edited
            </Badge>
          )}
        </Text>
        <Stack
          marginY={3}
          spacing={{ base: 5, md: 8 }}
          direction={{ base: "column", md: "row" }}
        >
          <Box>
            <Text>From </Text>
            <Input
              width={{ md: width / 3, base: (width * 2.5) / 4 }}
              type="time"
              onChange={(e) => {
                console.log(e.target.value);
                setST(e.target.value);
              }}
              borderColor={whiteB}
              value={
                ST
                  ? convertTo24HourFormat(ST)
                  : convertTo24HourFormat(
                      info.data?.time
                        ? info.data?.time.substring(0, 8)
                        : "00:00"
                    )
              }
            />{" "}
          </Box>
          <Box>
            <Text>To </Text>
            <Input
              width={{ md: width / 3, base: (width * 2.5) / 4 }}
              type="time"
              onChange={(e) => {
                console.log(e.target.value);
                setFT(e.target.value);
              }}
              borderColor={whiteB}
              value={
                FT
                  ? convertTo24HourFormat(FT)
                  : convertTo24HourFormat(
                      info.data?.time
                        ? info.data?.time.substring(11, 19)
                        : "00:00"
                    )
              }
            />
          </Box>
        </Stack>
        {showupdates.data != null && localStorage.getItem("useroles") == "employee"&& 
          showupdates.data.time != info.data?.time && (
            <Box marginTop={2}>
              <Badge
                marginLeft={3}
                marginTop={-1}
                fontSize={13}
                bgColor={"red.400"}
                textColor={"white"}
              >
                {" "}
                Requested to change by organizer
              </Badge>

              <Link
                onClick={onToggle}
                marginLeft={2}
                color={"gray.500"}
                fontSize={13}
              >
                <b>...show more</b>
              </Link>

              <Collapse in={isOpenMore} animateOpacity>
                <Box
                  p="40px"
                  color="white"
                  mt="4"
                  bg="red.300"
                  rounded="md"
                  shadow="md"
                >
                  <Text>
                    <b>new start time:</b>{" "}
                    {showupdates.data?.time?.substring(0, 8)}
                    <br />
                    <b>new start time:</b>{" "}
                    {showupdates.data?.time?.substring(11, 19)}
                  </Text>
                </Box>
              </Collapse>
            </Box>
          )}
        <Divider marginY={10} borderColor={white} />
        <Text fontSize={20}>
          <Icon
            boxSize={5}
            marginBottom={-1}
            marginRight={2}
            as={GrMapLocation}
          />
          Location
        </Text>
        <Stack direction={width < 1160 ? "column" : "row"}>
          <Text style={{ fontSize: 18 }} marginTop={width < 1160 ? 5 : 100}>
            Link:
            <br />
            <Link
              fontSize={16}
              color={"blue.300"}
              marginRight={width > 1160 ? 10 : 0}
            >
              {info.data?.location}
            </Link>
          </Text>
          <Box borderRadius={20} boxSize={350}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.522158214074!2d36.2765279!3d33.513807299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e16302cf2971%3A0xa5ef0ce61ef01516!2z2YXYr9mK2YbYqSDYp9mE2YXYudin2LHYtg!5e0!3m2!1sar!2s!4v1723745415439!5m2!1sar!2s"
              width="500"
              height="300"
              style={{ border: 0, borderRadius: 20 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Stack>
        <Divider marginY={10} borderColor={white} />
        <Text fontSize={20}>
          <Icon
            boxSize={5}
            marginBottom={-1}
            marginRight={2}
            as={LiaSitemapSolid}
          />
          Inner map
        </Text>
        <HStack marginLeft={5} marginTop={5}>
          <TransformWrapper>
            {({ zoomIn, zoomOut }) => (
              <>
                <Box
                  boxSize={64}
                  height={"fit-content"}
                  padding={1.5}
                  borderRadius={15}
                  bgColor={white}
                >
                  <TransformComponent>
                    <Image
                      borderRadius={10}
                      src={
                        info.data?.exhibition_map
                          ? `http://127.0.0.1:8000/storage/${info.data?.exhibition_map}`
                          : noMap
                      }
                      alt="Exhibition Map"
                    />
                  </TransformComponent>
                </Box>
                <Stack marginLeft={5}>
                  <HStack
                    marginBottom={-4}
                    marginTop={1}
                    className="zoom-controls"
                  >
                    <IconButton
                      marginTop={1}
                      boxSize={9}
                      marginLeft={1}
                      colorScheme="black"
                      bgColor={"green.600"}
                      color={"gray.200"}
                      aria-label=""
                      onClick={() => zoomIn()}
                      icon={<TbZoomInArea size={24} />}
                    />
                    <IconButton
                      marginTop={1}
                      marginLeft={1}
                      boxSize={9}
                      colorScheme="black"
                      bgColor={"red.500"}
                      color={"gray.200"}
                      aria-label=""
                      onClick={() => zoomOut()}
                      icon={<TbZoomOutArea size={24} />}
                    />
                  </HStack>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="mapImage"
                    />
                    <Button
                      width={24}
                      marginTop={10}
                      colorScheme="blue"
                      onClick={() => handleClick("mapImage")}
                    >
                      edit
                    </Button>
                  </div>
                </Stack>
              </>
            )}
          </TransformWrapper>
        </HStack>

        <Divider marginY={10} borderColor={white} />
        <Text fontSize={20}>
          <Icon
            boxSize={5}
            marginBottom={-1}
            marginRight={2}
            as={FaRegHandshake}
          />
          Sponser
        </Text>
        <Box>
          <Popover
            placement="bottom-end"
            onClose={onClose}
            isOpen={isOpen}
            onOpen={onOpen}
          >
            <PopoverTrigger>
              <IconButton
                marginTop={1}
                marginRight={3}
                boxSize={10}
                bgColor={bg}
                color={"blue.700"}
                aria-label=""
                icon={<FaSquarePlus size={28} />}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>add Sponser</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <AddSponser
                    closeModal={() => {
                      onClose();
                      info.refetch();
                    }}
                  />
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>

          <Box marginLeft={10} marginTop={-12}>
            {info.data?.exhibition_sponser?.map((spons, index) => (
              <HStack margin={3} boxSize={"fit-content"} key={index}>
                <Avatar src={`http://127.0.0.1:8000/storage/${spons.img}`} />
                <Text fontWeight="bold">{spons.name}</Text>
                <IconButton
                  aria-label=""
                  color={"white"}
                  bgColor={"red.600"}
                  icon={<PiXBold />}
                  borderRadius={100}
                  boxSize={5}
                  onClick={() => {
                    setIdSpon(spons.id);
                    setDelSpon(true);
                    console.log("cmoandaln222");
                    setRefetch(1);
                  }}
                />
              </HStack>
            ))}
          </Box>
        </Box>
        <Divider marginY={10} borderColor={white} />
      </Stack>
    </div>
  );
};

export default Maininfo;
