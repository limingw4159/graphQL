import * as graphql from "graphql";
import _ = require("lodash");
const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
} = graphql;

const Person: any = new GraphQLObjectType({
  name: "Person",
  description: "reprsents a person Type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },
    justAType: {
      type: Person,
      resolve(parent, args) {
        return parent;
      },
    },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  description: "Description",
  fields: {
    person: {
      type: Person,
      resolve(parent, args) {
        let personObj = {
          name: "Antonio",
          age: 35,
          isMarried: true,
          gpa: 4.0,
        };
        return personObj;
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
});
