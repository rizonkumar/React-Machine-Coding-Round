function DayTimeSlots() {
  const slots = Array.from({ length: 24 }, (_, index) => index);

  return (
    <div>
      {slots.map((slot, index) => {
        return (
          <div className="slot" key={index}>
            {slot} : 00
          </div>
        );
      })}
    </div>
  );
}

export default DayTimeSlots;
