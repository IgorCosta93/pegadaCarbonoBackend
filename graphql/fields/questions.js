const graphql = require('graphql');
const graphqlISODate = require('graphql-iso-date');
const Questions = require("../../app/models/questions");
const QuestionsType = require("../types/questions");
const Student = require("../../app/models/student");

const {
    GraphQLFloat,
    GraphQLID,
    GraphQLList
} = graphql;

const {
    GraphQLDate
} = graphqlISODate;

const question = {
    type: QuestionsType,
    args: { _id: { type: GraphQLID } },
    resolve(parent, args){
        return Questions.findById(args._id)
    }
};

const questions = {
    type: new GraphQLList(QuestionsType),
    resolve(parent, args) {
        return Questions.find({});
    }
};

const addQuestions = {
    type: QuestionsType,
    args: {
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
    },
    resolve(parent, args){
        let questions = new Questions({
            question1: args.question1,
            question2: args.question2,
            question3: args.question3,
            question4: args.question4,
            question5: args.question5,
            question6: args.question6,
            question7: args.question7,
            total: args.total,
            trees: args.trees,
            user: args.user
        });

        Student.findById(args.user, (err, student) => {
            if(err){
              res.status(500).send(err);
            }else {
                student.questions.push(questions._id);
                student.save(student);
            }
        });

        return questions.save();
    }
};

const updateQuestions = {
    type: QuestionsType,
    args: {
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
    },
    resolve(parent, args){

        Questions.findById(args._id, (err, question) => {
            if(err){
              res.status(500).send(err);
            }else {
                question.question1 = args.question1 || question.question1;
                question.question2 = args.question2 || question.question2;
                question.question3 = args.question3 || question.question3;
                question.question4 = args.question4 || question.question4;
                question.question5 = args.question5 || question.question5;
                question.question6 = args.question6 || question.question6;
                question.question7 = args.question7 || question.question7;
                question.save(question);
            }
        });

    }
};

const removeQuestions = {
    type: QuestionsType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve(parent, args){

        Questions.findByIdAndRemove(args._id, (err, question) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "Questions successfully deleted",
                id: question._id
            };
            return res.status(200).send(response);
        });

    }
};

module.exports = { question, questions, addQuestions, updateQuestions, removeQuestions };