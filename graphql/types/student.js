const graphql = require("graphql");
const graphqlISODate = require('graphql-iso-date');
const Questions = require("../../app/models/questions");
const QuestionsType = require("./questions");

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLList
} = graphql;

const {
    GraphQLDate,
} = graphqlISODate;

const StudentType = new GraphQLObjectType({
    name: "Student",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        ra: { type: GraphQLString },
        questions: { type: GraphQLID },
        questions_info: {
            type: new GraphQLList(QuestionsType),
            resolve(parent, args) {
                return Questions.find({ _id: parent.questions });
            }
        },
        createdOn: { type: GraphQLDate }
    })
});

module.exports = StudentType;