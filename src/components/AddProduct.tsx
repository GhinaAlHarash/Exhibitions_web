import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAddSpons from "../hooks/useAddSpons";
import useAddPro from "../hooks/useAddPro";

interface Props {
  closeModal: () => void;
}

const AddProduct = ({ closeModal }: Props) => {
  const addPro = useAddPro(closeModal);
  const refname = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);

  const [nameWarning, setNameWarning] = useState(false);

  const [image, setImage] = useState<File>();

  return (
    <Box marginY={2}>
      <Stack>
        <Input
          ref={refname}
          type="text"
          placeholder="product name"
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
        isDisabled={disabled || !image}
        onClick={() => {
          console.log("hi");
          const data = new FormData();
          refname.current?.value
            ? data.append("info", refname.current?.value)
            : "";
          if (image) {
            data.append("img", image);
          }
          addPro.mutate(data);
        }}
      >
        add
      </Button>
    </Box>
  );
};

export default AddProduct;
