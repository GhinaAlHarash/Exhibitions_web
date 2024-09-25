import { Box, Stack, Tooltip, useColorModeValue } from "@chakra-ui/react";
import {} from "react-icons/ri";
import SideBar from "../components/SideBar";
import MainInfo from "../components/MainInfo";
import { Outlet, useNavigate } from "react-router-dom";
import ExhTable from "../components/ExhTable";
import NavDash from "../components/NavDash";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const bg = useColorModeValue("white", "blue.800");
  const blue = useColorModeValue("#0F2869", "gray.800"); //183789 //0C2462 final:001241

  return (
    <Box
      display="flex"
      height={innerHeight}
      bgColor={blue}
      style={{ overflow: "hidden" }}
    >
      <Box flex="1" bgColor={blue}>
        <SideBar />
      </Box>
      <Stack
        flex={{ lg: "6", base: "11" }}
        bgColor={bg}
        margin={3}
        borderRadius={20}
        style={{
          overflowY:
            localStorage.getItem("CurrentPage") == "info" ? "hidden" : "auto",
        }}
      >
        <Tooltip
          placement='top'
          bg="gray.300"
          color="black"
        >
          <span
            style={{
              zIndex: 99999,
              display: "contents",
              position: "fixed",
              width:"100%"
            }}
          >
            <NavDash />
          </span>
        </Tooltip>
        <Outlet />
      </Stack>
    </Box>
  );
};

export default Dashboard;
