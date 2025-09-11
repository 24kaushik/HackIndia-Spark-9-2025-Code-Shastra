import { ApiError } from "../utils/ApiError.js";
import expressAsyncHandler from "express-async-handler";
import {
  formatAttendance,
  formatCirculars,
  formatTimetable,
} from "../utils/formatData.js";
import fs from "fs";
import path from "path";
import { dataFolderLocation } from "../constants.js";

export const fetchTimeTable = expressAsyncHandler(async (_, res) => {
  const url =
    "https://qums.quantumuniversity.edu.in/Web_StudentAcademic/FillStudentTimeTable";
  let response, data;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `ASP.NET_SessionId=${process.env.ERP_SESSION_ID}`,
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
      throw new ApiError(
        401,
        "Session might have expired. Please update ERP_SESSION_ID in .env"
      );
    }
  }

  res.send(formatTimetable(data));
});

export const fetchAttendance = expressAsyncHandler(async (_, res) => {
  const url =
    "https://qums.quantumuniversity.edu.in/Web_StudentAcademic/GetYearSemWiseAttendance";
  let response, data;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `ASP.NET_SessionId=${process.env.ERP_SESSION_ID}`,
      },
      body: JSON.stringify({
        RegID: process.env.ERP_REG_ID || 9490, // My (Kaushik's) RegID. replace with yours to see your timetable
        YearSem: 3, // Change this to fetch attendance for different semesters
      }),
    });

    data = await response.json();
  } catch (error) {
    if (!response) {
      throw new ApiError(500, "Error connecting to ERP server", error);
    } else {
      throw new ApiError(
        401,
        "Session might have expired. Please update ERP_SESSION_ID in .env"
      );
    }
  }

  res.send(formatAttendance(data));
});

export const fetchCirculars = expressAsyncHandler(async (req, res) => {
  const url =
    "https://qums.quantumuniversity.edu.in/Web_Teaching/GetCircularDetails";
  let response, data;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `ASP.NET_SessionId=${process.env.ERP_SESSION_ID}`,
      },
    });

    data = await response.json();

    const formattedData = formatCirculars(data);

    for (let i = 0; i < 5; i++) {
      if (formattedData.circulars[i]) {
        const response = await fetch(
          "https://qums.quantumuniversity.edu.in/Web_Teaching/GetCircularAllDetails",
          {
            method: "POST",
            body: JSON.stringify({ CirID: formattedData.circulars[i].id }),
            headers: {
              "Content-Type": "application/json",
              Cookie: `ASP.NET_SessionId=${process.env.ERP_SESSION_ID}`,
            },
          }
        );
        const data = await response.json();
        const circular = JSON.parse(data.state)[0].Circular; // base64 encoded pdf
        const buffer = Buffer.from(circular, "base64");
        const dir = path.join(dataFolderLocation, "circulars");
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(
          path.join(dir, `circular_${formattedData.circulars[i].id}.pdf`),
          buffer
        );
      }
    }

    res.json({ message: "saved" });
  } catch (error) {
    if (!response) {
      throw new ApiError(500, "Error connecting to ERP server", error);
    } else {
      console.log(error);
      throw new ApiError(
        401,
        "Session might have expired. Please update ERP_SESSION_ID in .env"
      );
    }
  }
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
