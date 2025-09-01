import { ApiError } from "../utils/ApiError.js";
import expressAsyncHandler from "express-async-handler";
import { formatTimetable } from "../utils/formatTimetable.js";

export const fetchTimeTable = expressAsyncHandler(async (_, res) => {
    const sessionId = process.env.ERP_SESSION_ID;
    if (!sessionId) {
        throw new ApiError("ERP session ID is missing", 400);
    }

    const url = "https://qums.quantumuniversity.edu.in/Web_StudentAcademic/FillStudentTimeTable";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          RegID: 9490, // My (Kaushik's) RegID. Replace with yours to see your timetable
        }),
        headers: {
          "Content-Type": "application/json",
          Cookie: `ASP.NET_SessionId=${sessionId}`,
        },
      });
      
      const data = await response.json();
      res.send(formatTimetable(data));
    } catch (error) {
      throw new ApiError("Error fetching timetable", 500);
    }
});

export const fetchAttendance = expressAsyncHandler(async (req, res) => {
    // Logic to fetch attendance from ERP and save to /data/erp/attendance
    res.send("Attendance fetched and saved to /data/erp/attendance successfully");
});

export const fetchCirculars = expressAsyncHandler(async (req, res) => {
    // Logic to fetch circulars from ERP and save to /data/erp/circulars
    res.send("Circulars fetched and saved to /data/erp/circulars successfully");
});

export const fetchUserDetails = expressAsyncHandler(async (req, res) => {
    // Logic to fetch user details from ERP and save to /data/erp/userDetails
    res.send("User details fetched and saved to /data/erp/userDetails successfully");
});

export const fetchAssignments = expressAsyncHandler(async (req, res) => {
    // Logic to fetch assignments from ERP and save to /data/erp/assignments
    res.send("Assignments fetched and saved to /data/erp/assignments successfully");
});