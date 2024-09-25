import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
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
  Show,
  SkeletonText,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { PiArticleNyTimes, PiReadCvLogo, PiWallet } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import { RiAccountCircleLine, RiPhoneLine } from "react-icons/ri";
import { GrCloudComputer, GrLocation } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import resizeWindow from "../services/resizeWindow";
import ProductsGrid from "./ProductsGrid";
import useComProfile from "../hooks/useComProfile";
import AddProduct from "./AddProduct";
import addphoto from "../assets/addphoto.jpg";
import { BsPlus } from "react-icons/bs";
import useAddMoney from "../hooks/useAddMoney";
import { ChangeEvent, useEffect, useState } from "react";
import useFetchMoney from "../hooks/useFetchMoney";
import useFetchProducts from "../hooks/useFetchProducts";
import apiClient from "../services/apiClient";

const ProfileComp = () => {
  const { width, height } = resizeWindow();
  const profileInfo = useComProfile();

  const products = useFetchProducts();

  const money = useFetchMoney(
    localStorage.getItem("useroles") == "employeeUser"
      ? localStorage.getItem("CurrentProfile")
      : profileInfo.data?.id.toString()
  );

  const addMoney = useAddMoney(localStorage.getItem("CurrentProfile"), () => {
    money.refetch();
  });
  const [price, setPrice] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const data = new FormData();

    const file =
      event.target.files && event.target.files[0]
        ? event.target.files[0]
        : null;
    console.log(event.target.value.toString());
    if (file) {
      data.append("img", file);
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apiClient
      .post(
        `http://127.0.0.1:8000/api/addExhibitionMedia/${localStorage.getItem(
          "CurrentExhId"
        )}`,
        data,
        config
      )
      .then((res) => {
        //fun();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    document?.getElementById("fileInput")?.click();
  };

  const white = useColorModeValue("gray.700", "gray.300");
  useEffect(() => {
    if (addMoney.data?.status == 200) onClose2();
  }, [addMoney]);
  return (
    <Grid
      templateAreas={{
        md: `"side up"
                      "side main"
                      "side main"
                      "side main"`,
        sm: `"side up"
                "main main"`,
        base: `"side" "up"
                "main"`,
      }}
      style={{ overflowY: width < 768 ? "auto" : "hidden" }}
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(6, 1fr)"
    >
      <GridItem
        width={250}
        marginLeft={7}
        area={"side"}
        rowSpan={{ md: 6, base: 1 }}
        colSpan={{ md: 1, base: 6, sm: 3 }}
      >
        <Stack>
          {!(profileInfo.data?.userable.status == "1") ? (
            <Image
              src={`http://127.0.0.1:8000/storage/${profileInfo.data?.userable.commercial_register}`}
              boxSize={250}
              width={{ md: 250, base: width / 1.2 }}
              height={"auto"}
              borderRadius={10}
            />
          ) : profileInfo.data?.userable.img ? (
            <Image
              src={`http://127.0.0.1:8000/storage/${profileInfo.data?.userable.img}`}
              boxSize={250}
              width={{ md: 250, base: width / 1.2 }}
              height={"auto"}
              borderRadius={10}
            />
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />

              <Box
                borderRadius={20}
                boxSize={250}
                bgRepeat={"no-repeat"}
                bgPosition={"center"}
                bgSize={"cover"}
                bgImg={addphoto}
                onClick={handleClick}
                zIndex={10}
              />
            </div>
          )}
          <Show above="md">
            <Text margin={2} marginTop={5}>
              <Icon as={GrCloudComputer} color={white} marginRight={1.5} />
              <b>Website:</b> <br />
              <Link color={"blue.300"}>
                <p style={{ marginLeft: 11, marginTop: 5 }}>
                  {profileInfo.isLoading ? (
                    <SkeletonText noOfLines={2} spacing="3" width={width / 7} />
                  ) : (
                    profileInfo.data?.userable.website
                  )}
                </p>
              </Link>
            </Text>
            <Text marginX={2}>
              <Icon
                as={GrLocation}
                color={white}
                marginBottom={-0.5}
                marginRight={1}
              />
              <b>location:</b>
              <br />
              <p style={{ marginLeft: 11, marginTop: 5 }}>
                {profileInfo.isLoading ? (
                  <SkeletonText noOfLines={3} spacing="3" width={width / 7} />
                ) : (
                  profileInfo.data?.userable.office_address
                )}
              </p>
            </Text>
          </Show>
        </Stack>
      </GridItem>

      <GridItem
        rowSpan={{ md: 1, base: 1 }}
        marginY={3}
        colSpan={{ base: 6, sm: 3, md: 4 }}
        marginBottom={5}
        area={"up"}
        boxSize={"fit-content"}
      >
        <Stack marginLeft={10} marginBottom={5}>
          <Text fontSize={32}>
            {" "}
            <b>
              {" "}
              {profileInfo.isLoading ? (
                <SkeletonText
                  noOfLines={1}
                  height={10}
                  spacing="3"
                  width={width / 4}
                />
              ) : (
                profileInfo.data?.userable.company_name
              )}
            </b>
            {profileInfo.data?.userable.status == "1" && (
              <IconButton
                aria-label=""
                boxSize={10}
                color={white}
                marginLeft={3}
                marginRight={1.5}
                icon={<CiEdit size={24} />}
              />
            )}
          </Text>
          <Link fontSize={16} marginLeft={1} color={"blue.300"}>
            {" "}
            {profileInfo.isLoading ? (
              <SkeletonText noOfLines={1} spacing="3" width={width / 5} />
            ) : (
              profileInfo.data?.userable.business_email
            )}
          </Link>
          {(localStorage.getItem("useroles") == "employeeUser" ||
            !localStorage.getItem("CurrentProfile")) &&
            profileInfo.data?.userable.status != "0" && (
              <Text
                color={"green.400"}
                marginBottom={{ base: 5, md: 0 }}
                marginTop={0}
              >
                <Icon
                  marginBottom={-2}
                  boxSize={7}
                  color={white}
                  marginRight={1}
                  as={PiWallet}
                />
                {money.data?.amount}$
                {localStorage.getItem("useroles") == "employeeUser" && (
                  <Popover
                    placement="bottom-end"
                    onClose={onClose2}
                    isOpen={isOpen2}
                    onOpen={onOpen2}
                  >
                    <PopoverTrigger>
                      <IconButton
                        aria-label=""
                        marginLeft={4}
                        colorScheme="green"
                        boxSize={6}
                        icon={<BsPlus size={24} />}
                      />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>add money</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <HStack marginY={2}>
                            <InputGroup>
                              <InputLeftElement
                                color="green.500"
                                fontSize="1.2em"
                              >
                                $
                              </InputLeftElement>
                              <Input
                                width={40}
                                type="number"
                                onChange={(e) => {
                                  e.target.value
                                    ? setPrice(e.target.value)
                                    : setPrice("0");
                                }}
                              />
                            </InputGroup>
                            <Button
                              colorScheme="blue"
                              onClick={() => {
                                addMoney.mutate({
                                  amount: price == "0" ? 0 : Number(price),
                                });
                              }}
                            >
                              add
                            </Button>
                          </HStack>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                )}
              </Text>
            )}
          {width < 768 && (
            <>
              <Text margin={2} marginTop={5}>
                <Icon as={GrCloudComputer} color={white} marginRight={1.5} />
                <b>Website:</b> <br />
                <Link color={"blue.300"}>
                  <p style={{ marginLeft: 11, marginTop: 5 }}>
                    {profileInfo.isLoading ? (
                      <SkeletonText
                        noOfLines={2}
                        width={"fit-content"}
                        spacing="4"
                      />
                    ) : (
                      profileInfo.data?.userable.website
                    )}
                  </p>
                </Link>
              </Text>
              <Text marginX={2}>
                <Icon
                  as={GrLocation}
                  color={white}
                  marginBottom={-0.5}
                  marginRight={1}
                />
                <b>location:</b>
                <br />
                <p style={{ marginLeft: 11, marginTop: 5 }}>
                  {profileInfo.isLoading ? (
                    <SkeletonText noOfLines={3} spacing="3" width={width / 8} />
                  ) : (
                    profileInfo.data?.userable.office_address
                  )}
                </p>
              </Text>
            </>
          )}
        </Stack>
      </GridItem>
      <GridItem
        colSpan={{ base: 6, md: 5 }}
        margin={2}
        padding={2}
        borderTopRadius={10}
        rowSpan={{ md: 5, base: 3 }}
        area={"main"}
        style={{ overflowY: "auto" }}
        height={{ base: "fit-content", md: "auto" }}
      >
        <Tabs isFitted>
          <TabList>
            <Tab>About</Tab>
            <Tab>Top Products</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <HStack>
                <Text>
                  <b style={{ fontSize: 18 }}>User info: </b>
                </Text>
                <Stack marginLeft={5}>
                  <Text>
                    {" "}
                    <Icon
                      as={RiAccountCircleLine}
                      color="gray.500"
                      marginRight={1.5}
                      marginBottom={-0.5}
                    />
                    {profileInfo.isLoading ? (
                      <SkeletonText noOfLines={1} width={width / 6} />
                    ) : (
                      profileInfo.data?.name
                    )}
                  </Text>

                  <Text>
                    <Icon
                      as={MdAlternateEmail}
                      color="gray.500"
                      marginRight={1.5}
                      marginBottom={-0.5}
                    />
                    {profileInfo.isLoading ? (
                      <SkeletonText noOfLines={1} width={width / 4} />
                    ) : (
                      profileInfo.data?.email
                    )}
                  </Text>
                  <Text>
                    {" "}
                    <Icon
                      as={RiPhoneLine}
                      color="gray.500"
                      marginRight={1.5}
                      marginBottom={-0.5}
                    />
                    {profileInfo.isLoading ? (
                      <SkeletonText noOfLines={1} width={width / 7} />
                    ) : (
                      profileInfo.data?.phone
                    )}
                  </Text>
                </Stack>
              </HStack>
              <Divider margin={10} width={width / 3} borderColor={white} />
              <Text marginBottom={10}>
                <Icon
                  as={PiReadCvLogo}
                  boxSize={5}
                  marginRight={1}
                  marginBottom={-0.5}
                  color={white}
                />
                <b style={{ fontSize: 18 }}>Summery</b>
                <br />
                <p>
                  {profileInfo.isLoading ? (
                    <SkeletonText noOfLines={3} spacing="4" />
                  ) : (
                    profileInfo.data?.userable.summary
                  )}
                </p>
              </Text>

              <Text marginBottom={5}>
                <Icon
                  as={PiArticleNyTimes}
                  boxSize={5}
                  marginRight={1}
                  marginBottom={-0.5}
                  color={white}
                />
                <b style={{ fontSize: 18 }}>About us</b>
                <br />
                <p>
                  {profileInfo.isLoading ? (
                    <SkeletonText noOfLines={5} spacing="4" />
                  ) : (
                    profileInfo.data?.userable.body
                  )}
                </p>
              </Text>
            </TabPanel>
            <TabPanel>
              <Stack placeItems={"center"}>
                {profileInfo.data?.userable.status == "1" &&
                  !localStorage.getItem("CurrentProfile") && (
                    <Popover
                      placement="bottom-end"
                      onClose={onClose}
                      isOpen={isOpen}
                      onOpen={onOpen}
                    >
                      <PopoverTrigger>
                        <Button
                          width={width / 5}
                          marginY={3}
                          bgColor={"yellow.400"}
                          onClick={onOpen}
                        >
                          add
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverHeader>add Product</PopoverHeader>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <AddProduct
                              closeModal={() => {
                                products.refetch();
                              }}
                            />
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  )}
                <ProductsGrid
                  products={products.data}
                  refetch={() => {
                    products.refetch();
                  }}
                />
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
    </Grid>
  );
};

export default ProfileComp;
