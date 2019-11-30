import axios from "axios";

export async function getOneHotelById(id: string) {
  const hotels = await this.getAllHotels();
  if (hotels) {
    return hotels.find(h => h.id === id);
  }
  return null;
}

export async function getAllHotels() {
  const { data, errors } = await this.request();
  if (!errors && data.hotels) {
    return data.hotels.map(h => ({ ...h, id: String(h.idHotel) }));
  }
  return [];
}

export async function request(): Promise<{ data?: any[]; errors: any[] }> {
  const query = `
    query getHotels {
      hotels {
        idHotel
        name
        averagePrice
        currency
        images
        telephone
      }
    }
  `;
  const {
    data
  } = await axios.post(
    "https://api-euwest.graphcms.com/v1/ck3lh8hjwhc0u01ffcix5b9qg/master",
    { query }
  );
  return data;
}
