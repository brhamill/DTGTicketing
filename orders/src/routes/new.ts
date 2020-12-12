import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { requireAuth, validateRequest } from '@dtgtickets/common'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      // Following line can be delete in Tickets Service no longer uses MongoDB
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({})
  }
)

export { router as createOrderRouter }
