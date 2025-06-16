import { TypeStudentsProgressData } from "../type";

interface studentsProps {
    studentsData: TypeStudentsProgressData;
}

export default function StudentsProgress(props: studentsProps){

    return (
        <div className="bodyStudentsProgress">
            <div className="studentsProgress_contentC1">
                <h1>{props.studentsData.stu_name}</h1>
            </div>
            <div className="studentsProgress_ContentC2">
                <h1>{props.studentsData.prog_lev_id}</h1>
            </div>
            <div className="studentsProgress_ContentC3">
                <h1>{props.studentsData.prog_date}</h1>
            </div>
        </div>
    );
}