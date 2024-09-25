import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "../MyCalendar.css";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import { PiPlusBold, PiCaretDownLight } from "react-icons/pi";
import useFetchSchedule from "../hooks/useFetchSchedule";
import interactionPlugin from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core";
import CustomModal from "./CustomModal";
import AddEmp from "./AddEmp";
import AddSchedule from "./AddSchedule";
import resizeWindow from "../services/resizeWindow";

interface EventExtendedProps {
  speaker: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  extendedProps: EventExtendedProps;
}
const renderEventContent = (eventInfo: EventContentArg) => {
  const { speaker } = eventInfo.event.extendedProps as EventExtendedProps;
  return (
    <div>
      <b>{eventInfo.timeText}</b>
      <p>{eventInfo.event.title}</p>
      <br />
      <div>
        <b>speaker: </b> {speaker}
      </div>
    </div>
  );
};
const Schedule = () => {
  let skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const { width, height } = resizeWindow();

  const schedule = useFetchSchedule(localStorage.getItem("CurrentExhId"));

  const colors = [
    "#8F8CF2",
    "#6495ED",
    "#F9A7B0",
    "#FC89AC",
    "#CDB4DB",
    "#FFDA73", //
    "#87CEEB",
  ];

  const white = useColorModeValue("gray.200", "#262728");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const date = () => {
    let startOfWeek = "2025-01-01";
    schedule.data?.forEach((element) => {
      const date1 = new Date(startOfWeek);
      const date2 = new Date(element.date);
      if (date2 < date1) {
        startOfWeek = element.date;
      }
    });
    console.log(startOfWeek);
    return startOfWeek;
  };

  const k = (timeString: string) => {
    // Convert to Date object
    let date = new Date(timeString);

    // Add 2 hours
    date.setHours(date.getHours() + 6);

    // Convert back to string
    let newTimeString = date.toISOString().replace("T", " ").substring(0, 19);
    return newTimeString;
  };
  const events = schedule.data?.map((info, index) => ({
    title: info.topic_name,
    extendedProps: {
      speaker: info.speaker_name,
    },
    start: info.date + " " + info.time,
    end: k(info.date + " " + info.time),
    color: colors[Math.floor(Math.random() * colors.length)],
  })); //#8F8CF2  6495ED  F9A7B0 FC89AC CDB4DB  FFD700 87CEEB

  return (
    <Box display={"flex"} height={"87%"}>
      {localStorage.getItem("useroles") != "company" &&
        !schedule.isLoading &&
        !isOpen && (
          <Tooltip
            label="Add new event"
            placement="bottom"
            bg="#FFDA73"
            color="black"
          >
            <span
              style={{
                zIndex: 99999,
                display: "inline-block",
                position: "fixed",
                marginLeft: "calc(63% - 100px)",
                marginTop: "1vh",
              }}
            >
              <Icon
                boxShadow={"lg"}
                boxSize={12}
                padding={2}
                borderRadius={100}
                bgColor={"#FFDA73"}
                as={PiPlusBold}
                onClick={onOpen}
              />
            </span>
          </Tooltip>
        )}

      <Box flex={3} margin={2}>
        {schedule.isLoading ? (
          <Stack>
            <HStack justifyContent={"space-between"}>
              <HStack>
                <Skeleton boxSize={12} borderRadius={8} />
                <Skeleton boxSize={12} borderRadius={8} />
              </HStack>
              <SkeletonText width={44} />
              <Skeleton boxSize={12} borderRadius={100} />
            </HStack>
            <Skeleton
              boxSize={width / 2}
              width={{ base: width / 1.8, lg: width / 1.9 }}
              borderRadius={14}
            />
          </Stack>
        ) : (
          <FullCalendar
            height={"100%"}
            dateAlignment="week"
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            initialDate={date()}
            headerToolbar={{
              left: "prev,next",
              right: "",
              center: "title",
            }}
            events={events}
            eventContent={renderEventContent}
          />
        )}
      </Box>

      <Box flex={1} marginY={20} marginX={3}>
        <Heading
          size={"md"}
          marginBottom={3}
          marginLeft={!schedule.isLoading ? 0 : -10}
        >
          Speakers info
        </Heading>
        <Stack
          height={500}
          marginLeft={!schedule.isLoading ? 0 : -10}
          style={{ overflowY: "auto" }}
        >
          {schedule.isLoading ? (
            skeletons.map((index) => (
              <HStack
                key={index}
                bgColor={white}
                padding={2}
                borderRadius={10}
                width={"100%"}
                height={16}
              >
                <SkeletonCircle size="12" padding={5} />
                <SkeletonText width={70} />
              </HStack>
            ))
          ) : (
            <>
              {schedule.data?.length ? (
                schedule.data?.map((info, index) => (
                  <HStack
                    key={index}
                    bgColor={white}
                    padding={2}
                    borderRadius={10}
                    width={"100%"}
                    height={16}
                    justifyContent={"space-between"}
                  >
                    {" "}
                    <HStack>
                      <Avatar
                        src={`http://127.0.0.1:8000/storage/${info.img}`}
                      />
                      <Box>
                        <Heading size="sm">{info.speaker_name}</Heading>
                        <Text fontSize={"sm"}>{info.topic_name}</Text>
                      </Box>
                    </HStack>
                    <Popover placement="bottom-start">
                      <PopoverTrigger>
                        <Button boxSize={9} bgColor={white}>
                          {" "}
                          <Icon as={PiCaretDownLight} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverHeader fontWeight="semibold">
                          Speaker information
                          {localStorage.getItem("useroles") != "company" && (
                            <IconButton
                              aria-label=""
                              colorScheme="blue"
                              marginLeft={3}
                              icon={<FaUserEdit />}
                              borderRadius={100}
                              boxSize={5}
                            />
                          )}
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody marginBottom={3}>
                          <p>
                            <b>name:</b> {info.speaker_name}
                          </p>
                          <p>
                            <b>about:</b> {info.about_speaker}
                          </p>
                          <p>
                            <b>email:</b>{" "}
                            <Link color={"blue.500"}>{info.speaker_email}</Link>
                          </p>
                          <p>
                            <b>linkedin:</b>{" "}
                            <Link color={"blue.500"}>{info.linkedin}</Link>
                          </p>
                          <p>
                            <b>facebook:</b>{" "}
                            <Link color={"blue.500"}>{info.facebook}</Link>
                          </p>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                ))
              ) : (
                <Text color={"gray"}>No Speakers yet</Text>
              )}
            </>
          )}
        </Stack>
      </Box>
      {isOpen && (
        <CustomModal
          buttonLabel={"Event info"}
          isOpen={isOpen}
          onClose={onClose}
          colorLight="gray.200"
          colorDark="#333333"
        >
          <AddSchedule
            closeModal={() => {
              onClose();
              schedule.refetch();
            }}
          />
        </CustomModal>
      )}
    </Box>
  );
};

export default Schedule;
