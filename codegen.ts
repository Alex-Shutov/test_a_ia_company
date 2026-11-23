import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "src/server/graphql/schema.graphql",
    documents: "src/lib/graphql/**/*.graphql",
    generates: {
        "src/server/graphql/generated.ts": {
            plugins: ["typescript", "typescript-resolvers"],
        },
        "src/lib/graphql/generated.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typed-document-node",
            ],
        },
    },
};

export default config;