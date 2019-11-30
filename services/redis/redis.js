var Redis = require("ioredis");
var redis = new Redis();


function New (){
  new Redis(); // Connect to 127.0.0.1:6379
;}

async function Get(key){
  try {
    const result = await redis.get(key);
    console.log(result);
    return result
  } catch (error) {
    console.error(error)
    return null
  }
} 

function Set(value)