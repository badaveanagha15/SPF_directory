import api from "./api";

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const logoutUser = () => {
  return api.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};