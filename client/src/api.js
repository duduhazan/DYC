import axios from "axios";

export const serverUrl = import.meta.env.VITE_SERVER_URL;
console.log("using server url", serverUrl);
const client = axios.create({ baseURL: serverUrl, withCredentials: true });
client.interceptors.response.use((res) => {
  if (res.status === 401) {
    window.location.href = "/regular";
  }
  return res;
});

export class Api {
  static async registerUser(user) {
    const { data } = await client.post("/api/users", user);
    return data;
  }

  static async loginUser(user) {
    const { data } = await client.post("/auth", user);
    return data;
  }

  static async getCards(params) {
    const { data } = await client.get("/cards", { params });
    return data;
  }

  static async getOneCard(cardID) {
    const { data } = await client.get(`/cards/${cardID}`);
    return data;
  }

  static async addCard(card) {
    const { data } = await client.post("/cards", card);
    return data;
  }

  static async updateCard(id, newCard) {
    const { data } = await client.put(`/cards/${id}`, newCard);
    return data;
  }

  static async deleteCard(cardID) {
    const { data } = await client.delete(`/cards/${cardID}`);
    return data;
  }

  static async likeCard(cardId) {
    const { data } = await client.post(`/user-cards/${cardId}/like`);
    return data;
  }

  static async getUser() {
    const { data } = await client.get(`/user`);
    return data;
  }
}
