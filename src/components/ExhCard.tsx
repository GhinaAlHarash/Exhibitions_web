import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Exh } from "../hooks/useFetchExh";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import useAccExh from "../hooks/useAccpExh";
import useRejcExh from "../hooks/useRejcExh";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/noImage.png";
import { IoTicketOutline } from "react-icons/io5";
import useFetchExhCompanys from "../hooks/useFetchExhCompanys";

interface Props {
  children: string | undefined;
  info: Exh;
  fun: () => void;
}

const ExhCard = ({ children, info, fun }: Props) => {
  const white = useColorModeValue("gray.100", "#262728");
  const companys = useFetchExhCompanys(info.id?.toString());
  const [acc, setAcc] = useState(false);
  const [idAcc, setIdAcc] = useState(-1);
  const accExh = useAccExh(acc, idAcc, fun);

  const [rej, setRej] = useState(false);
  const [idRej, setIdRej] = useState(-1);
  const rejExh = useRejcExh(rej, idRej, fun);

  const [time, setTime] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (time == 500) setTime(0);
    if (acc && accExh.backStatus === 200) {
      setIdAcc(-1);
      setAcc(false);
      (window.location as any).reload();
    }

    if (rej && rejExh.backStatus === 200) {
      setIdRej(-1);
      setRej(false);

      (window.location as any).reload();
    }
  }, [rej, acc, idAcc, idRej, accExh, rejExh]);
  return (
    <div>
      {rejExh.isLoading || accExh.isLoading ? (
        <>{/*tryMe(rejExh.isLoading || accExh.isLoading)*/}</>
      ) : null}{" "}
      <Card overflow="hidden" borderRadius={20} bgColor={white}>
        <Stack
          onClick={() => {
            console.log(localStorage.getItem("CurrentPage"));
            localStorage.removeItem("CurrentExh");
            if (info.title) localStorage.setItem("CurrentExh", info.title);
            localStorage.removeItem("CurrentExhId");
            if (info.id)
              localStorage.setItem("CurrentExhId", info.id.toString());
            if (localStorage.getItem("CurrentPage") == "Home")
              navigate(`/exhabitations/info`);
            else {
              localStorage.removeItem("clicked");
              localStorage.setItem("clicked", "9");
              localStorage.removeItem("CurrentPage");
              localStorage.setItem("CurrentPage", "info");
              if (localStorage.getItem("useroles") == "company")
                navigate(`/dash/ShowExh/${info.id}`);
              else navigate(`/dash/ExhInfo/${info.id}`);
            }
          }}
        >
          <Image
            objectFit="cover"
            height={200}
            src={
              info.cover_img
                ? `http://127.0.0.1:8000/storage/${info.cover_img}`
                : noImage
            }
          />

          <CardBody>
            <Heading size="sm" marginBottom="5px" marginTop={-2} padding="1px">
              {children}
            </Heading>

            <HStack justifyContent={"space-between"}>
              <Text color={"green.400"}>
                {" "}
                <Icon
                  as={IoTicketOutline}
                  color={"gray.6600"}
                  boxSize={6}
                  marginBottom={-1.5}
                  marginRight={2}
                />
                {info.price ? info.price + "$" : "free"}
              </Text>

              <AvatarGroup marginBottom={-1} marginTop={2} size="sm" max={2}>
                {companys.data?.map((info, index) => (
                  <Avatar
                    key={index}
                    name={info.company_name}
                    src={`http://127.0.0.1:8000/storage/${info.img}`}
                  />
                ))}
              </AvatarGroup>
            </HStack>
          </CardBody>
        </Stack>
        {localStorage.getItem("CurrentPage") == "requests" && (
          <HStack>
            <Tooltip
              label="accept/ decline"
              placement="bottom"
              bg="gray.300"
              color="black"
            >
              <span
                style={{
                  zIndex: 99999,
                  display: "inline-block",
                  position: "sticky",
                  marginLeft: "calc(100% - 100px)",
                  marginTop: "-74vh",
                }}
              >
                <Button
                  boxSize={4}
                  colorScheme="green"
                  bgColor={"green.300"}
                  outlineColor={"white"}
                  onClick={() => {
                    if (info.id) setIdAcc(info.id);
                    setAcc(true);
                  }}
                >
                  <Icon boxSize={4} as={PiCheckBold} />
                </Button>{" "}
                <Button
                  marginLeft={1}
                  boxSize={4}
                  bgColor={"red.300"}
                  colorScheme="red"
                  outlineColor={"white"}
                  onClick={() => {
                    if (info.id) setIdRej(info.id);
                    setRej(true);
                  }}
                >
                  <Icon boxSize={4} as={PiXBold} />
                </Button>
              </span>
            </Tooltip>
          </HStack>
        )}
      </Card>
    </div>
  );
};

export default ExhCard;
