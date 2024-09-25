import useFetchData from "./useFetchData";

export interface Exh {
  id: number | undefined;
  title: string | undefined;
  cover_img: string | null | undefined;
  body: string | undefined;
  start_date: string | undefined;
  end_date: string | undefined;
  time: string | undefined;
  price: number | undefined;
  location: string | undefined;
  exhibition_map: string | undefined;
  number_of_stands: number | null | undefined;
}

const useFetchExh = (enable: boolean) => {
  let role = localStorage.getItem("useroles");
  console.log(localStorage.getItem("userToken"));
  if (role == "employee")
    return useFetchData<Exh>(`/api/showEmployeeExhibition`, enable);
  else if (role == "organizer") {
    let id = Number(localStorage.getItem("userId"));
    return useFetchData<Exh>(`/api/showOrganizerExhibition`, enable);
  } else {
    return useFetchData<Exh>(`/api/showAvailableExhibition`, enable);
  }
};
export default useFetchExh;
