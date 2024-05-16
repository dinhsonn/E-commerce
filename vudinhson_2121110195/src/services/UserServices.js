// UserServices.js

import httpAxios from "../httpAxios";

function getAll() {
  return httpAxios.get("users");
}

function getById(id) {
  return httpAxios.get("user/show/" + id);
}

function registerUser(data) {
  return httpAxios.post("users", data);
}

function updateUser(id, updatedData) {
  return httpAxios.put(`users/${id}`, updatedData);
}

const UserService = {
  getAll: getAll,
  getById: getById,
  registerUser: registerUser,
  updateUser: updateUser,
};

export default UserService;
