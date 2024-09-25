import {
  Box,
  Button,
  Divider,
  Show,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import resizeWindow from "../services/resizeWindow";
import useChangeExhStatus from "../hooks/useChangeExhStatus";

interface Props {
  status: number;
  fun: () => void;
}

const StatusStepper = ({ status, fun }: Props) => {
  const { width, height } = resizeWindow();

  const changeStatus = useChangeExhStatus(
    Number(localStorage.getItem("CurrentExhId")),
    fun
  );

  console.log(status);
  const steps = [
    {
      title: "request",
      description: (
        <>
          <p>accept or</p> <p> reject</p> <p>Exhibition</p>
        </>
      ),
    },
    {
      title: "orginzing",
      description: (
        <>
          <p>applying all</p> <p> important</p>
          <p>information</p>
        </>
      ),
    },
    {
      title: "companies",
      description: (
        <>
          <p>publishing it</p> <p> for companies</p>
          <p>to participate</p>
        </>
      ),
    },
    {
      title: "announce",
      description: (
        <>
          <p>announcing</p> <p> about it</p>
          <p>for visitors</p>
        </>
      ),
    },
  ];

  const { activeStep } = useSteps({
    index: status,
  });

  return (
    <>
      <Stepper index={activeStep} padding={10} marginTop={10}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Show above="md">
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
            </Show>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {status ? (
        <Stack placeContent={"center"} marginBottom={14} paddingX={width / 4}>
          <Button
            bgColor={"yellow.400"}
            color={"white"}
            onClick={() => {
              if (status) changeStatus.mutate({ status: status + 1 });
            }}
          >
            proceed
          </Button>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};

export default StatusStepper;
