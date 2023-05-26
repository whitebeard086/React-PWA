const appConfig = {
    // apiPrefix: 'https://api.anipartna.com/api',
    // imagePrefix: 'https://api.anipartna.com/storage',
    // videoPrefix: 'https://api.anipartna.com/storage',
    apiPrefix: 'http://localhost:8000/api',
    imagePrefix: 'https://s3.eu-central-1.wasabisys.com/nganipartna',
    videoPrefix: 'http://localhost:8000/storage',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/login',
    tourPath: '/',
    enableMock: false
}

export default appConfig