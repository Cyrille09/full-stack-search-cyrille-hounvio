export type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
};

export enum TypeName {
  Country = "country",
  City = "city",
  HotelName = "hotel_name",
}

export const DefaultHotel = {
  _id: "",
  chain_name: "",
  hotel_name: "",
  city: "",
  country: "",
};
