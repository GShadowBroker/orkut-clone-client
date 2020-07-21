import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { offsetLimitPagination } from '@apollo/client/utilities'

const authLink = setContext((_, { headers }) => {
    const token = JSON.parse(window.localStorage.getItem('token'))
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token.value}` : null,
        }
    }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const memoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getUserPhotos: offsetLimitPagination(),
                getUserScraps: offsetLimitPagination()
            },
        },
    },
})
// const memoryCache = new InMemoryCache()

const client = new ApolloClient({
    cache: memoryCache,
    link: authLink.concat(httpLink)
})

export default client