import { unzip } from "lodash-es";

export const transpose = (matrix) => unzip(matrix)

export const isInMatrix = (matrix, [y, x]) => {
  return y >= 0 && x >= 0 &&
    y < matrix.length &&
    x < matrix[0].length
}