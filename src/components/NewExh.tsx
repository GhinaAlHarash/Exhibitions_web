import {
  Box,
  Button,
  Divider,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ExhImages from "./ExhImages";
import { useEffect, useRef, useState } from "react";
import resizeWindow from "../services/resizeWindow";
import {
  PiCalendarCheckDuotone,
  PiCalendarMinusDuotone,
  PiClockUser,
} from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { IoTicketOutline } from "react-icons/io5";
import { MdEditNote } from "react-icons/md";
import { BsAlphabetUppercase } from "react-icons/bs";
import headaer1 from "../assets/headaer1.jpg";
import whatDo1 from "../assets/whatDo1.jpg";
import whatDo2 from "../assets/whatDo2.jpg";
import whatDo3 from "../assets/whatDo3.jpg";
import addphoto from "../assets/addphoto.jpg";
import useNewExh from "../hooks/useNewExh";
import CustomModal from "./CustomModal";

const NewExh = () => {
  const newExh = useNewExh();

  const { width, height } = resizeWindow();

  const [dis, setDis] = useState("");
  const [SD, setSD] = useState("");
  const [FD, setFD] = useState("");
  const [ST, setST] = useState("");
  const [FT, setFT] = useState("");
  const [loc, setLoc] = useState("");
  const [ticket, setTicket] = useState("free");
  const [price, setPrice] = useState("0");

  const white = useColorModeValue("gray.700", "white");
  const whiteB = useColorModeValue("gray.400", "white");
  const whitetext = useColorModeValue("gray.200", "gray.500");

  const refname = useRef<HTMLInputElement>(null);

  const [cnt, setCnt] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //warnings
  const [nameWarning, setNameWarning] = useState(true);
  const [name30Warning, setName30Warning] = useState(false);
  const [disWarning, setDisWarning] = useState(true);
  const [dateWarning, setDateWarning] = useState(true);
  const [dateFWarning, setDateFWarning] = useState(true);
  const [timeWarning, setTimeWarning] = useState(true);
  const [locationWarning, setLocationWarning] = useState(true);

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

  let images = [
    addphoto,
    headaer1,
    whatDo1,
    whatDo2,
    whatDo3,
    headaer1,
    whatDo1,
  ];

  useEffect(() => {
    if (newExh.data?.status == 200) {
      setFD("");
      setST("");
      setFT("");
      setSD("");
      setDis("");
      setPrice("0");
      setTicket("free");

      setNameWarning(true);
      setName30Warning(false);
      setDisWarning(true);
      setDateWarning(true);
      setDateFWarning(true);
      setTimeWarning(true);
      setLocationWarning(true);
    }
  }, [newExh]);

  return (
    <div style={{ overflowX: width < 482 ? "auto" : "hidden", height:'100%' }} >
      <Text margin={10} fontSize={18}>
        <Icon
          boxSize={6}
          marginBottom={-1.5}
          marginRight={2}
          as={BsAlphabetUppercase}
        />{" "}
        Exhibition Name:
        <Input
          ref={refname}
          marginTop={2}
          marginLeft={3}
          width={width / 2}
          bgColor={whitetext}
          borderColor={whiteB}
          placeholder="name"
          onChange={(e) => {
            if (!e.target.value) {
              setNameWarning(true);
            } else {
              setNameWarning(false);
            }

            if (e.target.value.length > 30) {
              setName30Warning(true);
            } else {
              setName30Warning(false);
            }
          }}
        />
        {nameWarning && (
          <Text marginTop={7} marginLeft={{ base: 5, md: 48 }}>
            <p style={{ color: "#ff4545", marginTop: "-30px", fontSize: 16 }}>
              name required
            </p>
          </Text>
        )}
        {name30Warning && (
          <Text marginTop={7} marginLeft={{ base: 5, md: 48 }}>
            <p style={{ color: "#ff4545", marginTop: "-30px", fontSize: 16 }}>
              name must less than 30 character
            </p>
          </Text>
        )}
      </Text>
      {/*<ExhImages images={images} />*/}
      <Stack
        padding={10}
        marginTop={5}
        marginBottom={width < 636 ? -32 : 0}
        style={{
          height: (height * 8) / 20,
          width: (width * 5) / 6,
        }}
      >
        <Box>
          <Text fontSize={20} marginBottom={5} color={white}>
            <Icon
              boxSize={6}
              marginBottom={-1}
              marginRight={2}
              as={MdEditNote}
            />
            description:
          </Text>
          <Textarea
            bgColor={whitetext}
            borderColor={white}
            borderRadius={10}
            height={{ base: 60, md: 160 }}
            value={dis}
            onChange={(e) => {
              e.target.value ? setDis(e.target.value) : setDis(" ");
              if (!e.target.value) {
                setDisWarning(true);
              } else {
                setDisWarning(false);
              }
            }}
            placeholder={"description"}
            textColor={white}
            size="sm"
            fontSize={16}
          />
          {disWarning && (
            <Text marginTop={7} marginLeft={2}>
              <p style={{ color: "#ff4545", marginTop: "-30px", fontSize: 16 }}>
                description required
              </p>
            </Text>
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
        </Text>
        <Stack
          marginX={10}
          marginTop={5}
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: 7, sm: 0 }}
        >
          <RadioGroup onChange={setTicket} value={ticket}>
            <Stack direction="row" spacing={4} marginRight={7} color={white}>
              <Radio value="free">free</Radio>
              <Radio value="paid">paid</Radio>
            </Stack>
          </RadioGroup>

          {ticket == "paid" && (
            <InputGroup>
              <InputLeftElement color="green.500" fontSize="1.2em">
                $
              </InputLeftElement>
              <Input
                value={price == "0" ? "" : price}
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
            </Text>

            <Input
              width={{ md: width / 3, base: (width * 2.5) / 4 }}
              borderColor={whiteB}
              type="date"
              value={SD}
              onChange={(e) => {
                console.log(e.target.value);
                setSD(e.target.value);
                if (!e.target.value) {
                  setDateWarning(true);
                } else {
                  setDateWarning(false);
                }
              }}
            />
            {(dateWarning || dateFWarning) && (
              <Text marginTop={7} marginLeft={2}>
                <p
                  style={{ color: "#ff4545", marginTop: "-30px", fontSize: 16 }}
                >
                  date required
                </p>
              </Text>
            )}
          </Box>
          <Box>
            <Text marginBottom={FD ? 2 : 3}>
              <Icon
                as={PiCalendarMinusDuotone}
                boxSize={5}
                marginBottom={-1}
                marginRight={2}
              />
              End Date
            </Text>
            <Input
              width={{ md: width / 3, base: (width * 2.5) / 4 }}
              borderColor={whiteB}
              type="date"
              value={FD}
              onChange={(e) => {
                console.log(e.target.value);
                setFD(e.target.value);
                if (!e.target.value) {
                  setDateFWarning(true);
                } else {
                  setDateFWarning(false);
                }
              }}
            />
          </Box>
        </Stack>

        <Divider marginY={10} borderColor={white} />

        <Text fontSize={20}>
          <Icon
            boxSize={6}
            marginBottom={-1}
            marginRight={2}
            as={PiClockUser}
          />
          Opening time
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
                if (!e.target.value) {
                  setTimeWarning(true);
                } else {
                  setTimeWarning(false);
                }
              }}
              borderColor={whiteB}
              value={convertTo24HourFormat(ST)}
            />{" "}
            {timeWarning && (
              <Text marginTop={7} marginLeft={2}>
                <p
                  style={{ color: "#ff4545", marginTop: "-30px", fontSize: 16 }}
                >
                  time required
                </p>
              </Text>
            )}
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
              value={convertTo24HourFormat(FT)}
            />
          </Box>
        </Stack>
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
        <Link>
          <Input
            placeholder="location"
            marginBottom={10}
            borderColor={whiteB}
            onChange={(e) => {
              console.log(e.target.value);
              setLoc(e.target.value);
              if (!e.target.value) {
                setLocationWarning(true);
              } else {
                setLocationWarning(false);
              }
            }}
          />
        </Link>
        {locationWarning && (
          <Text marginLeft={2}>
            <p style={{ color: "#ff4545", marginTop: "-47px", fontSize: 16 }}>
              location required
            </p>
          </Text>
        )}

        <Stack placeItems={"center"}>
          <Button
            width={width / 2}
            isDisabled={
              nameWarning ||
              name30Warning ||
              disWarning ||
              dateWarning ||
              dateFWarning ||
              timeWarning ||
              locationWarning
            }
            bgColor="yellow.400"
            colorScheme="yellow"
            color={"black"}
            marginTop={5}
            padding={5}
            onClick={() => {
              onOpen();
              event?.preventDefault();
              let t = formattedTime(ST) + " - " + formattedTime(FT);
              newExh.mutate({
                id: 0,
                title: refname.current?.value,
                cover_img: "",
                body: dis,
                start_date: SD,
                end_date: FD,
                time: t,
                price: ticket == "free" ? 0 : price == "0" ? 0 : Number(price),
                location: loc,
                exhibition_map: "",
                number_of_stands: 0,
              });
            }}
          >
            Send Request
          </Button>
        </Stack>
        <Divider marginY={10} borderColor={white} />
      </Stack>

      {isOpen && (
        <CustomModal
          buttonLabel={""}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            newExh.data?.status == 200 ? (window.location as any).reload() : "";
          }}
          colorLight="gray.400"
          colorDark="#333333"
        >
          <Text
          fontSize={18}
            textColor={
              newExh.isLoading
                ? "white"
                : newExh.data?.status == 200
                ? "green"
                : "red"
            }
            marginTop={-3}
            marginBottom={3}
          >
            {newExh.isLoading
              ? "Loading..."
              : newExh.data?.status == 500 || newExh.data?.status == 200
              ? newExh.data.message
              : "The title has already been taken."}{" "}
          </Text>
        </CustomModal>
      )}
    </div>
  );
};

export default NewExh;
