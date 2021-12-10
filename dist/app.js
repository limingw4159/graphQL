"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_graphql_1 = require("express-graphql");
const app = express();
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
}));
app.listen(6000, () => {
    console.log("Listening for request on my awesome port 6000");
});
