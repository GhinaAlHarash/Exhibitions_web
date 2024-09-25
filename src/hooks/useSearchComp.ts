import React from 'react'
import { useNavigate } from 'react-router-dom';
import useSendData from './useSendData';
import useCompStore from '../stores/useCompStore';
import { company } from './useFetchAllComp';

const useSearchComp = () => {
    const navigate = useNavigate();
    const { setCompanys } = useCompStore();
    const res = useSendData<company[], { name: string }>(
      "/api/searchCompany",
      (comps: company[]) => {
        setCompanys(comps);
        navigate("/dash/CompSearch");
        localStorage.setItem("CurrentPage", "compSearch");
      }
    );
    return res;
}

export default useSearchComp