import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    findScraps: offsetLimitPagination(["receiverId"])
                }
            }
        }
    }),
    link: new HttpLink({
        uri: '/'
    })
})

export default client