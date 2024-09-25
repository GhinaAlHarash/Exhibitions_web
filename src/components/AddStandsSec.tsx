import { Button, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import useAddStandsSec from "../hooks/useAddStandsSec";

interface Props {
  closeModal: () => void;
}

const AddStandsSec = ({ closeModal }: Props) => {
  const refname = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);

  const addSec = useAddStandsSec(()=>closeModal());

  const [nameWarning, setNameWarning] = useState(false);

  

  return (
    <>
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
      <Button
        marginTop={3}
        colorScheme={"blue"}
        isDisabled={disabled}
        onClick={() => {
          console.log("hi");
          if (refname.current?.value)
            addSec.mutate({ name: refname.current.value });
        }}
      >
        add
      </Button>
    </>
  );
};

export default AddStandsSec;
