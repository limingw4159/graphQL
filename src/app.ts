import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);
app.listen(8000, () => {
  console.log("Listening for request on my awesome port 8000");
});
