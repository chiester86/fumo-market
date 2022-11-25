import { $authHost, $host } from "./index";

export const createFumo = async (fumo) => {
  const { data } = await $authHost.post("api/fumo", fumo);
  return data;
};

export const fetchFumo = async () => {
  const { data } = await $host.get("api/fumo");
  return data;
};

export const fetchOneFumo = async (id) => {
  const { data } = await $host.get("api/fumo/" + id);
  return data;
};

export const fetchDeleteFumo = async (id) => {
  const { data } = await $authHost({ method: "DELETE", url: `api/fumo/${id}` });
  return data;
};

export const updateFumo = async (id, body) => {
  const { data } = await $authHost({
    method: "PUT",
    url: `api/fumo/${id}`,
    data: body,
  });
  return data;
};

export const getAllFumoInAdminPage = async (name, page = 1, filter = "All") => {
  const { data } = await $authHost({
    method: "GET",
    url: `api/fumo/search?page=${page}&name=${name}&filter=${filter}`,
  });
  return data;
};

export const addFumoToCart = async (fumo) => {
  const { data } = await $authHost.post("api/cart", fumo);
  return data;
};

export const getFumoFromCart = async () => {
  const { data } = await $authHost.get("api/cart");
  return data;
};

export const deleteFumoFromCart = async (id) => {
  const { data } = await $authHost.delete(`api/cart/${id}`);
  return data;
};

export const addRating = async (body) => {
  const { data } = await $authHost.post("api/rating", body);
  return data;
};

export const checkRating = async (body) => {
  const { data } = await $authHost.post("api/rating/check-rating", body);
  return data;
};
