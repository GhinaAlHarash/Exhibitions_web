import { Pie, Doughnut, Line, Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Filler,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import {
  Box,
  ring,
  Stack,
  Text,
  useColorModeValue,
  Icon,
  HStack,
  Link,
} from "@chakra-ui/react";
import {
  FaDownload,
  FaFileExcel,
  FaRegStar,
  FaRegStarHalfStroke,
  FaStar,
} from "react-icons/fa6";
import useReport from "../hooks/useReport";
import useStandsReport from "../hooks/useStandsReport";
import useAgeReport from "../hooks/useAgeReport";
import useRating from "../hooks/useRating";
import useRandonReports from "../hooks/useRandonReports";
import { borderRadius, height, width } from "@mui/system";
import { BsFileExcel, BsFileExcelFill, BsFiletypeXlsx } from "react-icons/bs";
import { RiFileExcelFill } from "react-icons/ri";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const first = useColorModeValue("#FFEE", "gray.300"); //ABC7FF
  const second = useColorModeValue("#FFDD", "blue.100"); ///C1E3FF
  const finincial = useReport();
  const stands = useStandsReport();
  const age = useAgeReport();
  const rate = 76; //useRating();
  const all = useRandonReports();

  const datafinincial = {
    labels: ["organizer Fees", "total ticket Revenue", "total Stand Price"],

    datasets: [
      {
        label: "",
        data: [3620, 2900, 2100] /*data: [
          finincial.data?.data.organizerFees
            ? finincial.data?.data.organizerFees
            : 0,
          Number(finincial.data?.data["total ticket Revenue"])
            ? Number(finincial.data?.data["total ticket Revenue"])
            : 0,
          finincial.data?.data.totalStandPrice
            ? finincial.data?.data.totalStandPrice
            : 0,
        ],*/,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data = {
    labels: stands.data?.map((info) => info.stand_name),
    datasets: [
      {
        label: "",
        data: [520, 225, 612, 410, 490], //stands.data?.map((info) => info.bid_price),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };
  const dataAge = {
    labels: ["0-18", "19-25", "26-35", "36-45", "46-55", "56+"],
    datasets: [
      {
        label: "",
        data: [3, 52, 134, 86, 92, 66] /*data: [
          age.data ? ["0-18"] : 0,
          age.data ? ["19-25"] : 0,
          age.data ? ["26-35"] : 0,
          age.data ? ["36-45"] : 0,
          age.data ? ["46-55"] : 0,
          age.data ? ["56+"] : 0,
        ],*/,
        backgroundColor: [
          // "rgba(75, 192, 192, 0.6)",
          //"rgba(153, 102, 255, 0.6)",
          //"rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          //"rgba(255, 206, 86, 0.6)",
          //"rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(153, 102, 255, 1)",
          //"rgba(255, 159, 64, 1)",
          //"rgba(54, 162, 235, 1)",
          //"rgba(255, 206, 86, 1)",
          //"rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "financial Study",
      },
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Best stand sales",
      },
    },
  };
  const optionsAge = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Age distribution",
      },
    },
  };

  return (
    <>
      
      <HStack spacing={4} marginX={20}>
        <Box>
        <HStack placeContent={"center"} marginBottom={10} marginTop={5}>
        {" "}
        <Text fontSize={22} marginLeft={-14}>
          <b>Rating:</b>
        </Text>
        {[...Array(5)].map((star, index) =>
          rate /*.data?.percentage_rating || 0*/ - (index + 1) * 20 > 0 ? (
            <Icon boxSize={7} color={"yellow.300"} as={FaStar} />
          ) : rate /*.data?.percentage_rating || 0*/ - (index + 1) * 20 + 10 >
            0 ? (
            <Icon boxSize={7} color={"yellow.300"} as={FaRegStarHalfStroke} />
          ) : (
            <Icon boxSize={7} color={"yellow.300"} as={FaRegStar} />
          )
        )}
      </HStack>
          <Text
            color={"gray"}
            width={52}
            height={28}
            padding={5}
            borderRadius={10}
            marginTop={5}
            marginRight={4}
            bgGradient={`linear(210deg,${first} ,  ${second}  )`} // blanchedalmond, honeydew
            boxShadow="lg"
            fontSize={18}
            fontFamily={"sans-serif"}
          >
            <b>Companies Count</b> <br />
            <Text
              color={"red.300"}
              fontSize={32}
              marginLeft={14}
              fontFamily={"fantasy"}
            >
              86
            </Text>
            {/*all.data?.companiesCount*/}
          </Text>
          <Text
            color={"gray"}
            width={52}
            height={28}
            padding={5}
            borderRadius={10}
            marginTop={5}
            marginRight={4}
            bgGradient={`linear(210deg,${first} ,  ${second}  )`} // blanchedalmond, honeydew
            boxShadow="lg"
            fontSize={18}
            fontFamily={"sans-serif"}
          >
            <b>Stands Count</b> <br />
            <Text
              color={"green.400"}
              fontSize={32}
              marginLeft={10}
              fontFamily={"fantasy"}
            >
              1506
            </Text>
            {/*all.data?.standsCount*/}
          </Text>
          <Text
            color={"gray"}
            width={52}
            height={28}
            padding={5}
            borderRadius={10}
            marginTop={5}
            marginRight={4}
            bgGradient={`linear(210deg,${first} ,  ${second}  )`} // blanchedalmond, honeydew
            boxShadow="lg"
            fontSize={18}
            fontFamily={"sans-serif"}
          >
            <b>Stands Count</b> <br />
            <Text
              color={"gray.600"}
              fontSize={32}
              marginLeft={14}
              fontFamily={"fantasy"}
            >
              90
            </Text>
            {/*all.data?.standsCount*/}
          </Text>
          <Text
            color={"gray"}
            width={52}
            height={28}
            padding={5}
            borderRadius={10}
            marginTop={5}
            marginRight={4}
            bgGradient={`linear(210deg,${first} ,  ${second}  )`} // blanchedalmond, honeydew
            boxShadow="lg"
            fontSize={18}
            fontFamily={"sans-serif"}
          >
            <Icon as={BsFiletypeXlsx} boxSize={8} />
            <Text fontSize={18} marginRight={-10} marginLeft={9} marginTop={-8} marginBottom={2}>
              <b>Visitors Report</b>{" "}
            </Text>
            <Link fontSize={14} color={'green.400'} marginRight={-10} marginLeft={20} marginTop={6}>
              <b>Download</b>{" "}
              <Icon as={FaDownload} boxSize={4} />
            </Link>
            
            {/*all.data?.visitorsCount*/}
          </Text>
        </Box>
        <Box>
          {" "}
          <Box
            boxSize={"md"}
            height={"fit-content"}
            padding={5}
            borderRadius={10}
            marginTop={5}
            marginRight={4}
            bgColor={""}
            bgGradient={`linear(80deg,${first} ,  ${second}  )`}
            boxShadow="lg"
          >
            <Box marginY={5}>
              <Line data={dataAge} options={optionsAge} />
            </Box>
          </Box>
          <Box
            boxSize={"md"}
            height={"fit-content"}
            padding={5}
            borderRadius={10}
            marginTop={5}
            marginRight={4}
            bgGradient={`linear(210deg,${first} ,  ${second}  )`} // blanchedalmond, honeydew
            boxShadow="lg"
          >
            <Box marginY={5}>
              <Bar data={data} options={options} />
            </Box>
          </Box>
        </Box>
        <Box>
          <Stack
            boxSize={"sm"}
            padding={5}
            borderRadius={10}
            marginTop={5}
            placeItems={"center"}
            marginRight={4}
            bgGradient={`linear(40deg,${first} ,  ${second}  )`}
            boxShadow="lg"
          >
            <Pie data={datafinincial} options={optionsPie} />
            {/*<Text fontSize={12}>{finincial.data?.message}</Text>*/}
          </Stack>
          <Stack
            color={"gray"}
            width={"SM"}
            height={40}
            padding={5}
            borderRadius={10}
            marginTop={5}
            marginRight={4}
            bgGradient={`linear(210deg,${first} ,  ${second}  )`} // blanchedalmond, honeydew
            boxShadow="lg"
            fontSize={18}
            fontFamily={"sans-serif"}
          >
            {" "}
            <Text marginLeft={32}>Active Days</Text>
            <HStack>
              <Box
                marginLeft={4}
                bgColor={"green.300"}
                borderRadius={5}
                boxSize={8}
              />
              <Box
                marginLeft={2}
                bgColor={"green.500"}
                boxSize={8}
                borderRadius={5}
              />
              <Box
                marginLeft={2}
                bgColor={"green.500"}
                boxSize={8}
                borderRadius={5}
              />
              <Box
                marginLeft={2}
                bgColor={"green.300"}
                boxSize={8}
                borderRadius={5}
              />
              <Box
                marginLeft={2}
                bgColor={"green.100"}
                boxSize={8}
                borderRadius={5}
              />
              <Box
                marginLeft={2}
                bgColor={"yellow.200"}
                boxSize={8}
                borderRadius={5}
              />
              <Box
                marginLeft={2}
                bgColor={"green.300"}
                boxSize={8}
                borderRadius={5}
              />
            </HStack>
            <HStack>
              <Box
                marginLeft={4}
                bgColor={"yellow.200"}
                boxSize={8}
                borderRadius={5}
              />
              <Box
                marginLeft={2}
                bgColor={"green.500"}
                boxSize={8}
                borderRadius={5}
              />
              <Box
                marginLeft={2}
                bgColor={"green.300"}
                boxSize={8}
                borderRadius={5}
              />
            </HStack>
          </Stack>
        </Box>
      </HStack>
    </>
  );
};

export default Reports;
