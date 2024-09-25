import React from 'react'
import useSendData from './useSendData';
import { Exh } from './useFetchExh';

const useNewExh = () => {
    const res = useSendData<Exh, Exh>("/api/addExhibition");
    return res;
}

export default useNewExh