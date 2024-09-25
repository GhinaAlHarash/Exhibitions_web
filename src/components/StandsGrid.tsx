import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import resizeWindow from "../services/resizeWindow";
import useFetchStandsd from "../hooks/useFetchStandsd";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { TbArrowAutofitWidth } from "react-icons/tb";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import StandInfo from "./StandInfo";
import { FaSquarePlus } from "react-icons/fa6";
import AddStand from "./AddStand";
import CompanyStand from "./CompanyStand";

const StandsGrid = () => {
  const [stand, setStand] = useState({ id: "-1", price: "0", status: 0 });

  const white = useColorModeValue("gray.200", "#303030");
  const whiteDrawer = useColorModeValue("gray.200", "gray.700");
  const bg = useColorModeValue("white", "gray.400");

  const { width } = resizeWindow();
  const [touch, setTouch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const stands = useFetchStandsd();

  return (
    <>
      {(localStorage.getItem("useroles") == "employee" ||
        localStorage.getItem("useroles") == "organizer") && (
        <Popover
          placement="bottom-end"
          onClose={onClose2}
          isOpen={isOpen2}
          onOpen={onOpen2}
        >
          <PopoverTrigger>
            <IconButton
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
              <PopoverHeader>add Stand</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <AddStand
                  closeModal={() => {
                    onClose2();
                    stands.refetch();
                  }}
                />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      )}

      <SimpleGrid
        spacing={4}
        marginTop={1}
        columns={{
          base: width < 580 ? 1 : width < 790 ? 2 : 3,
          lg: width < 1080 ? 1 : 2,
        }}
      >
        {stands.data?.map((info, index) => (
          <Card bgColor={white} key={index}>
            <CardHeader
              onClick={() => {
                onOpen();
                setTouch(true);
              }}
            >
              <Heading size="md" marginBottom={-5}>
                {" "}
                {info.name}
              </Heading>
            </CardHeader>
            <CardBody
              onClick={() => {
                setStand({
                  id: info.id.toString(),
                  price: info.price.toString(),
                  status: info.status,
                });
                onOpen();
                setTouch(true);
              }}
            >
              <p style={{ marginBottom: 4 }}>
                <Icon marginBottom={-1} boxSize={5} as={TbArrowAutofitWidth} />{" "}
                <b style={{ marginRight: 10 }}>size:</b>
                {info.size} m²
              </p>
              <p style={{ marginBottom: 6 }}>
                <Icon
                  marginBottom={-1.5}
                  boxSize={5}
                  as={LiaMoneyBillWaveSolid}
                />{" "}
                <b style={{ marginRight: 10 }}>price:</b>
                <text style={{ color: "#5AD099" }}> {info.price}$</text>
              </p>

              <p style={{ marginBottom: 6 }}>
                <Icon
                  marginBottom={-1}
                  boxSize={5}
                  as={MdOutlineBookmarkAdded}
                />{" "}
                <b style={{ marginRight: 10 }}>status:</b>
                <text style={{ color: info.status ? "green" : "red" }}>
                  {info.status ? "Booked" : "Unbooked"}
                </text>
              </p>
            </CardBody>
            {(localStorage.getItem("useroles") == "employee" ||
              localStorage.getItem("useroles") == "organizer") && (
              <CardFooter marginTop={-5}>
                <Button colorScheme="red">delete</Button>
              </CardFooter>
            )}
          </Card>
        ))}{" "}
      </SimpleGrid>

      {touch && (
        <Drawer
          isOpen={isOpen}
          size={{
            md:
              localStorage.getItem("useroles") == "employee" ||
              localStorage.getItem("useroles") == "organizer"
                ? "lg"
                : "sm",
            base: "sm",
          }}
          placement="right"
          onClose={() => {
            setTimeout(() => setTouch(false), 500);
            onClose();
            console.log(isOpen + "inclose");
          }}
        >
          <DrawerContent margin={3} borderRadius={20} bgColor={whiteDrawer}>
            <DrawerCloseButton />
            <DrawerHeader>STAND AUCTION</DrawerHeader>

            <DrawerBody>
              <Text marginTop={5} fontSize={17}>
                <b>initial price:</b>{" "}
                <text style={{ color: "green", marginLeft: 5 }}>
                  {stand.price} $
                </text>
              </Text>
              {!stand.status && (
                <StandInfo standId={stand.id} fun={() => stands.refetch()} />
              )}
              {stand.status ? <CompanyStand standId={stand.id} />:<></>}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default StandsGrid;
