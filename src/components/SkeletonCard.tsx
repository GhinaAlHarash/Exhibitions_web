import {
  Card,
  CardBody,
  Box,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const SkeletonCard = () => {
  const white = useColorModeValue("gray.100", "#262728");
  return (
    <Card overflow="hidden" borderRadius={20} bgColor={white}>
      <Skeleton height="200px" width="300px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default SkeletonCard;
