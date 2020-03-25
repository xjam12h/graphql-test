var  {buildSchema, graphql }=require('graphql');

var schema=buildSchema(`
    type Query{
        hello:String
    }
`)

var root={
    hello:()=>{
        return 'Hello World!';
    }
}

graphql(schema,'{hello}',root).then((res)=>{
    console.log(res);
})

/* 
node server.js
 */