import { create } from "zustand";
import { Exh } from "../hooks/useFetchExh";
import { company } from "../hooks/useFetchAllComp";

interface CompStore {
  companys: company[] | undefined;
  setCompanys: (company: company[]) => void;
}

const useCompStore = create<CompStore>()((set) => ({
  companys: undefined,
  setCompanys: (company) => set(() => ({ companys: company })),
}));

export default useCompStore;
