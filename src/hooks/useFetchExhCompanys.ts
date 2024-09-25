import React from 'react'
import useFetchData from './useFetchData';
import { company } from './useFetchAllComp';

const useFetchExhCompanys = (id:string|undefined) => {
    return useFetchData<company>(`/api/showExhibitionCompany/${id}`,true);
}

export default useFetchExhCompanys