import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {Breadcrumb, Container} from "react-bootstrap";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import {themes} from "../../constants/Themes";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

const localizer = momentLocalizer(moment);

const events = [
  {
    start: new Date("2024-03-19T06:10:00+00:00"),
    end: new Date("2024-03-19T09:10:00+00:00"),
    title: "HTML midterm",
  },
  {
    start: new Date("2024-03-19T07:10:00+00:00"),
    end: new Date("2024-03-19T10:10:00+00:00"),
    title: "HTML Test",
  },
  {
    start: new Date("2024-03-19T11:10:00+00:00"),
    end: new Date("2024-03-19T12:10:00+00:00"),
    title: "HTML Test",
  },
];

const CalendarPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [allSubjects, setAllSubjects] = useState<any[]>([]);
  // useEffect(() => {
  //   setAllSubjects(main.allSubjects);
  // }, [main.allSubjects]);

  return (
    <>
      <div style={{marginTop: "10px"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <h5 style={{fontWeight: "bold", textAlign: "left", margin: 0}}>Calendar</h5>
          <div style={{marginLeft: "auto"}}></div>
        </div>
        <Breadcrumb style={{fontSize: 14}}>
          <Breadcrumb.Item linkAs={Link} linkProps={{to: "/calendar"}} active>
            Calendar
          </Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Calendar localizer={localizer} step={60} startAccessor="start" endAccessor="end" style={{height: "82.5vh"}} events={events} //popup 
          />
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
