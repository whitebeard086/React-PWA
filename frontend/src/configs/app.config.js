const appConfig = {
    // apiPrefix: 'https://api.anipartna.com/api',
    // imagePrefix: 'https://api.anipartna.com/storage',
    // videoPrefix: 'https://api.anipartna.com/storage',
    apiPrefix: 'http://localhost:8000/api',
    imagePath: 'https://s3.eu-central-1.wasabisys.com/taskitly',
    videoPrefix: 'http://localhost:8000/storage',
    socketURL: 'http://localhost:8800',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/login',
    tourPath: '/',
    enableMock: false
}

export default appConfig