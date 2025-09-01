export function formatTimetable(rawData) {
  if (!rawData || !rawData.state) {
    throw new Error("Invalid input: missing 'state'");
  }

  // Step 1: Parse the timetable
  const timetable = JSON.parse(rawData.state);

  // Step 2: Reformat
  const formatted = {
    class_info: rawData.classname || "",
    timetable: timetable.map(dayObj => {
      const { ["Days/Period"]: dayName, ...periods } = dayObj;

      const periodList = Object.entries(periods)
        .filter(([_, subject]) => subject && subject.trim())
        .map(([period, subject]) => ({
          period,
          subject: subject.trim()
        }));

      return { day: dayName, periods: periodList };
    })
  };

  return formatted;
}
