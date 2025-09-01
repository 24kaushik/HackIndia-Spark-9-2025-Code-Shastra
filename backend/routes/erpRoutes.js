import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

const erpRouter = Router();

erpRouter.get("/getTimeTable", expressAsyncHandler(async (req, res) => {
    res.send("Time table fetched and saved to /data/erp/timetable successfully");
})); 

erpRouter.get("/getAttendance", expressAsyncHandler(async (req, res) => {
    res.send("Attendance fetched and saved to /data/erp/attendance successfully");
}));

erpRouter.get("/getCirculars", expressAsyncHandler(async (req, res) => {
    res.send("Circulars fetched and saved to /data/erp/circulars successfully");
}));

erpRouter.get("/getUserDetails", expressAsyncHandler(async (req, res) => {
    res.send("User details fetched and saved to /data/erp/userDetails successfully");
}));

erpRouter.get("/getAssignments", expressAsyncHandler(async (req, res) => {
    res.send("Assignments fetched and saved to /data/erp/assignments successfully");
}));


export default erpRouter;