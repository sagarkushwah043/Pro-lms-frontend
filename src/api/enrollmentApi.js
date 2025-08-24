import api from "./axios";

export const enrollCourse = (courseId, userId) =>
  api.post("/enrollments", { courseId, userId }).then(r => r.data);

export const unenrollCourse = (enrollmentId) =>
  api.delete(`/enrollments/${enrollmentId}`).then(r => r.data);

export const fetchUserEnrollments = (userId) =>
  api.get(`/enrollments/user/${userId}`).then(r => r.data);
