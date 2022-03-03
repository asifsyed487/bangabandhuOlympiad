const graphql = require("graphql");
const QuestionSchema = require("../model/Question");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = graphql;

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    question: { type: GraphQLString },
    opt_1: { type: GraphQLString },
    opt_2: { type: GraphQLString },
    opt_3: { type: GraphQLString },
    correct_ans: { type: GraphQLString },
    Subject: { type: GraphQLString },
    Class: { type: GraphQLString },
    Chapter: { type: GraphQLString },
    serialno: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    questions: {
      type: new GraphQLList(QuestionType),
      args: {
        Subject: { type: GraphQLString },
        Class: { type: GraphQLString },
        Chapter: { type: GraphQLString },
        first: { name: "first", type: GraphQLInt },
        skip: { name: "skip", type: GraphQLInt },
      },
      resolve(parent, args) {
        return QuestionSchema.find({
          Class: args.Class,
          Subject: args.Subject,
          Chapter: args.Chapter,
        })
          .limit(args.first)
          .skip(args.skip);
      },
    },
    question: {
      type: QuestionType,
      args: {
        Class: { type: GraphQLString },
      },
      resolve(parent, args) {
        return QuestionSchema.findOne({ Class: args.Class });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addquestion: {
      type: QuestionType,
      args: {
        question: { type: GraphQLString },
        opt_1: { type: GraphQLString },
        opt_2: { type: GraphQLString },
        opt_3: { type: GraphQLString },
        correct_ans: { type: GraphQLString },
        Subject: { type: GraphQLString },
        Class: { type: GraphQLString },
        Chapter: { type: GraphQLString },
        serialno: { type: GraphQLString },
      },
      resolve(parent, args) {
        let question = new QuestionSchema({
          question: args.question,
          opt_1: args.opt_1,
          opt_2: args.opt_2,
          opt_3: args.opt_3,
          correct_ans: args.correct_ans,
          Subject: args.Subject,
          Class: args.Class,
          Chapter: args.Chapter,
          serialno: args.serialno,
        });

        return question.save();
      },
    },
    updatequestion: {
      type: QuestionType,
      args: {
        question: { type: GraphQLString },
        query: { type: GraphQLString },
        opt_1: { type: GraphQLString },
        opt_2: { type: GraphQLString },
        opt_3: { type: GraphQLString },
        correct_ans: { type: GraphQLString },
        Subject: { type: GraphQLString },
        Class: { type: GraphQLString },
        Chapter: { type: GraphQLString },
        serialno: { type: GraphQLString },
      },
      resolve(parent, args) {
        return QuestionSchema.findOneAndUpdate(
          { question: args.query },

          {
            $set: {
              question: args.question,
              opt_1: args.opt_1,
              opt_2: args.opt_2,
              opt_3: args.opt_3,
              correct_ans: args.correct_ans,
              Subject: args.Subject,
              Class: args.Class,
              Chapter: args.Chapter,
              serialno: args.serialno,
            },
          },
          { new: true }
        ).then((data) => console.log("done", data));
      },
    },

    deletequestion: {
      type: QuestionType,
      args: {
        serialno: { type: GraphQLString },
      },
      resolve(parent, args) {
        return QuestionSchema.findOneAndRemove(
          {
            serialno: args.serialno,
          },
          (err, quen) => {
            if (!err) {
              console.log({ msg: "quen deleted", deleted: quen });
            } else {
              console.log("Error removing :" + err);
            }
          }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
