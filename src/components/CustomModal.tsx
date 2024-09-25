import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props{
    children: ReactNode | ReactNode[];
    buttonLabel: string;
    isOpen: boolean;
    colorLight: string;
    colorDark:string;
    onClose: () => void;
}
const CustomModal = ({ children, buttonLabel, isOpen , onClose ,colorLight, colorDark } : Props) => {
  const {colorMode} = useColorMode();
  const colorr = colorMode === "light" ? colorLight:colorDark; 
  return (
    
      <Modal isOpen={isOpen} size={{lg:'lg' , base:'md'}} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={colorr}>
          <ModalHeader >{buttonLabel}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          
        </ModalContent>
      </Modal>
    
  );
};

export default CustomModal;
