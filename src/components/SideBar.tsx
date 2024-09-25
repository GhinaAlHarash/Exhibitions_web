import {
  Divider,
  HStack,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Switch,
  Text,
  Tooltip,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  HiBuildingOffice2,
  HiChartBarSquare,
  HiMiniListBullet,
  HiMiniUserCircle,
} from "react-icons/hi2";
import { FaShop } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RiPresentationFill } from "react-icons/ri";
import { FaWallet } from "react-icons/fa6";
import {
  PiPlusSquareFill,
  PiQuestionFill,
  PiUsersFill,
  PiBoxArrowDownFill,
  PiGridFourFill,
  PiDotsThree,
  PiDotsThreeVertical,
  PiDotsThreeVerticalBold,
} from "react-icons/pi";
import { MdSupervisedUserCircle } from "react-icons/md";
import resizeWindow from "../services/resizeWindow";
import { HiDotsVertical } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const SideBar = () => {
  const navigate = useNavigate();

  const blue = useColorModeValue("#0F2869", "#001241");
  const yellow = useColorModeValue("yellow.400", "yellow.500");

  const [status, setStatus] = useState(true);

  const { width, height } = resizeWindow();

  /*
  colorScheme={disabled ? "gray" : "blue"}
        textColor={disabled ? "black" : "white"}
        disabled={disabled} */

  let taps = [
    "exhabitations", //first tap for org,emp,comp
    "employees", //first tap for admin
    "all companies",
    "available Exh",
    "sections",
    "requests",
    "new Exhabitation",
    "visitors",
    "join requests",
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  let taps2 = ["info", "reports", "stands", "schedule", "companies"];

  let tapIcon: { [key: string]: IconType } = {
    exhabitations: HiMiniListBullet,
    visitors: MdSupervisedUserCircle,
    "all companies": HiBuildingOffice2,
    "new Exhabitation": PiPlusSquareFill,
    "available Exh": HiDotsVertical,
    schedule: RiPresentationFill,
    sections: PiGridFourFill,
    "join requests": PiBoxArrowDownFill,
    requests: PiBoxArrowDownFill,
    info: PiQuestionFill,
    reports: HiChartBarSquare,
    employees: PiUsersFill,
    stands: FaShop,
    companies: HiBuildingOffice2,
  };
  let tapPath: { [key: string]: string } = {
    exhabitations: "/dash/exhabitations",
    "new Exhabitation": "/dash/newExh",
    "available Exh": "/dash/availableExh",
    "join requests": "/dash/companies/requests",
    visitors: "/dash/visitors",
    sections: "/dash/sections",
    requests: "/dash/requests",
    "all companies": "/dash/companies",
    info:
      (localStorage.getItem("useroles") == "company"
        ? `/dash/ShowExh/`
        : `/dash/ExhInfo/`) + localStorage.getItem("CurrentExhId"),
    reports: "/dash/reports/" + localStorage.getItem("CurrentExhId"),
    employees: "/dash/employees",
    schedule: "/dash/schedule/" + localStorage.getItem("CurrentExhId"),
    stands: "/dash/stands/" + localStorage.getItem("CurrentExhId"),
    companies: "/dash/companies/" + localStorage.getItem("CurrentExhId"),
  };

  let tapRole: { [key: string]: string[] } = {
    exhabitations: ["employee", "organizer", "company"],
    "new Exhabitation": ["organizer", "organizer", "organizer"],
    visitors: ["employeeUser", "employeeUser", "employeeUser"],
    "all companies": ["employeeUser", "employeeUser", "employeeUser"],
    "join requests": ["employeeUser", "employeeUser", "employeeUser"],
    "available Exh": ["company", "company", "company"],
    sections: ["admin", "admin", "admin"],
    requests: ["employee", "employee", "employee"],
    info: ["employee", "organizer", "company"],
    reports: ["employee", "organizer", "organizer"],
    employees: ["admin", "admin", "admin"],
    companies: ["employee", "organizer", "organizer"],
    schedule: ["employee", "organizer", "company"],
    stands: ["employee", "organizer", "company"],
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Popover
        placement="bottom-end"
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
      >
        <PopoverTrigger>
          <IconButton
            aria-label=""
            bgColor={blue}
            icon={
              <PiDotsThreeVerticalBold size={26} color="white" />
            }
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent width={"fit-content"}>
            <PopoverBody margin={1}>
              <List spacing={4}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <ListItem>
                    <HStack>
                      <Icon
                        as={FiLogOut}
                        color={"red.300"}
                        boxSize={5}
                        marginLeft={2}
                      />{" "}
                      <Link marginLeft={3}> logout</Link>{" "}
                    </HStack>
                  </ListItem>
                </motion.div>

                {localStorage.getItem("useroles") == "employee" && (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <ListItem>
                      <HStack>
                        <Switch
                          isChecked={status}
                          onChange={() => setStatus(!status)}
                          colorScheme="yellow"
                          marginRight={2}
                        />{" "}
                        <Link>change employee status</Link>{" "}
                      </HStack>
                    </ListItem>
                  </motion.div>
                )}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <motion.div whileHover={{ scale: 1.1 }}>
        <HStack
          margin={2}
          placeContent={{ lg: "flex-start", base: "center" }}
          onClick={() => {
            localStorage.removeItem("CurrentPage");
            localStorage.setItem("CurrentPage", "profile");
            localStorage.removeItem("clicked");
            navigate("/dash/profile");
          }}
        >
          <Icon
            as={HiMiniUserCircle}
            color={"white"}
            marginTop={-3}
            boxSize={{ lg: "90px", base: "55px" }}
            marginLeft={1}
            marginRight={-3}
          />
          <Text
            fontSize={{ lg: "20px", base: "0px" }}
            color="white"
            marginTop={-3}
            marginLeft={{ lg: 3, base: 0 }}
          >
            {localStorage.getItem("username")}
          </Text>
        </HStack>
      </motion.div>
      <UnorderedList
        marginTop={12}
        height={height / 1.38}
        styleType="''"
        spacing={3}
        marginLeft={3}
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {taps.map((tap, index) => {
          console.log(localStorage.getItem("userToken"));
          console.log(localStorage.getItem("useroles"));
          if (
            tapRole[tap][0] == localStorage.getItem("useroles") ||
            tapRole[tap][1] == localStorage.getItem("useroles") ||
            tapRole[tap][2] == localStorage.getItem("useroles")
          )
            return (
              <motion.div whileHover={{ scale: 1.15 }} key={index}>
                <HStack
                  margin={{ lg: 2, base: 0 }}
                  placeContent={{ lg: "flex-start", base: "center" }}
                  onClick={() => {
                    localStorage.removeItem("CurrentPage");
                    localStorage.setItem("CurrentPage", tap);
                    navigate(tapPath[tap]);
                    localStorage.removeItem("clicked");
                    localStorage.setItem("clicked", index.toString());
                  }}
                  borderRadius={10}
                  height={"50px"}
                  width={{ lg: 180, base: "49px" }}
                  paddingLeft={2}
                  bgColor={
                    index.toString() == localStorage.getItem("clicked")
                      ? "gray"
                      : ""
                  }
                >
                  <Icon
                    as={tapIcon[tap]}
                    color={yellow}
                    boxSize={{ lg: "30px", base: "32px" }}
                    marginX={{ lg: 0, base: -2 }}
                  />
                  <Text
                    fontSize={{ lg: "20px", base: "0px" }}
                    color={
                      index.toString() == localStorage.getItem("clicked")
                        ? blue
                        : "white"
                    }
                  >
                    {tap}
                  </Text>
                </HStack>
              </motion.div>
            );
          else return;
        })}

        {localStorage.getItem("useroles") != "admin" &&
          localStorage.getItem("useroles") != "employeeUser" && (
            <>
              <Text
                marginLeft={{ base: 0, lg: 4 }}
                paddingTop={10}
                fontSize={22}
                textColor={"white"}
              >
                {!localStorage.getItem("CurrentExh")
                  ? "choose Exh"
                  : width < 992
                  ? localStorage.getItem("CurrentExh")?.substring(0, 4)
                  : localStorage.getItem("CurrentExh")?.substring(0, 17)}
                {!localStorage.getItem("CurrentExh")
                  ? ""
                  : width < 992
                  ? localStorage.getItem("CurrentExh")?.substring(4, 5)
                    ? ".."
                    : ""
                  : localStorage.getItem("CurrentExh")?.substring(17, 18)
                  ? "..."
                  : ""}
              </Text>
              <Divider />
            </>
          )}
        {taps2.map((tap, index) => {
          console.log(localStorage.getItem("useroles"));
          if (
            tapRole[tap][0] == localStorage.getItem("useroles") ||
            tapRole[tap][1] == localStorage.getItem("useroles") ||
            tapRole[tap][2] == localStorage.getItem("useroles")
          )
            return (
              <motion.div
                whileHover={{ scale: 1.15 }}
                key={index + taps.length}
              >
                <HStack
                  key={index + taps.length}
                  margin={{ lg: 2, base: 0 }}
                  placeContent={{ lg: "flex-start", base: "center" }}
                  onClick={() => {
                    if (localStorage.getItem("CurrentExh")) {
                      localStorage.removeItem("CurrentPage");
                      localStorage.setItem("CurrentPage", tap);
                      navigate(tapPath[tap]);
                      localStorage.removeItem("clicked");
                      localStorage.setItem(
                        "clicked",
                        (index + taps.length).toString()
                      );
                    }
                  }}
                  borderRadius={10}
                  height={"50px"}
                  width={{ lg: 180, base: "49px" }}
                  paddingLeft={2}
                  bgColor={
                    (index + taps.length).toString() ==
                    localStorage.getItem("clicked")
                      ? "gray"
                      : ""
                  }
                >
                  <Icon
                    as={tapIcon[tap]}
                    color={localStorage.getItem("CurrentExh") ? yellow : "grey"}
                    boxSize={{ lg: "30px", base: "32px" }}
                    marginX={{ lg: 0, base: -2 }}
                  />
                  <Text
                    fontSize={{ lg: "20px", base: "0px" }}
                    color={
                      localStorage.getItem("CurrentExh")
                        ? (index + taps.length).toString() ==
                          localStorage.getItem("clicked")
                          ? blue
                          : "white"
                        : "grey"
                    }
                  >
                    {tap}
                  </Text>
                </HStack>
              </motion.div>
            );
          else return;
        })}
      </UnorderedList>
    </div>
  );
};

export default SideBar;
