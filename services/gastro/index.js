const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const axios = require('axios');

  axios.post('https://api-euwest.graphcms.com/v1/ck3le2a5m2dtk01fj065qcvv7/master', {
    query:
      '{gastroes{ gastroId  name  menuDescription  telephone  images}}'
 }).then((result)=>{console.log(result)});

const typeDefs = gql`
  extend type Query {
    gastro: Gastro
  }
  type Gastro @key(fields: "name") {
    name: String!
    menu: [String]
    vegan: Boolean!
  }
`;

const resolvers = {
  Query: {
    gastro() {
      return gastronomy[0];
    }
  },
  Gastro: {
    __resolveReference(object) {
      return gastronomy.find(gastros => gastros.name === object.name);
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

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const gastronomy = [
  {
    name: "pescaito",
    menu: ["calamareh", "choco", "puntillitah..."],
    telephone: "53454325",
    vegan: false
  }
];
