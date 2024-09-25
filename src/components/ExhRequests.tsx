import { SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useExhRequests from "../hooks/useExhRequests";
import ShowExh from "./ShowExh";

const ExhRequests = () => {
  const Exhs = useExhRequests();
  let skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div>
      <ShowExh Exhs={Exhs.data} fun={() => Exhs.refetch()}loading={Exhs.isLoading} />
    </div>
  );
};

export default ExhRequests;
