const hotels = [
  {
    id: "1",
    name: "",
    rooms: "",
    price: "",
    currency: "",
    description: "",
    images: "",
    telephone: 54347475
  }
];

export function getOneHotelById(id: string) {
  return hotels.find(h => h.id === id);
}

export function getAllHotels() {
  return hotels;
}
