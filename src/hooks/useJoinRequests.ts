import React from 'react'
import useFetchData from './useFetchData';
import { profileCom } from './useComProfile';

const useJoinRequests = () => {
    return useFetchData<profileCom>(
        `/api/showCompanyRegisterRequest`,
        true
      );
}

export default useJoinRequests