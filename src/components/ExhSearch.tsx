import React from "react";
import ShowExh from "./ShowExh";
import useExhStore from "../stores/useExhStore";
import { Text } from "@chakra-ui/react";
import resizeWindow from "../services/resizeWindow";

const ExhSearch = () => {
  const { Exhs } = useExhStore();
  const { width, height } = resizeWindow();
  return (
    <>
      <ShowExh Exhs={Exhs} fun={() => {}} loading={false}/>
      {/*Exhs?.length == 0 && (
        <Text color={"grey"} marginLeft={{ base: width / 6, sm: width / 3.5 }}>
          no results matches the search
        </Text>
      )*/}
    </>
  );
};

export default ExhSearch;
