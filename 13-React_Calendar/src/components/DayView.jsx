import DayTimeSlots from "./DayTimeSlots.jsx";
import Events from "./Events.jsx";
import events from "../data/events.json";

function DayView() {
  return (
    <div className="calendar">
      <div className="right-line"></div>
      <DayTimeSlots />
      <Events events={events} />
    </div>
  );
}

export default DayView;
