const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    destination: Destination
  }
  type Destination @key(fields: "country city") {
    country: String!
    city: String!
    images: [String]
    population: Int
    description: String
    hotels: [Hotel]
    gastro: [Gastro]
  }
  extend type Gastro @key(fields: "name") {
    name: String! @external
    destination: Destination
  }
  extend type Hotel @key(fields: "id") {
    id: ID! @external
    destination: Destination
  }
`;

const resolvers = {
  Query: {
    destination() {
      return destinations[0];
    }
  },
  Destination: {
    __resolveReference(object) {
      return destinations.find(
        destionation => destionation.country === object.country
      );
    }
  },
  Gastro: {
    destination(gastro) {
      var returnValue = null;
      destinations.forEach(destination => {
        destination.gastro.forEach(gobject => {
          if (gobject.name === gastro.name) {
            returnValue = destination;
          }
        });
      });
      return returnValue;
    }
  },
  Hotel: {
    destination(hotel) {
      var returnValue = null;
      destinations.forEach(destination => {
        destination.hotels.forEach(item => {
          if (item.id === hotel.id) {
            returnValue = destination;
          }
        });
      });
      return returnValue;
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

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const destinations = [
  {
    country: "Spain",
    city: "Mallorca",
    images: null,
    population: 800000,
    description: "Isla más grande de las Islas Baleares",
    hotels: [{ id: "1" }],
    gastro: [{ name: "pescaito" }]
  }
];
