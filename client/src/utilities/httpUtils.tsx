import { httpBaseUtil } from "./httpBaseUtil";

export const fetch = (endpoint: any) => {
  return httpBaseUtil().get(endpoint);
};

export const store = (endpoint: any, data: any) => {
  return httpBaseUtil().post(endpoint, data);
};

export const update = (endpoint: any, data: any) => {
  return httpBaseUtil().put(endpoint, data);
};

export const destroy = (id: any) => {
  return httpBaseUtil().delete(`/${id}`);
};
