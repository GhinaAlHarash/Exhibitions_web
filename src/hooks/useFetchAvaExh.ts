import React from 'react'
import useFetchData from './useFetchData';
import { Exh } from './useFetchExh';

const useFetchAvaExh = () => {
    return useFetchData<Exh>(`/api/showUnRegisterCompanyExhibition`, true);
}

export default useFetchAvaExh