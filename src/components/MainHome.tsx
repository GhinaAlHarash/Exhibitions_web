import {
  Avatar,
  Box,
  Divider,
  Grid,
  HStack,
  Icon,
  Image,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import whatDo2 from "../assets/whatDo2.jpg";
import home4 from "../assets/home4.png";
import home5 from "../assets/home5.png";
import home6 from "../assets/home6.png";
import img11 from "../assets/img11.jpg";
import spons1 from "../assets/spons1.png";
import spons2 from "../assets/spons2.jpg";
import spons3 from "../assets/spons3.jpg";
import spons4 from "../assets/spons4.png";
import spons5 from "../assets/spons5.jpg";
import spons6 from "../assets/spons6.jpg";
import spons7 from "../assets/spons7.jpg";
import spons8 from "../assets/spons8.jpg";
import profile1 from "../assets/profile1.jpg";
import profile5 from "../assets/profile5.jpg";
import profile4 from "../assets/profile4.jpg";
import profile3 from "../assets/profile3.jpg";
import profile2 from "../assets/profile2.jpg";
import company from "../assets/company.gif";
import img12 from "../assets/img12.jpg";
import comments from "../assets/comments.png";
import home9 from "../assets/home9.jpg";
import { motion } from "framer-motion";
import resizeWindow from "../services/resizeWindow";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { blue } from "@mui/material/colors";
import { BsThreeDotsVertical } from "react-icons/bs";

const MainHome = () => {
  let images: { [key: string]: string } = {
    1: home4,
    2: home5,
    3: home6,
  };
  let sponsers = [
    { img: spons1, name: "Quantum Solutions" },
    { img: spons2, name: "Ethnic House" },
    { img: spons3, name: "medic Hetch" },
    { img: spons4, name: "Gastown Academy" },
    { img: spons5, name: "ASCENT" },
    { img: spons6, name: "Milota" },
    { img: spons7, name: "Beyond Aditya" },
    { img: spons8, name: "Duttern Consultant" },
  ];
  const [value, setValue] = useState("1");
  const [headImg, setheadImg] = useState("1");
  const { width, height } = resizeWindow();

  return (
    <>
      <Stack style={{ overflowY: "auto" }}>
        <Stack
          direction="column"
          bgRepeat={"no-repeat"}
          justifyContent="space-between"
          bgPosition={"center"}
          bgSize={"cover"}
          bgImage={images[headImg]}
          width={width}
          height={(height * 2) / 3}
        >
          <motion.div whileHover={{ scale: 1.1 }}>
            <Box
              color={"white"}
              bgColor={"grey"}
              height={"100px"}
              width={"200px"}
              borderRadius={"10px"}
              marginLeft={width / 6}
              marginTop={height / 8}
              paddingLeft={3}
              paddingTop={3}
            >
              <Text fontSize="22px" fontFamily="PTS">
                welcome to orgi!
              </Text>
              <Text marginTop={2} fontSize={"12px"}>
                your best choice to orgnize your exhabitation
              </Text>
            </Box>
          </motion.div>
          <RadioGroup
            onChange={(value) => {
              setValue(value);
              setheadImg(value);
            }}
            value={value}
            alignSelf={"end"}
            paddingRight={width / 2.3}
            paddingBottom={1}
          >
            <Stack direction="row">
              <motion.div whileHover={{ scale: 1.2 }}>
                <Radio value="1" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Radio value="2" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Radio value="3" />
              </motion.div>
            </Stack>
          </RadioGroup>
        </Stack>
        <Text
          marginX={width / 20}
          marginTop={28}
          marginBottom={10}
          fontSize={40}
          color={"gray.500"}
        >
          {" "}
          <b style={{ fontFamily: "serif" }}>
            what do{" "}
            <text
              style={{ fontFamily: "monospace", color: "gold", fontSize: 50 }}
            >
              ORGI
            </text>{" "}
            do?
          </b>{" "}
        </Text>
        <HStack
          justifyContent="space-between"
          marginX={width / 20}
          marginRight={150}
        >
          <Box
            boxSize={"80"}
            height={"96"}
            bgGradient={`linear(330deg,blue.400 ,blue.200   )`}
            borderRadius={20}
            overflow="hidden"
          >
            <Image
              src={img11}
              borderRadius={20}
              height={"52%"}
              width={"100%"}
            />
            <Stack color={"white"} margin={5} fontSize={18}>
              <b style={{ fontSize: 24, marginBottom: 5 }}>On-Site Support</b>
              <text>
                Our dedicated staff provides on-site assistance to ensure
                everything runs smoothly.
              </text>
            </Stack>
          </Box>
          <Box
            boxSize={"80"}
            height={"96"}
            bgGradient={`linear(60deg,blue.900 ,blue.600   )`}
            borderRadius={20}
            overflow="hidden"
          >
            <Image
              src={whatDo2}
              borderRadius={20}
              height={"52%"}
              width={"100%"}
            />
            <Stack color={"white"} margin={5} fontSize={18}>
              <b style={{ fontSize: 24, marginBottom: 5 }}>Event Management</b>
              <text>
                From concept to execution and planning, we manage all aspects of
                your event.
              </text>
            </Stack>
          </Box>
          <Box
            boxSize={"80"}
            height={"96"}
            bgGradient={`linear(30deg,gray.400 ,gray.300   )`}
            borderRadius={20}
            overflow="hidden"
          >
            <Image
              src={img12}
              borderRadius={20}
              height={"52%"}
              width={"100%"}
            />
            <Stack color={"white"} margin={5} fontSize={18}>
              <b style={{ fontSize: 24, marginBottom: 5 }}>
                Post-Event Analysis
              </b>
              <text>
                We provide detailed reports and feedback to help you measure the
                success of your event.
              </text>
            </Stack>
          </Box>
          <Box
            boxSize={"80"}
            height={"96"}
            bgGradient={`linear(190deg,yellow.500 ,yellow.300   )`}
            borderRadius={20}
            overflow="hidden"
          >
            <Image
              src={home9}
              borderRadius={20}
              height={"52%"}
              width={"100%"}
            />
            <Stack color={"white"} margin={5} fontSize={18}>
              <b style={{ fontSize: 24, marginBottom: 5 }}>Venue Selection</b>
              <text>
                We help you find the perfect location that aligns with your
                event’s theme and objectives.
              </text>
            </Stack>
          </Box>
        </HStack>
        <Box
          height={height / 1.8}
          marginY={40}
          paddingTop={5}
          bgGradient={`linear(80deg,blue.900 ,blue.600   )`}
          bgColor={"blue.900"}
        >
          <HStack>
            <Image
              boxSize={72}
              margin={9}
              objectFit="cover"
              marginLeft={20}
              borderRadius={30}
              src={company}
            />
            <Text
              color={"whitesmoke"}
              marginLeft={10}
              marginRight={32}
              fontSize={24}
            >
              At <b style={{ fontSize: 30, margin: 5 }}>ORGI</b> we are
              passionate about creating exceptional exhibition experiences that
              leave a lasting impact.
              <br /> Our expertise spans across various types of events,
              including:
              <br />{" "}
              <text
                style={{
                  textDecoration: "underline",
                  fontSize: 30,
                  marginLeft: 100,
                  color: "lightblue",
                  fontFamily: "fantasy",
                }}
              >
                {" "}
                trade shows{" "}
              </text>
              <br />{" "}
              <text
                style={{
                  fontSize: 30,
                  textDecoration: "underline",
                  marginLeft: 250,
                  color: "lightblue",
                  fontFamily: "fantasy",
                }}
              >
                art exhibitions
              </text>
              <br />{" "}
              <text
                style={{
                  fontSize: 30,
                  textDecoration: "underline",
                  marginLeft: 420,
                  color: "lightblue",
                  fontFamily: "fantasy",
                }}
              >
                corporate events
              </text>
              <br />
            </Text>
          </HStack>
        </Box>
        '
        <Text marginLeft={32} marginBottom={10} fontSize={18} color={blue[600]}>
          <b style={{ fontSize: 40 }}> Our Reviews</b>
          <br />
          <text style={{ color: "gray" }}>
            We Never Fail Our Users and Always Exceed Their Expectations.
          </text>
        </Text>
        '
        <HStack marginX={28} marginBottom={32}>
          <Image src={comments} borderRadius={30} boxSize={500} />
          <Box marginBottom={-52}>
            <Stack
              marginLeft={10}
              marginTop={-52}
              borderRadius={14}
              bgGradient={`linear(40deg,pink.100 ,yellow.100   )`}
              padding={4}
              width={400}
              height={180}
            >
              <HStack>
                <Avatar src={profile1}/>
                <Text fontWeight="bold">Ahmed Al-Farsi</Text>
                <Icon marginLeft={40} as={BsThreeDotsVertical} />
              </HStack>
              <Text fontSize={14} marginLeft={8}>
                “From scheduling to attendee management, this app covers it all.
                It’s incredibly intuitive and has saved us so much time and
                effort. A must-have for any event organizer.”
              </Text>
            </Stack>
            <Stack
              marginLeft={470}
              marginTop={-79}
              borderRadius={14}
              bgGradient={`linear(40deg,lavender ,purple.100   )`}
              padding={4}
              width={360}
              height={150}
            >
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Avatar src={profile2}/>
                  <Text fontWeight="bold">Fatima Alwan</Text>
                </HStack>
                <Icon as={BsThreeDotsVertical} />
              </HStack>
              <Text fontSize={14} marginLeft={8}>
                “A Game Changer for Event Planners! The real-time updates and
                easy-to-use tools have made a huge difference.”
              </Text>
            </Stack>
            <Stack
              marginLeft={340}
              marginTop={5}
              borderRadius={14}
              bgGradient={`linear(120deg,blue.100 ,blue.200   )`}
              padding={4}
              width={360}
              height={130}
            >
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Avatar src={profile3} />
                  <Text fontWeight="bold">Hassan Farouq</Text>
                </HStack>
                <Icon as={BsThreeDotsVertical} />
              </HStack>
              <Text fontSize={14} marginLeft={8}>
                “The ability to track and manage everything in one place has
                been a game changer for us.”
              </Text>
            </Stack>
            <Stack
              marginLeft={62}
              marginTop={6}
              borderRadius={14}
              bgGradient={`linear(120deg,green.100 ,teal.200   )`}
              padding={4}
              width={320}
              height={130}
            >
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Avatar  src={profile4}/>
                  <Text fontWeight="bold">Yusuf Al-Amin</Text>
                </HStack>
                <Icon as={BsThreeDotsVertical} />
              </HStack>
              <Text fontSize={14} marginLeft={8}>
                “Streamlined Our Entire Process. AMAZING!”
              </Text>
            </Stack>

            <Stack
              marginLeft={410}
              marginTop={-20}
              borderRadius={14}
              bgGradient={`linear(220deg,pink.100 ,pink.200   )`}
              padding={4}
              width={380}
              height={200}
            >
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Avatar src={profile5} />
                  <Text fontWeight="bold">Layla Al-Tajir</Text>
                </HStack>
                <Icon as={BsThreeDotsVertical} />
              </HStack>
              <Text fontSize={14} marginLeft={8}>
                “Excellent Support and Features Not only does this app offer a
                wide range of features, but the customer support is also
                top-notch. Any issues we’ve had were resolved quickly and
                efficiently. Fantastic experience overall.”
              </Text>
            </Stack>
          </Box>
        </HStack>
        <Stack paddingX={52} placeItems={"center"}>
          <Divider borderColor={"black"} marginY={10} />
          <Text fontSize={24}>
            {" "}
            <b>Our Sponsers</b>
          </Text>
          <HStack>
            {sponsers?.map((spons, index) => (
              <HStack margin={3} boxSize={"fit-content"} key={index}>
                <Avatar src={spons.img} />
                <Text fontWeight="bold">{spons.name}</Text>
              </HStack>
            ))}
          </HStack>

          <HStack justifyContent={"space-between"} marginBottom={20}>
            <Box marginRight={44} marginLeft={-32}>
              <Text marginTop={14} fontSize={24}>
                <b>Our HeadQuarter Location</b>
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  marginTop: 30,
                  marginBottom: 10,
                  marginLeft: -100,
                }}
              >
                {" "}
                Suite 5678 Tech Park District San Francisco, California, 94107
                USA
              </Text>
              <Link color={"blue.300"}>https://google.maps/7289x2e2k011 </Link>
            </Box>

            <Box>
              <Text marginTop={16} marginBottom={6} fontSize={24}>
                <b>Contact Us</b>
              </Text>
              <Link color={"blue.300"}>
                {" "}
                <Icon
                  as={FaWhatsapp}
                  marginBottom={-0.5}
                  marginRight={2}
                  color={"green"}
                />
                +963 913 176 214
                <br />
                <Icon
                  as={FaLinkedin}
                  marginBottom={-0.5}
                  marginRight={2}
                  color={"blue.800"}
                />
                https://linkedIn.home/3d322d42=c?cA
                <br />
                <Icon
                  as={FaFacebook}
                  marginBottom={-0.5}
                  marginRight={2}
                  color={"blue.600"}
                />
                https://facebook/Orgi/profile=?x2jd892d
              </Link>
            </Box>
          </HStack>
        </Stack>
      </Stack>
    </>
  );
};

export default MainHome;
