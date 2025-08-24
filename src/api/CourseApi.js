import api from "./axios";

export const fetchCourses = () => api.get("/courses").then(r => r.data);
export const fetchCourseById = (id) => api.get(`/courses/${id}`).then(r => r.data);
