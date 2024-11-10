function Events({ events }) {
  return (
    <div>
      {events?.map((event, index) => {
        const startHour = event.start.split(":")[0];
        const startMinute = event.start.split(":")[1];
        const endHour = event.end.split(":")[0];
        const endMinute = event.end.split(":")[1];
        const top = startHour * 5 + (startMinute / 60) * 5;
        const height =
          (endHour - startHour) * 5 + ((endMinute - startMinute) / 60) * 5;
        return (
          <div
            className="event"
            key={index}
            style={{ top: `${top}rem`, height: `${height}rem` }}
          >
            {event.title}
          </div>
        );
      })}
    </div>
  );
}

export default Events;
