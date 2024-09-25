import useFetchData from './useFetchData';
import { Exh } from './useFetchExh';

const useFetchompParticExh = () => {
    return useFetchData<Exh>(`/api/showRegisterCompanyExhibition`, true);
}

export default useFetchompParticExh