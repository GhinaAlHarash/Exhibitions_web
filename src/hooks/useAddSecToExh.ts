import React from 'react'
import useSendData from './useSendData';

const useAddSecToExh = () => {
    
    let id = Number(localStorage.getItem("CurrentExhId"));
    const res = useSendData<"", {sections:{id:number}[]}>(`/api/addExhibitionSection/${id}`);
    return res;
}

export default useAddSecToExh