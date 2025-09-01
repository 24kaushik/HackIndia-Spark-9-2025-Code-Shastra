import { Router } from "express";
import { fetchAssignments, fetchAttendance, fetchCirculars, fetchTimeTable, fetchUserDetails } from "../controllers/erpController.js";

const erpRouter = Router();


erpRouter.get("/getAttendance", fetchAttendance);
erpRouter.get("/getCirculars", fetchCirculars);
erpRouter.get("/getUserDetails", fetchUserDetails);
erpRouter.get("/getTimeTable", fetchTimeTable);


export default erpRouter;