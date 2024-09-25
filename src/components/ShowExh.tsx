import {
  Select,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ExhCard from "./ExhCard";
import { motion } from "framer-motion";
import { Exh } from "../hooks/useFetchExh";
import SkeletonCard from "./SkeletonCard";

interface Props {
  Exhs: Exh[] | undefined;
  fun: () => void;
  loading: boolean;
}

const ShowExh = ({ Exhs, fun, loading }: Props) => {
  const [skeletons, setskeletons] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  if (loading)
    return (
      <div style={{ overflowX: "hidden" }}>
        <SimpleGrid
          columns={{ sm: 1, base: 1, md: 2, lg: 3, xl: 4 }}
          spacing={10}
          padding={{ base: "20px", sm: "40px", md: "20px" }}
        >
          {skeletons?.map((Skeleton) => (
            <SkeletonCard key={Skeleton} />
          ))}
        </SimpleGrid>
      </div>
    );
  return (
    <div style={{ overflowX: "hidden" }}>
      <Tabs variant="soft-rounded" colorScheme="yellow" marginLeft={80}>
        <TabList>
          <Tab marginX={10}>
            <motion.div whileHover={{ rotate: -6 }}>all</motion.div>
          </Tab>
          <Tab marginX={10}>
            <motion.div whileHover={{ rotate: -6 }}>Today</motion.div>
          </Tab>
          <Tab marginX={10}>
            <motion.div whileHover={{ rotate: -6 }}>This Week</motion.div>
          </Tab>

          <Tab marginX={3}>
            <motion.div whileHover={{ rotate: -6 }}>Coming Soon</motion.div>
          </Tab>
        </TabList>
      </Tabs>
      {!Exhs?.length && (
        <Stack placeItems={"center"} marginTop={50}>
          <Text color={"gray"}> No Exhibitions here</Text>
        </Stack>
      )}
      <SimpleGrid
        columns={{ sm: 1, base: 1, md: 2, lg: 3, xl: 4 }}
        spacing={10}
        padding={{ base: "20px", sm: "40px", md: "20px" }}
      >
        {Exhs?.map((info, index) => (
          <motion.div whileHover={{ scale: 1.05 }} key={index}>
            <ExhCard info={info} fun={fun}>
              {info.title}
            </ExhCard>
          </motion.div>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default ShowExh;
