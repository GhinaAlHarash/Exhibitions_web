import useFetchData from "../hooks/useFetchData";
import useFetchExh, { Exh } from "../hooks/useFetchExh";
import ShowExh from "./ShowExh";

interface Props {
  Exhs: Exh;
}

const HomeExhs = () => {
  const Exhs = useFetchData<Exh>(`/api/showAvailableExhibition`, true);

  return (
    <ShowExh
      Exhs={Exhs.data}
      fun={() => Exhs.refetch()}
      loading={Exhs.isLoading}
    />
  );
};

export default HomeExhs;
