const graphql = require("graphql");
const graphqlISODate = require('graphql-iso-date');

const { 
    GraphQLObjectType, 
    GraphQLID,
    GraphQLFloat
} = graphql;

const {
    GraphQLDate,
} = graphqlISODate;

const QuestionsType = new GraphQLObjectType({
    name: "Questions",
    fields: () => ({
        _id: { type: GraphQLID },
        question1: { type: GraphQLFloat },
        question2: { type: GraphQLFloat },
        question3: { type: GraphQLFloat },
        question4: { type: GraphQLFloat },
        question5: { type: GraphQLFloat },
        question6: { type: GraphQLFloat },
        question7: { type: GraphQLFloat },
        total: { type: GraphQLFloat },
        trees: { type: GraphQLFloat },
        user: { type: GraphQLID },
        createdOn: { type: GraphQLDate }
    })
});

module.exports = QuestionsType;