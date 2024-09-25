import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { LuClipboardSignature } from "react-icons/lu";
import { TbArrowAutofitWidth } from "react-icons/tb";
import useAddStand from "../hooks/useAddStand";

interface Props {
  closeModal: () => void;
}

const AddStand = ({ closeModal }: Props) => {
  const addStand = useAddStand(closeModal);

  const refname = useRef<HTMLInputElement>(null);
  const refsize = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState(100);

  const [nameWarning, setNameWarning] = useState(true);
  const [sizeWarning, setSizeWarning] = useState(true);

  return (
    <Stack>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={LuClipboardSignature} color="gray.500" />
        </InputLeftElement>
        <Input
          ref={refname}
          type="text"
          variant="flushed"
          borderColor={"gray.400"}
          placeholder="name"
          marginBottom={nameWarning ? 5 : 0}
          onChange={(e) => {
            if (!e.target.value) {
              setNameWarning(true);
            } else {
              setNameWarning(false);
            }
          }}
        />
      </InputGroup>
      {nameWarning && (
        <p style={{ margin: 4, color: "#ff4545", marginTop: "-30px" }}>
          name is required
        </p>
      )}

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={TbArrowAutofitWidth} color="gray.500" />
        </InputLeftElement>
        <Input
          ref={refsize}
          type="number"
          variant="flushed"
          borderColor={"gray.400"}
          placeholder="size"
          marginBottom={sizeWarning ? 5 : 0}
          onChange={(e) => {
            if (!e.target.value) {
              setSizeWarning(true);
            } else {
              setSizeWarning(false);
            }
          }}
        />
      </InputGroup>
      {sizeWarning && (
        <p style={{ margin: 4, color: "#ff4545", marginTop: "-30px" }}>
          size is required
        </p>
      )}

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={LiaMoneyBillWaveSolid} color="gray.500" />
        </InputLeftElement>
        <Input
          type="number"
          value={price}
          variant="flushed"
          borderColor={"gray.400"}
          placeholder="price"
          marginBottom={!price ? 5 : 0}
          onChange={(e) => {
            setPrice(Number(e.target.value));
          }}
        />
      </InputGroup>
      {!price && (
        <p style={{ margin: 4, color: "#ff4545", marginTop: "-30px" }}>
          price is required
        </p>
      )}
      <Button
        marginTop={5}
        marginBottom={2}
        colorScheme={"blue"}
        isDisabled={nameWarning || sizeWarning || !price}
        onClick={() => {
          console.log("hi");
          if (refname.current?.value && refsize.current?.value)
            addStand.mutate({
              name: refname.current?.value,
              size: refsize.current?.value,
              price: price,
            });
        }}
      >
        add
      </Button>
    </Stack>
  );
};

export default AddStand;
