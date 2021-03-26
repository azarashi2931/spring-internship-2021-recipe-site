module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/recipes',
                permanent: true,
            },
        ]
    },
    images: {
        domains: ['img.cpcdn.com', 'staff-recipes-images-prod.s3.ap-northeast-1.amazonaws.com'],
    },
}