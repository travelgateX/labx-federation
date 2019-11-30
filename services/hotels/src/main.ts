import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";
import { getAllHotels, getOneHotelById } from "./hotels";

const typeDefs = gql`
  extend type Query {
    hotels: [Hotel]
    hotel(id: Int!): Hotel
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
    hotels() {
      return getAllHotels();
    },
    hotel(_, args) {
      return getOneHotelById(args.id);
    }
  },
  Hotel: {
    __resolveReference(object) {
      return getOneHotelById(object.id);
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

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Hotels Service ${url}`);
});
