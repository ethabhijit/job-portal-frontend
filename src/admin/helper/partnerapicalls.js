import { API } from "../../backend";

//PARTNER
//create
export const createPartner = (adminId, token, reqBody) => {
  return fetch(`${API}/create/partner/${adminId}`, {
    method: "POST",
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

//read
export const getAllPartners = (userId, token) => {
  return fetch(`${API}/partners/${userId}`, {
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

export const getAPartner = (userId, token, partnerId) => {
  return fetch(`${API}/partners/${partnerId}/${userId}`, {
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
export const updatePartner = (adminId, token, partnerId, reqBody) => {
  return fetch(`${API}/update/partner/${partnerId}/${adminId}`, {
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
export const deletePartner = (adminId, token, partnerId) => {
  return fetch(`${API}/delete/partner/${partnerId}/${adminId}`, {
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