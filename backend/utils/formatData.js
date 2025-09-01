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

export function formatAttendance(rawData) {
  if (!rawData || !rawData.state || !rawData.data) {
    throw new Error("Invalid input: missing 'state' or 'data'");
  }

  // Parse strings into JSON
  const overall = JSON.parse(rawData.state)[0];
  const subjects = JSON.parse(rawData.data);

  // Build structured output
  return {
    attendance_summary: {
      date_from: overall.DateFrom,
      date_to: overall.DateTo,
      total_lectures: overall.TotalLecture,
      total_present: overall.TotalPresent,
      total_absent: overall.TotalAbsent,
      total_leave: overall.TotalLeave,
      percentage: overall.TotalPercentage
    },
    subject_wise_attendance: subjects.map(sub => ({
      subject: sub.Subject,
      code: sub.SubjectCode,
      id: sub.SubjectID,
      year_sem: sub.YearSem,
      credit: sub.SubjectCredit,
      stats: {
        date_from: sub.DateFrom,
        date_to: sub.DateTo,
        total_lectures: sub.TotalLecture,
        present: sub.TotalPresent,
        absent: sub.TotalAbsent,
        leave: sub.TotalLeave,
        percentage: sub.Percentage
      }
    }))
  };
}
