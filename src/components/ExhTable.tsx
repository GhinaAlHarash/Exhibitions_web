import {
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { PiPlusBold } from "react-icons/pi";
import ExhCard from "./ExhCard";
import resizeWindow from "../services/resizeWindow";
import { useNavigate } from "react-router-dom";
import useFetchExh, { Exh } from "../hooks/useFetchExh";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ShowExh from "./ShowExh";

interface Props {
  Exhs: Exh;
}

const ExhTable = () => {
  const Exhs = useFetchExh(true);

  return (
    <ShowExh
      Exhs={Exhs.data}
      fun={() => Exhs.refetch()}
      loading={Exhs.isLoading}
    />
  );
};

export default ExhTable;
