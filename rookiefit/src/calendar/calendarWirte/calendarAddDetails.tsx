import CalendarWriteDetail from "./calendarWriteDetail";

interface AddedDetailsProps {
    details: string[][];
}

const AddedDetails: React.FC<AddedDetailsProps> = ({ details }) => (
    <div className="added-details">
        {details.map((detail, index) => (
            <div key={index} className="added-detail">
                <CalendarWriteDetail title="운동명" content={detail[0]} />
                <CalendarWriteDetail title="횟수" content={detail[1]} />
                <CalendarWriteDetail title="세트수" content={detail[2]} />
                <CalendarWriteDetail title="휴식시간" content={detail[3]} />
            </div>
        ))}
    </div>
);

export default AddedDetails;