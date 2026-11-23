interface GraphQLResponse<T> {
    data?: T | null;
    errors?: Array<{ message: string }>;
}

export class EmptyDataError extends Error { }
export async function request<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ query, variables })
    })
    if (!response.ok) {
        throw new Error(`HTTP jib,rf ${response.status}`)
    }
    const result: GraphQLResponse<T> = await response.json()

    if (result.errors?.length) {
        throw new Error(
            result.errors.map((error) => error.message).join("; "),
        );
    }


    if (result.data == null) {
        throw new EmptyDataError('Пустые данные')
    }

    return result.data
}