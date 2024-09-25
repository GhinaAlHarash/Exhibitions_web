import React from 'react'
import useFetchData from './useFetchData';

const useRejCompExh = (
    enable: boolean,
    id: number,
    fun: () => void = () => {}) => {
        let Eid = Number(localStorage.getItem("CurrentExhId"));
        return useFetchData<"">(
          `/api/rejectCompanyExhibitionRequest/${id}/${Eid}`,
          enable,
          fun
        );
}

export default useRejCompExh