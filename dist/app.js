"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
const app = express();
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
    schema: schema_1.default,
}));
app.listen(8000, () => {
    console.log("Listening for request on my awesome port 8000");
});
