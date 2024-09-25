import {
  Box,
  Button,
  ButtonSpinner,
  HStack,
  Icon,
  Image,
  Skeleton,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import resizeWindow from "../services/resizeWindow";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import apiClient from "../services/apiClient";
import { PiXBold } from "react-icons/pi";
import addphoto from "../assets/addphoto.jpg";
import noImage from "../assets/noImage.png";
import useDelImgExh from "../hooks/useDelImgExh";
import useFetchOneExh from "../hooks/useFetchOneExh";

interface Props {
  images: { id: number; url: string }[] | undefined;
  fun: () => void;
}

const ExhImages = ({ images, fun }: Props) => {
  const [delImg, setDelImg] = useState(false);
  const [idImg, setIdImg] = useState(-1);

  const [skeletons, setskeletons] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const deleteImg = useDelImgExh(idImg, delImg);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const data = new FormData();

    const file =
      event.target.files && event.target.files[0]
        ? event.target.files[0]
        : null;
    console.log(event.target.value.toString());
    if (file) {
      data.append("img", file);
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apiClient
      .post(
        `http://127.0.0.1:8000/api/addExhibitionMedia/${localStorage.getItem(
          "CurrentExhId"
        )}`,
        data,
        config
      )
      .then((res) => {
        fun();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    document?.getElementById("fileInput")?.click();
  };

  const { width, height } = resizeWindow();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: images?.length ? Math.min(4, images?.length || 0) : 4,
    slidesToScroll: 1,
    initialSlide: localStorage.getItem("useroles") != "company" ? 0 : 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: images?.length ? Math.min(3, images?.length || 0) : 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: images?.length ? Math.min(2, images?.length || 0) : 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (delImg && deleteImg.backStatus === 200) {
      setIdImg(-1);
      setDelImg(false);
    }
    setTimeout(() => {
      if (images?.length == 0) setskeletons([]);
    }, 4000);
  }, [idImg, delImg, skeletons, deleteImg]);

  return (
    <Stack
      style={{ height: 280 }}
      marginTop={8}
      boxSize={{ base: (width * 8) / 12, sm: (width * 9.5) / 12 }}
      marginLeft={10}
    >
      {deleteImg.isLoading ? <></> : <>{(window.location as any).reload()}</>}
      {skeletons.length ? (
        <Slider {...settings}>
          {localStorage.getItem("useroles") != "company" ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />

              <Box
                borderRadius={20}
                boxSize={280}
                bgRepeat={"no-repeat"}
                bgPosition={"center"}
                bgSize={"cover"}
                bgImg={addphoto}
                onClick={handleClick}
                zIndex={10}
              />
            </div>
          ) : (
            <></>
          )}
          {images?.length
            ? images?.map((image, index) => (
                <div key={index}>
                  <Box
                    borderRadius={20}
                    boxSize={280}
                    bgRepeat={"no-repeat"}
                    bgPosition={"center"}
                    bgSize={"cover"}
                    bgImg={`http://127.0.0.1:8000/storage/${image.url}`}
                  >
                    {localStorage.getItem("useroles") != "company" && (
                      <Tooltip
                        label="delete image"
                        placement="bottom"
                        bg="gray.300"
                        color="black"
                      >
                        <span
                          style={{
                            zIndex: 99999,
                            display: "inline-block",
                            position: "sticky",
                            marginLeft: "calc(115% - 100px)",
                            marginTop: "0.5vh",
                          }}
                        >
                          <Button
                            marginLeft={1}
                            boxSize={4}
                            bgColor={"red.300"}
                            colorScheme="red"
                            outlineColor={"white"}
                            onClick={() => {
                              if (image.id) setIdImg(image.id);
                              setDelImg(true);
                            }}
                          >
                            <Icon boxSize={4} as={PiXBold} />
                          </Button>
                        </span>
                      </Tooltip>
                    )}
                  </Box>
                </div>
              ))
            : skeletons.map((index) => (
                <div key={index}>
                  <Skeleton borderRadius={20} boxSize={280} />
                </div>
              ))}
        </Slider>
      ) : (
        <HStack placeContent={"center"}>
          {localStorage.getItem("useroles") == "organizer" ||
          localStorage.getItem("useroles") == "employee" ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />

              <Box
                borderRadius={20}
                boxSize={280}
                bgRepeat={"no-repeat"}
                bgPosition={"center"}
                bgSize={"cover"}
                bgImg={addphoto}
                onClick={handleClick}
                zIndex={10}
              />
            </div>
          ) : (
            <Box
              borderRadius={20}
              boxSize={280}
              bgRepeat={"no-repeat"}
              bgPosition={"center"}
              bgSize={"cover"}
              bgImg={noImage}
              onClick={handleClick}
              zIndex={10}
            />
          )}
        </HStack>
      )}
    </Stack>
  );
};

export default ExhImages;
