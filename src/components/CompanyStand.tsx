import React from "react";
import useCompanyStand from "../hooks/useCompanyStand";
import { Image, Stack } from "@chakra-ui/react";

interface Props {
  standId: string;
}

const CompanyStand = ({ standId }: Props) => {
  const company = useCompanyStand(standId);
  return (
    <Stack placeItems={"center"} margin={10}>
      <text style={{marginLeft:-150 }}>
        <text style={{ marginRight:20 }}>company stand:{" "}</text>
        <b style={{ fontSize: 20 }}>{company.data?.company_name}</b>
      </text>
      <Image
        margin={3}
        boxSize={400}
        borderRadius={20}
        src={`http://127.0.0.1:8000/storage/${company.data?.img}`}
      />
    </Stack>
  );
};

export default CompanyStand;
