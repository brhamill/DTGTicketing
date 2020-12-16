import { Publisher, PaymentCreatedEvent, Subjects } from '@dtgtickets/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
