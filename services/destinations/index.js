const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const axios = require("axios");
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
  requestGraphCMS();
  console.log(`🚀 Server ready at ${url}`);
});



function requestGraphCMS(){

  axios.post('https://api-euwest.graphcms.com/v1/ck3ledjmf2eb101fj5gcl1f0d/master', {
    query: `{
      destinations{
        city
        country
        images
        description
        gastro
        hotels
      }}`
  }).then(function(res) {
    if ("errors" in res.data){
      console.log("ERROR")

      console.log(res.data["errors"].toString())
    }else{
      
      var data = res.data.data;
      data["destinations"].forEach(dest => {
        destinations.push({
          city: dest["city"],
          country: dest["country"],
          images: dest["images"],
          description: dest["description"],
          hotels: dest["hotels"],
          gastro: dest["gastro"],
        })
      });
    ;
    }
  });
}

var destinations = [

];
