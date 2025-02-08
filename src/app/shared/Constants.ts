export const backendEndPoint = "http://localhost:5199/api/";
export const authLoginPoint = "auth/login";
export const getUserPoint = "auth/";
export const authCreatePoint = "auth/create";

export const getAllAppointmentGETPoint = "appoint";//userId
export const createAppointmentPostPoint = "appoint/create/";//userId
export const updateAppointmentPatchPoint = "appoint/update/";//userId appointmentId
export const appointmentDeletePoint = "appoint/delete";//userId appointmentId
export const headers = {
  "Content-Type": "application/json",
  'Accept': 'application/json'
}

