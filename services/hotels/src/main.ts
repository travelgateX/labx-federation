import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    getHotels: [Hotel]
    getOneHotels: Hotel
  }
  type Hotel @key(fields: "id") {
    id: ID
    name: String
    rooms: [Int]
    price: String
    currency: String
    description: String
    images: [String]
    telephone: Int
  }
`;

const resolvers = {
  Query: {
    getHotels() {
      return hotels;
    },
    getOneHotels() {
      return hotels[0];
    }
  },
  User: {
    __resolveReference(object) {
      return hotels.find(user => user.id === object.id);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4004 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const hotels = [
  {
    id: 1,
    name: "",
    rooms: "",
    price: "",
    currency: "",
    destination: "",
    description: "",
    images: "",
    telephone: 54347475
  }
];
