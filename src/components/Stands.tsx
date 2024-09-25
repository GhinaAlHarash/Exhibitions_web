import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import noMap from "../assets/noMap.png";
import { TbZoomInArea, TbZoomOutArea } from "react-icons/tb";
import { FaSquarePlus } from "react-icons/fa6";
import useFetchOneExh from "../hooks/useFetchOneExh";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import resizeWindow from "../services/resizeWindow";
import useFetchStandsSec from "../hooks/useFetchStandsSec";
import StandsGrid from "./StandsGrid";
import AddSponser from "./AddSponser";
import AddStandsSec from "./AddStandsSec";
import AddStand from "./AddStand";

const Stands = () => {
  const map = useFetchOneExh().data?.exhibition_map;
  const setions = useFetchStandsSec();
  const bg = useColorModeValue("white", "gray.400");

  const { isOpen, onOpen, onClose } = useDisclosure();
  

  const white = useColorModeValue("gray.200", "#303030");
  const whiteB = useColorModeValue("gray.400", "white");
  const { width, height } = resizeWindow();

  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      style={{ overflowY: "auto" }}
    >
      <Stack
        width={{ lg: width / 2.5, base: width / 1.4 }}
        height={"fit-content"}
        padding={6}
        marginX={{ lg: width / 50, base: width / 20 }}
        marginY={5}
        borderRadius={10}
        bgColor={white}
      >
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent>
                <Image
                  src={map ? `http://127.0.0.1:8000/storage/${map}` : noMap}
                  alt="Exhibition Map"
                />
              </TransformComponent>
              <HStack marginBottom={-4} marginTop={1} className="zoom-controls">
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
                <Button
                  marginLeft={8}
                  colorScheme={"yellow"}
                  onClick={() => resetTransform()}
                >
                  Reset
                </Button>
              </HStack>
            </>
          )}
        </TransformWrapper>
      </Stack>

      <Box height={{ lg: height / 1.16 }}>
        <Box marginX={5} marginY={2} fontSize={20}>
          <b>Sections:</b>{" "}
          {(localStorage.getItem("useroles") == "employee" ||
            localStorage.getItem("useroles") == "organizer") && (
            <Popover
              placement="bottom-end"
              onClose={onClose}
              isOpen={isOpen}
              onOpen={onOpen}
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
                  <PopoverHeader>add Section</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <AddStandsSec
                      closeModal={() => {
                        onClose();
                        setions.refetch();
                      }}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          )}
          <br />
          {setions.data?.map((sec, index) =>
            index ? (
              <Tag
                key={index}
                fontSize={{ lg: 16, base: 17 }}
                marginTop={{ lg: 2, base: 5 }}
                height={8}
                marginX={2}
                bgColor={"blue.100"}
                color={"black"}
              >
                {sec.name}
              </Tag>
            ) : (
              <></>
            )
          )}
        </Box>
        <Divider
          marginY={{ lg: 2, base: 10 }}
          borderColor={whiteB}
          marginX={5}
          width={"95%"}
        />
        <Text marginLeft={4} marginBottom={-2} marginTop={4} fontSize={20}>
          <b>Stands:</b>{" "}
          </Text>
        <br />
        <Stack
          width={{ lg: width / 2.5, base: "95%" }}
          height={{ lg: "70%", base: "100%" }}
          style={{ overflowY: "auto" }}
          margin={2}
          marginTop={-2}
        >
          <StandsGrid />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Stands;
