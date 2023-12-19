const Fastify = require('fastify')

const main = async () => {
    const instance = Fastify({ logger: true })

    instance.setErrorHandler((error, request, reply) => {
        instance.log.error('Outer error handler got error', error)
        reply.send({ from: 'outer' })
    })

    instance.register(async () => {
        instance.setErrorHandler((error, request, reply) => {
            instance.log.error('Inner error handler got error', error)
            if (!request.url.endsWith('inner-catch')) {
                throw new Error('Error thrown by inner handler')
            }
            reply.send({ from: 'inner' })
        })

        instance.addHook('onRequest', async (request) => {
            if (request.url.startsWith('/hook-throw')) {
                throw new Error('Error thrown from hook')
            }
        })

        const handler = (request, reply) => {
            instance.log.error(`Running handler for ${request.url}`)
            if (request.url.startsWith('/route-throw')) {
                throw new Error('Error thrown from route')
            }
            reply.send({ from: request.url })
        }

        instance.get('/happy', handler)
        instance.get('/route-throw-inner-catch', handler)
        instance.get('/route-throw-inner-throw', handler)
        instance.get('/hook-throw-inner-catch', handler)
        instance.get('/hook-throw-inner-throw', handler)
    })

    try {
        await instance.listen({ port: 3000 })
    } catch (err) {
        instance.log.error(err)
        process.exit(1)
    }
}

main();
