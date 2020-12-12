import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { Ticket } from '../models/ticket'
import { requireAuth, validateRequest } from '@dtgtickets/common'
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = Ticket.build({
      title: req.body.title,
      price: req.body.price,
      userId: req.currentUser!.id,
    })
    await ticket.save()

    const { id, title, price, userId } = ticket

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id,
      title,
      price,
      userId,
    })

    res.status(201).send(ticket)
  }
)

export { router as createTicketRouter }
