import { unzip } from "lodash-es";

export const sumAll = arr => arr.reduce((a, b) => a + b, 0);
export const mulAll = arr => arr.reduce((a, b) => a * b, 1);

export const transpose = (matrix) => unzip(matrix)