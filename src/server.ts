import { app } from './app'
import { env } from './env'

app.get('/', () => {
  return { hello: 'Welcome, world' }
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on port ${env.PORT}`)
})
