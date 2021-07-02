import { API } from "../../backend";

//CANDIDATE
//create
export const createCandidate = async (adminId, token, reqBody) => {
  let data;

  for (let i = 0; i < reqBody.length; i++) {
    data = await fetch(`${API}/add/candidates/${adminId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: reqBody[i].formData,
    });
  }

  return data.json();
};

export const createCandidateForBulk = async (adminId, token, reqBody) => {
  const data = await fetch(`${API}/add/candidates/bulk/${adminId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: reqBody,
  });

  return data.json();
};

//read
export const getAllCandidates = (userId, token) => {
  return fetch(`${API}/candidates/${userId}`, {
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

//delete
export const deleteCandidate = (adminId, token, candidateId) => {
  return fetch(`${API}/delete/candidates/${candidateId}/${adminId}`, {
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