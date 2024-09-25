import { useRef, useState } from "react";

interface Props{
    name:string;
}

const useFieldForm = ({name}:Props) => {
    
  const ref = useRef<HTMLInputElement>(null);
  const [warning, setWarning] = useState(false);

  return 
}

export default useFieldForm