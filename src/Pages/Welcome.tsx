import { HStack, Image } from "@chakra-ui/react";
import welcome from "../assets/welcoome.jpg";
import LoginForm from "../components/LoginForm";
import resizeWindow from "../services/resizeWindow";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import CompanyRegister from "../components/CompanyRegister";

const Welcome = () => {
  const { width, height } = resizeWindow();
  const [login, setLogin] = useState(true);
  const [moveImg, setMoveImg] = useState(false);
  const [moveImgCom, setMoveImgCom] = useState(false);
  const [openReg, setOpenReg] = useState(false);
  const [openComReg, setOpenComReg] = useState(false);

  return (
    <motion.div>
      <HStack>
        {moveImg && ( //register
          <motion.div
            initial={false}
            animate={{ width: openReg ? "auto" : 0 }}
            transition={{ duration: 1 }}
            style={{ overflow: "hidden" }}
          >
            <RegisterForm
              close={() => {
                setOpenReg(false);
                setTimeout(() => setMoveImg(false), 1000);
                setTimeout(() => setLogin(true), 1500);
              }}
            />
          </motion.div>
        )}
        {moveImgCom && ( //register company
          <motion.div
            initial={false}
            animate={{ width: openComReg ? "auto" : 0 }}
            transition={{ duration: 1 }}
            style={{ overflow: "hidden" }}
          >
            <CompanyRegister
              close={() => {
                setOpenComReg(false);
                setTimeout(() => setMoveImgCom(false), 1000);
                setTimeout(() => setLogin(true), 1500);
              }}
            />
          </motion.div>
        )}

        <Image
          src={welcome}
          width={{ md: (60 * width) / 100, base: 0 }}
          height={height}
          borderRightRadius={moveImg || moveImgCom ? 0 : 20}
          borderLeftRadius={moveImg || moveImgCom ? 20 : 0}
        />

        {!moveImg &&
          !moveImgCom && ( //login
            <motion.div
              initial={false}
              animate={{ width: login ? "auto" : 0 }}
              transition={{ duration: 1 }}
              style={{ overflow: "hidden" }}
            >
              <LoginForm
                close={(n: string) => {
                  setLogin(false);
                  if (n == "E") {
                    setTimeout(() => setMoveImg(true), 1000);
                    setTimeout(() => setOpenReg(true), 1500);
                  } else {
                    setTimeout(() => setMoveImgCom(true), 1000);
                    setTimeout(() => setOpenComReg(true), 1500);
                  }
                }}
              />{" "}
            </motion.div>
          )}
      </HStack>
    </motion.div>
  );
};

export default Welcome;
