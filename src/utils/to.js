import { isArray } from "./is";

export const toArray = (arr) => (!isArray(arr) ? Array.of(arr) : arr);
