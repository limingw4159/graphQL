import * as express from "express";
import { graphqlHTTP } from "express-graphql";

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
  })
);
app.listen(6000, () => {
  console.log("Listening for request on my awesome port 6000");
});
