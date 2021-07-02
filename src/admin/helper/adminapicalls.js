import { API } from "../../backend";

//JOB
//create
export const createJob = (adminId, token, reqBody) => {
  return fetch(`${API}/create/job/${adminId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: reqBody,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//read
export const getAllJobs = (userId, token) => {
  return fetch(`${API}/jobs/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAJob = (userId, token, jobId) => {
  return fetch(`${API}/jobs/${jobId}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update
export const updateJob = (adminId, token, jobId, reqBody) => {
  return fetch(`${API}/update/job/${jobId}/${adminId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete
export const deleteJob = (adminId, token, jobId) => {
  return fetch(`${API}/delete/job/${jobId}/${adminId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};