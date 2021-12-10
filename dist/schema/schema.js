"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require("graphql");
const { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const UserType = new GraphQLObjectType({
    name: "User",
    description: "document for user....",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
});
const RootQuery = new GraphQLObjectType({
    name: "rootQueryType",
    description: "Description",
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args) {
                args;
            },
        },
    },
});
