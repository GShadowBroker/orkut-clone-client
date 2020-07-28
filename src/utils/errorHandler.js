export default (errors, setError) => {
    if (errors.graphQLErrors.length === 0) {
        setError(`${errors.networkError.statusCode} - ${errors.networkError.name}`)
        return
    }
    if (errors.graphQLErrors[0]) {
        errors.graphQLErrors[0].exception
        ? setError(`${errors.graphQLErrors[0].message}: ${errors.graphQLErrors[0].exception.invalidArgs}`)
        : setError(errors.graphQLErrors[0].message)
        return
    }
    setError('Houve um erro inesperado. Por favor tente mais tarde ou entre em contato com um administrador.')
}