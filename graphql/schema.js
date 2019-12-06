const graphql = require('graphql');
const { student, students, addStudent, updateStudent, removeStudent } = require("./fields/student");
const { question, questions, addQuestions, updateQuestions, removeQuestions } = require("./fields/questions");

const {
    GraphQLObjectType,
    GraphQLSchema
} = graphql;

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        student: student, 
        students: students,
        question: question,
        questions: questions
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStudent: addStudent, 
        updateStudent: updateStudent, 
        removeStudent: removeStudent,
        addQuestions: addQuestions,
        updateQuestions: updateQuestions,
        removeQuestions: removeQuestions,
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});


