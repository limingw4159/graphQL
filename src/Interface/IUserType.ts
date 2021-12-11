import * as graphql from "graphql";

export interface IUserType {
  name: string;
  description: string;
  fields: graphql.ThunkObjMap<graphql.GraphQLFieldConfig<any, any, any>>;
}
