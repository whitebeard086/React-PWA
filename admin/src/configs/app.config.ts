export type AppConfig = {
    apiPrefix: string
    imagePath: string
    filePath: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    // apiPrefix: 'https://api.taskitly.com/api/admin',
    apiPrefix: 'http://localhost:8000/api/admin',
    imagePath: 'https://s3.eu-central-1.wasabisys.com/taskitly',
    filePath: 'https://s3.eu-central-1.wasabisys.com/taskitly',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/login',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
