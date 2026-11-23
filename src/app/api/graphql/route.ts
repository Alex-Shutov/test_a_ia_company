import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createSchema, createYoga } from "graphql-yoga";

import { resolvers } from "@/server/graphql/resolvers";

interface NextContext {
    params: Promise<Record<string, string>>;
}


const typeDefs = readFileSync(
    join(process.cwd(), "src/server/graphql/schema.graphql"),
    "utf-8",
);



const { handleRequest } = createYoga<NextContext>({
    schema: createSchema({
        typeDefs,
        resolvers,
    }),
    graphqlEndpoint: "/api/graphql",
});

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS };
