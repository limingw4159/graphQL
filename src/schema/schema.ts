import * as graphql from "graphql";
import _ = require("lodash");
import { IUserType } from "../Interface/IUserType";

const userData = [
  { id: "1", name: "Bond", age: 36, profession: "painter" },
  { id: "2", name: "asd", age: 15, profession: "programmer" },
  { id: "3", name: "Ana", age: 25, profession: "farmer" },
  { id: "4", name: "Bella", age: 33, profession: "Teacher" },
  { id: "5", name: "Lina Bond", age: 21, profession: "Flyer" },
];
const hobbyData = [
  {
    id: "1",
    title: "Sport",
    description: "all together",
    userId: "1",
  },
  { id: "2", title: "Walking", description: "walker", userId: "2" },
  { id: "3", title: "Swimming", description: "Swimming", userId: "3" },
  {
    id: "4",
    title: "Table Tennis",
    description: "a table ball game",
    userId: "4",
  },
  {
    id: "5",
    title: "Tennis",
    description: "also a table ball game",
    userId: "5",
  },
];
const postsData = [
  { id: "1", comment: "Building a Mind", userId: "1" },
  { id: "2", comment: "Building a Technique", userId: "2" },
  { id: "3", comment: "Building a NicePostData", userId: "3" },
  { id: "4", comment: "Building a NicePostData", userId: "3" },
  { id: "5", comment: "Building a NicePostData", userId: "4" },
  { id: "6", comment: "Building a NicePostData", userId: "5" },
  { id: "7", comment: "Building a NicePostData", userId: "2" },
];
const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const UserType: any = new GraphQLObjectType({
  name: "User",
  description: "document for user....",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PosyType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbyData, { userId: parent.id });
      },
    },
  }),
});
const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      },
    },
  }),
});
const PosyType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      },
    },
  }),
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession,
        };
        return user;
      },
    },
    createPost: {
      type: PosyType,
      args: {
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let post = {
          comment: args.comment,
          userId: args.userId,
        };
        return post;
      },
    },
    createHobby: {
      type: HobbyType,
      args: {
        title: { type: GraphQLString },
        age: { type: GraphQLInt },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let hobby = {
          title: args.title,
          age: args.age,
          description: args.description,
          userId: args.userId,
        };
        return hobby;
      },
    },
  },
});
const RootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        return _.find(userData, { id: args.id });
      },
    },
    hobby: {
      type: HobbyType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(hobbyData, { id: args.id });
      },
    },
    post: {
      type: PosyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postsData, { id: args.id });
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
