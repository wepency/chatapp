module.exports = {
    port: process.env.PORT,
    local_client_app: process.env.LOCAL_CLIENT_URL,
    remote_client_app: process.env.REMOTE_CLIENT_URL,
    server_api: process.env.NODE_ENV === 'production' ? process.env.REMOTE_SERVER_API : process.env.LOCAL_SERVER_API,
    allowedDomains: (
        process.env.NODE_ENV === 'production' ? [
            process.env.REMOTE_CLIENT_URL,
            process.env.REMOTE_SERVER_API
        ] : [
            process.env.LOCAL_CLIENT_URL,
            process.env.LOCAL_SERVER_API
        ]
    )
};