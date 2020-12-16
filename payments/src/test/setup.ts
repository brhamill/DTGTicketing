import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface Global {
      signup(id?: string): string[]
    }
  }
}

jest.mock('../nats-wrapper')

process.env.STRIPE_KEY = 'sk_test_7njtwdYqUNwPZdZpTcRslXnb00q8JMLACD'

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongo.stop()
})

global.signup = (id?: string) => {
  // Build a JWT payload: { id, email }
  const payload = {
    id: id || mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  }

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Build session object: { jwt: MY_JWT }
  const session = { jwt: token }

  // Turn the session into JSON
  const sessionJSON = JSON.stringify(session)

  // Take the JSON and encode as Base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // Return a string that's the cookie with the encoded data
  return [`express:sess=${base64}`]
}
