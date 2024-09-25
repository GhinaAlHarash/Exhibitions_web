import { Box, Button, HStack, Input, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import useAddSpons from "../hooks/useAddSpons";
import apiClient from "../services/apiClient";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { ExhOne } from "../hooks/useFetchOneExh";

interface Props {
  closeModal: () => void;
}

const AddSponser = ({ closeModal }: Props) => {
  const addSopns = useAddSpons();
  const refname = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);
  const [close, setclose] = useState(false);

  const [nameWarning, setNameWarning] = useState(false);

  const [image, setImage] = useState<File>();
  useEffect(() => {
    if (addSopns.data?.status == 200 && close) {
      setclose(false);
      closeModal();
    }
  }, [addSopns]);

  return (
    <Box marginY={2}>
      <Stack>
        <Input
          ref={refname}
          type="text"
          placeholder="name"
          marginBottom={nameWarning ? 5 : 0}
          onChange={(e) => {
            if (!e.target.value) {
              setNameWarning(true);
              setDisabled(true);
            } else {
              setNameWarning(false);
              setDisabled(false);
            }
          }}
        />
        {nameWarning && (
          <p style={{ margin: 4, color: "#ff4545", marginTop: "-30px" }}>
            name is required
          </p>
        )}
        <Text>Image: </Text>
        <Input
          type="file"
          accept="image/*"
          placeholder="image"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setImage(file);
            }
          }}
          border={"hidden"}
        />
      </Stack>
      <Button
        marginTop={3}
        colorScheme={"blue"}
        isDisabled={disabled}
        onClick={() => {
          console.log("hi");
          const data = new FormData();
          refname.current?.value
            ? data.append("name", refname.current?.value)
            : "";
          if (image) {
            data.append("img", image);
          }
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          setclose(true);
          addSopns.mutate(data);

        }}
      >
        add
      </Button>
    </Box>
  );
};

export default AddSponser;
