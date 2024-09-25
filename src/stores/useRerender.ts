import { create } from "zustand";
import { ExhOne } from "../hooks/useFetchOneExh";

interface MaininfoStore {
    Exhs: ExhOne|undefined;
    setExhs: (Exhs:ExhOne)=>void;
}

const useMaininfoStore = create<MaininfoStore>()((set) => ({
    Exhs: undefined,
    setExhs: (Exhs)=> set(()=>({Exhs:Exhs})),
}));

export default useMaininfoStore;
