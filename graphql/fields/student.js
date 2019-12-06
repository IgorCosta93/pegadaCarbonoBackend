const graphql = require('graphql');
const graphqlISODate = require('graphql-iso-date');
const Student = require("../../app/models/student");
const StudentType = require("../types/student");

const {
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphql;

const {
    GraphQLDate
} = graphqlISODate;

const student = {
    type: StudentType,
    args: { _id: { type: GraphQLID } },
    resolve(parent, args){
        return Student.findById(args._id)
    }
};

const students = {
    type: new GraphQLList(StudentType),
    resolve(parent, args) {
        return Student.find({});
    }
};

const addStudent = {
    type: StudentType,
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        ra: { type: GraphQLString }
    },
    resolve(parent, args){

        let student = new Student({
            name: args.name,
            email: args.email,
            ra: args.ra
        });

        return student.save();
    }
};

const updateStudent = {
    type: StudentType,
    args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        ra: { type: GraphQLString }
    },
    resolve(parent, args){

        Student.findById(args._id, (err, student) => {
            if(err){
              res.status(500).send(err);
            }else {
                student.name = args.name || student.name;
                student.email = args.email || student.email;
                student.ra = args.ra || student.ra;
                student.save(student);
            }
        });

    }
};

const removeStudent = {
    type: StudentType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve(parent, args){

        Student.findByIdAndRemove(args._id, (err, student) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "Student successfully deleted",
                id: student._id
            };
            return res.status(200).send(response);
        });

    }
};

module.exports = { student, students, addStudent, updateStudent, removeStudent };