const express=require("express")
const graphqlHTTP=require("express-graphql");
const {buildSchema}=require("graphql");

const schema=buildSchema(`
    type Query{
        rollDice(numDice: Int!,numSides:Int):[Int]
    }
`);


const root={
    rollDice:({numDice,numSides})=>{
        let output=[];
        let i;
        for(i=0;i<numDice;i++){
            output.push(1+Math.floor(Math.random()*(numSides||6)));
        }
        return output
    }
}
const app=express();
app.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true,
}))

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");