import { Box, Divider, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import useFetchAvaExh from "../hooks/useFetchAvaExh";
import useFetchompParticExh from "../hooks/useFetchompParticExh";
import ShowExh from "./ShowExh";
import resizeWindow from "../services/resizeWindow";

const AvailableExhs = () => {
  const Exhs = useFetchAvaExh();
  const particExhs = useFetchompParticExh();
  const white = useColorModeValue("gray.700", "white");
  const { width, height } = resizeWindow();

  return (
    <Stack>
      <Text fontSize={24} marginLeft={10} marginTop={5}>
        Registered Exhibitions
      </Text>
      <Divider
        marginLeft={5}
        borderColor={white}
        width={{
          base: width / 1.62,
          sm: width / 1.42,
          md: width / 1.35,
          xl: width / 1.25,
        }}
      />
      {particExhs.data?.length ? (
        <Box
          onClick={() => {
            localStorage.removeItem("Resgistered");
            localStorage.setItem("Resgistered", "r");
            console.log("asmkd;lamsalm");
          }}
        >
          <ShowExh
            Exhs={particExhs.data}
            fun={() => particExhs.refetch()}
            loading={particExhs.isLoading}
          />
        </Box>
      ) : (
        <Text margin={10} marginTop={5} color={"gray"}>
          {" "}
          You are not registered yet in any Exhbtions!
        </Text>
      )}
      <Text fontSize={24} marginLeft={10} marginTop={20}>
        Unregistered Exhibitions
      </Text>
      <Divider
        marginLeft={5}
        borderColor={white}
        width={{
          base: width / 1.62,
          sm: width / 1.42,
          md: width / 1.35,
          xl: width / 1.25,
        }}
      />
      <Box
        onClick={() => {
          localStorage.removeItem("Resgistered");
          localStorage.setItem("Resgistered", "ur");
          console.log("asmkd;lamsalm");
        }}
      >
        <ShowExh
          Exhs={Exhs.data}
          fun={() => Exhs.refetch()}
          loading={Exhs.isLoading}
        />
      </Box>
    </Stack>
  );
};

export default AvailableExhs;
