const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const axios = require('axios');

async function request() {
  const res = await axios.post('https://api-euwest.graphcms.com/v1/ck3le2a5m2dtk01fj065qcvv7/master', {
    query:
      '{gastroes{ gastroId  name  menuDescription  telephone  images}}'
  })
  return res.data;
}

async function allGastros() {
  const { data, errors } = await request();
  if (data && !errors)
    return data.gastroes;
}
async function oneGastr(name) {
  const gastrList = await allGastros();
  console.log(gastrList)
  if (gastrList) {
    return gastrList.find(ga => {
      console.log(name === ga.name);
      return name === ga.name;
    })
}
}

const typeDefs = gql`
  extend type Query {
    gastros: [Gastro]
    gastro(name: String!): Gastro
  }
  type Gastro @key(fields: "name") {
    name: String!
    menu: [String]
    vegan: Boolean
  }
`;

const resolvers = {
  Query: {
   async gastros() {
      const list =await  allGastros()
      return list;
    },
    async gastro(root,args, context) {
      return oneGastr(args.name)
    }
  },
  Gastro: {
    __resolveReference(object) {
      return oneGastr(object.name)
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


