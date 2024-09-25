import { create } from "zustand";
import { Exh } from "../hooks/useFetchExh";

interface ExhsStore {
  Exhs: Exh[]|undefined;
  setExhs: (Exhs:Exh[])=>void;
}

const useExhStore = create<ExhsStore>()((set) => ({
  Exhs: undefined,
  setExhs: (Exhs)=> set(()=>({Exhs:Exhs})),
}));

export default useExhStore;
