import { API } from "../../backend";

//PARTNER
//create
export const createPartnerInBulk = (adminId, token, reqBody) => {
  return fetch(`${API}/create/channel-partners/bulk/${adminId}`, {
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

export const createSourcingPartnerInBulk = (adminId, token, reqBody) => {
  return fetch(`${API}/create/sourcing-partners/bulk/${adminId}`, {
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
export const getAllChannelPartners = (userId, token) => {
  return fetch(`${API}/channel-partners/${userId}`, {
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

export const getAllSourcingPartners = (userId, token) => {
  return fetch(`${API}/sourcing-partners/${userId}`, {
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