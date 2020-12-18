import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@dtgtickets/common'

import { indexTicketRouter } from './routes/index'
import { createTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show'
import { updateTicketRouter } from './routes/update'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
)
app.use(currentUser)

app.use(indexTicketRouter)
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(updateTicketRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
