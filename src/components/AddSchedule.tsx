import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { MdAlternateEmail } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { HiOutlinePhotograph } from "react-icons/hi";
import validator from "validator";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import {
  PiArticleNyTimes,
  PiChalkboardTeacherLight,
  PiReadCvLogo,
  PiClockCountdownLight,
} from "react-icons/pi";
import { MdOutlineTitle } from "react-icons/md";
import { css } from "@emotion/react";
import { UseMutationResult } from "@tanstack/react-query";
import useAddSchedule from "../hooks/useAddSchedule";
import apiClient from "../services/apiClient";

interface Props {
  closeModal: () => void;
}
const AddSchedule = ({ closeModal }: Props) => {
  const addSch = useAddSchedule();

  const [disabled, setDisabled] = useState(false);

  // refs
  const refTopic = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refSummery = useRef<HTMLInputElement>(null);
  const refname = useRef<HTMLInputElement>(null);
  const refBody = useRef<HTMLInputElement>(null);
  const refTime = useRef<HTMLInputElement>(null);
  const refDate = useRef<HTMLInputElement>(null);
  const refAbout = useRef<HTMLInputElement>(null);
  const refLinkdin = useRef<HTMLInputElement>(null);
  const refFacebook = useRef<HTMLInputElement>(null);

  // warnings

  const [topicWarning, setTopicWarning] = useState(true);
  const [summeryWarning, setSummeryWarning] = useState(true);
  const [emailWarning, setEmailWarning] = useState(true);
  const [nameWarning, setNameWarning] = useState(true);
  const [bodyWarning, setBodyWarning] = useState(true);
  const [timeWarning, setTimeWarning] = useState(true);
  const [dateWarning, setDateWarning] = useState(true);
  const [aboutWarning, setAboutWarning] = useState(true);
  const [linkdinWarning, setLinkdinWarning] = useState(false);
  const [facebookWarning, setFacebookWarning] = useState(false);

  const [image, setImage] = useState<File>();

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

  const handleFileChange = () => {
    const data = new FormData();

    if (image) data.append("img", image);
    if (refTopic.current?.value)
      data.append("topic_name", refTopic.current?.value);
    if (refname.current?.value)
      data.append("speaker_name", refname.current?.value);
    if (refSummery.current?.value)
      data.append("summary", refSummery.current?.value);
    if (refBody.current?.value) data.append("body", refBody.current?.value);
    if (refTime.current?.value)
      data.append("time", convertTo24HourFormat(refTime.current?.value));
    if (refDate.current?.value) data.append("date", refDate.current?.value);
    if (refAbout.current?.value)
      data.append("about_speaker", refAbout.current?.value);
    if (refEmail.current?.value)
      data.append("speaker_email", refEmail.current?.value);
    if (refLinkdin.current?.value)
      data.append("linkedin", refLinkdin.current?.value);
    if (refFacebook.current?.value)
      data.append("facebook", refFacebook.current?.value);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apiClient
      .post(
        `http://127.0.0.1:8000/api/exhibitions/addSchedule/${localStorage.getItem(
          "CurrentExhId"
        )}`,
        data,
        config
      )
      .then((res) => {
        closeModal();
        //   (window.location as any).reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack>
      <Stack margin={4} spacing={4} height={300} style={{ overflowY: "auto" }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={MdOutlineTitle} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refTopic}
            type="text"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="Topic name"
            marginBottom={nameWarning ? 3 : 0}
            onChange={(e) => {
              if (!e.target.value) {
                setTopicWarning(true);
                setDisabled(true);
              } else {
                setTopicWarning(false);
                setDisabled(false);
              }
            }}
          />
        </InputGroup>
        {topicWarning && (
          <p style={{ margin: 4, color: "#ff4545", marginTop: "-30px" }}>
            topic name is required
          </p>
        )}

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={RiAccountCircleLine} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refname}
            type="text"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="Speaker name"
            marginBottom={nameWarning ? 3 : 0}
            onChange={(e) => {
              if (!e.target.value) {
                setNameWarning(true);
                setDisabled(true);
              } else {
                setNameWarning(false);
                setDisabled(false);
              }
            }}
          />
        </InputGroup>
        {nameWarning && (
          <p style={{ margin: 4, color: "#ff4545", marginTop: "-30px" }}>
            name is required
          </p>
        )}

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={PiReadCvLogo} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refSummery}
            type="text"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="Summery"
            marginBottom={summeryWarning ? 3 : 0}
            onChange={(e) => {
              if (!e.target.value) {
                setSummeryWarning(true);
                setDisabled(true);
              } else {
                setSummeryWarning(false);
                setDisabled(false);
              }
            }}
          />
        </InputGroup>
        {summeryWarning && (
          <p style={{ color: "#ff4545", marginTop: "-30px" }}>
            Summery is required
          </p>
        )}

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={PiArticleNyTimes} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refBody}
            type="text"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="Body"
            marginBottom={bodyWarning ? 1 : 0}
            onChange={(e) => {
              if (!e.target.value) {
                setBodyWarning(true);
                setDisabled(true);
              } else {
                setBodyWarning(false);
                setDisabled(false);
              }
            }}
          />
        </InputGroup>
        {bodyWarning && (
          <p style={{ color: "#ff4545", marginTop: "-30px" }}>
            Body is required
          </p>
        )}

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={PiClockCountdownLight} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refTime}
            type="time"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="Time"
            marginBottom={timeWarning ? 3 : 0}
            css={css`
              &::-webkit-calendar-picker-indicator {
                display: none;
              }
              &::-webkit-inner-spin-button {
                display: none;
              }
            `}
            onChange={(e) => {
              if (!e.target.value) {
                setTimeWarning(true);
                setDisabled(true);
              } else {
                setTimeWarning(false);
                setDisabled(false);
              }
            }}
          />
        </InputGroup>
        {timeWarning && (
          <p style={{ color: "#ff4545", marginTop: "-30px" }}>
            Time is required
          </p>
        )}

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={BsCalendarDate} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refDate}
            type="date"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="Date"
            marginBottom={dateWarning ? 3 : 0}
            css={css`
              &::-webkit-calendar-picker-indicator {
                display: none;
              }
              &::-webkit-inner-spin-button {
                display: none;
              }
            `}
            onChange={(e) => {
              if (!e.target.value) {
                setDateWarning(true);
                setDisabled(true);
              } else {
                setDateWarning(false);
                setDisabled(false);
              }
            }}
          />{" "}
        </InputGroup>
        {dateWarning && (
          <p style={{ color: "#ff4545", marginTop: "-30px" }}>
            Date is required
          </p>
        )}

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={PiChalkboardTeacherLight} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refAbout}
            type="url"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="About speaker"
            marginBottom={aboutWarning ? 3 : 0}
            onChange={(e) => {
              if (!e.target.value) {
                setAboutWarning(true);
                setDisabled(true);
              } else {
                setAboutWarning(false);
                setDisabled(false);
              }
            }}
          />
        </InputGroup>
        {aboutWarning && (
          <p style={{ color: "#ff4545", marginTop: "-30px" }}>
            About speaker is required
          </p>
        )}

        <InputGroup marginTop={1} marginBottom={-3}>
          <InputLeftElement pointerEvents="none">
            <Icon as={HiOutlinePhotograph} color="gray.500" marginBottom={3} />
          </InputLeftElement>
          <Input
            type="file"
            accept="image/*"
            placeholder="speaker"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setImage(file);
              }
            }}
            border={"hidden"}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={MdAlternateEmail} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refEmail}
            type="email"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="Speaker email"
            marginBottom={emailWarning ? 3 : 0}
            onChange={(e) => {
              if (
                !e.target.value.match(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                )
              ) {
                setEmailWarning(true);
                setDisabled(true);
              } else {
                setEmailWarning(false);
                setDisabled(false);
              }
            }}
          />
        </InputGroup>
        {emailWarning && (
          <p style={{ color: "#ff4545", marginTop: "-30px" }}>invalid Email</p>
        )}

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={IoLogoLinkedin} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refLinkdin}
            type="url"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="Speaker Linkdin"
            marginBottom={linkdinWarning ? 3 : 0}
            onChange={(e) => {
              if (!validator.isURL(e.target.value)) {
                setLinkdinWarning(true);
                setDisabled(true);
              } else {
                setLinkdinWarning(false);
                setDisabled(false);
              }
            }}
          />
        </InputGroup>
        {linkdinWarning && (
          <p style={{ color: "#ff4545", marginTop: "-30px" }}>
            invalid Linkdin
          </p>
        )}

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaFacebookF} color="gray.500" />
          </InputLeftElement>
          <Input
            ref={refFacebook}
            type="url"
            variant="flushed"
            borderColor={"gray.400"}
            placeholder="Speaker Facebook"
            marginBottom={facebookWarning ? 3 : 0}
            onChange={(e) => {
              if (!validator.isURL(e.target.value)) {
                setFacebookWarning(true);
                setDisabled(true);
              } else {
                setFacebookWarning(false);
                setDisabled(false);
              }
            }}
          />
        </InputGroup>
        {facebookWarning && (
          <p style={{ color: "#ff4545", marginTop: "-30px" }}>
            invalid Facebook
          </p>
        )}
      </Stack>
      <Button
        colorScheme={disabled ? "gray" : "blue"}
        textColor={disabled ? "black" : "white"}
        isDisabled={disabled}
        marginY={3}
        onClick={() => {
          event?.preventDefault();
          handleFileChange();
        }}
      >
        {" "}
        Add{" "}
      </Button>
    </Stack>
  );
};

export default AddSchedule;
