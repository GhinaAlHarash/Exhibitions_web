import useFetchData from "./useFetchData";

interface Schedule{
    id:number;
    topic_name:string;
    speaker_name:string;
    summary:string;
    body:string;
    img:string;
    date:string;
    time:string;
    about_speaker:string;
    speaker_email:string;
    linkedin:string;
    facebook:string;
}

const useFetchSchedule = (id:string |null) => {
    return useFetchData<Schedule>(`/api/exhibition/schedule/${id}`, true);
}

export default useFetchSchedule