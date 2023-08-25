export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'http://localhost:8000/api/admin',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/login',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
