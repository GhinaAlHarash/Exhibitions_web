import { create } from "zustand";
import { Exh } from "../hooks/useFetchExh";
import { company } from "../hooks/useFetchAllComp";
import { vistor } from "../hooks/useFetchAllVis";

interface visStore {
  vistors: vistor[] | undefined;
  setvistors: (company: vistor[]) => void;
}

const useVisStore = create<visStore>()((set) => ({
  vistors: undefined,
  setvistors: (vistors) => set(() => ({ vistors: vistors })),
}));

export default useVisStore;
