import { ApiError } from "../utils/ApiError.js";
import expressAsyncHandler from "express-async-handler";
import { formatAttendance, formatTimetable } from "../utils/formatData.js";

export const fetchTimeTable = expressAsyncHandler(async (_, res) => {
  const url = "https://qums.quantumuniversity.edu.in/Web_StudentAcademic/FillStudentTimeTable";
  let response, data;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `ASP.NET_SessionId=${process.env.ERP_SESSION_ID}`
      },
      body: JSON.stringify({
        RegID: process.env.ERP_REG_ID || 9490, // My (Kaushik's) RegID. replace with yours to see your timetable
      }),
    }); 

    data = await response.json();
  } catch (error) {
    if (!response) {
      throw new ApiError(500, "Error connecting to ERP server", error);
    } else {
      throw new ApiError(401, "Session might have expired. Please update ERP_SESSION_ID in .env");
    }
  }

  res.send(formatTimetable(data));
});

export const fetchAttendance = expressAsyncHandler(async (req, res) => {
  const url = "https://qums.quantumuniversity.edu.in/Web_StudentAcademic/GetYearSemWiseAttendance";
  let response, data;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `ASP.NET_SessionId=${process.env.ERP_SESSION_ID}`
      },
      body: JSON.stringify({
        RegID: process.env.ERP_REG_ID || 9490, // My (Kaushik's) RegID. replace with yours to see your timetable
        YearSem: 3 // Change this to fetch attendance for different semesters
      }),
    }); 

    data = await response.json();
  } catch (error) {
    if (!response) {
      throw new ApiError(500, "Error connecting to ERP server", error);
    } else {
      throw new ApiError(401, "Session might have expired. Please update ERP_SESSION_ID in .env");
    }
  }

  res.send(formatAttendance(data));
});

export const fetchCirculars = expressAsyncHandler(async (req, res) => {
  // Logic to fetch circulars from ERP and save to /data/erp/circulars
  res.send("Circulars fetched and saved to /data/erp/circulars successfully");
});

export const fetchUserDetails = expressAsyncHandler(async (req, res) => {
  // Logic to fetch user details from ERP and save to /data/erp/userDetails
  res.send(
    "User details fetched and saved to /data/erp/userDetails successfully"
  );
});

export const fetchAssignments = expressAsyncHandler(async (req, res) => {
  // Logic to fetch assignments from ERP and save to /data/erp/assignments
  res.send(
    "Assignments fetched and saved to /data/erp/assignments successfully"
  );
});
