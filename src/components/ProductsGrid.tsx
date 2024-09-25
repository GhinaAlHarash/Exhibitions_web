import {
  Button,
  Card,
  CardFooter,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import resizeWindow from "../services/resizeWindow";
import useFetchProducts from "../hooks/useFetchProducts";
import { FiMinusCircle } from "react-icons/fi";
import { PiXBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import useDeletePro from "../hooks/useDeletePro";

interface Props {
  refetch: () => void;
  products:
    | {
        id: number;
        info: string;
        img: string;
      }[]
    | undefined;
}

const ProductsGrid = ({ refetch, products }: Props) => {
  const [del, setDel] = useState(false);
  const [idPro, setIdPro] = useState(-1);
  const delPro = useDeletePro(del, idPro, refetch);

  const white = useColorModeValue("gray.200", "#303030");
  const { width } = resizeWindow();

  useEffect(() => {
    if (del && delPro.backStatus === 200) {
      setIdPro(-1);
      setDel(false);

      //(window.location as any).reload();
    }
  }, [del, idPro, delPro]);
  return (
    <SimpleGrid
      spacing={4}
      marginTop={1}
      columns={{
        base: width < 660 ? 1 : 2,
        md: width < 860 ? 1 : width < 1220 ? 2 : width < 1240 ? 3 : 4,
      }}
    >
      {products?.map((pro, index) => (
        <Card
          key={index}
          bgColor={white}
          height={"fit-content"}
          borderRadius={20}
          overflow={"hidden"}
        >
          <Image src={`http://127.0.0.1:8000/storage/${pro.img}`} />
          <Tooltip
            label="delete product"
            placement="bottom"
            bg="red.200"
            color="black"
          >
            <span
              style={{
                zIndex: 99999,
                display: "inline-block",
                position: "sticky",
                marginLeft: "calc(124% - 100px)",
                marginTop: "0vh",
              }}
            >
              <Button
                boxSize={4}
                bgColor={white}
                onClick={() => {
                  if (pro.id) setIdPro(pro.id);
                  setDel(true);
                }}
              >
                {localStorage.getItem("useroles") == "company" && (
                  <Icon boxSize={4} color={"red.300"} as={PiXBold} />
                )}{" "}
              </Button>{" "}
            </span>
          </Tooltip>
          <CardFooter>
            <Heading size="md" marginBottom={2} marginTop={-5}>
              {" "}
              {pro.info}{" "}
            </Heading>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default ProductsGrid;
