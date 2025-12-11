export interface Category {
  id: number;
  name: string;
  restaurantId: number;
}
export type NewCategory = Omit<Category, "id">;

export interface UpdateCategoryRequestDto {
  name: string;
}