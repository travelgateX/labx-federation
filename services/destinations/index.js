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
    hotels: [ID]
    gastro: [ID]
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
        return destinations.find(destionation => destionation.country === object.country && destionation.city === object.city);
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
          country : "Spain",
          city : "Mallorca",
          images : null,
          population : 800000,
          description : "Isla más grande de las Islas Baleares",
          hotels : [1],
          gastro : [1]  
      }
  ];