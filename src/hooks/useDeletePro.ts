import React from 'react'
import useDelete from './useDelete';

const useDeletePro = (enable: boolean, id: number, fun: () => void) => {
    const res = useDelete<"">(`/api/deleteProduct/${id}`, enable, fun);
    return res;
}

export default useDeletePro