import http from "./http";
import type { ProductListResponse } from "../types/product";

export async function getProducts(limit = 10, skip = 0): Promise<ProductListResponse> {
  const { data } = await http.get<ProductListResponse>("/products", {
    params: { limit, skip },
  });
  return data;
}
