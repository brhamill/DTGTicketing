import { Publisher, OrderCreatedEvent, Subjects } from '@dtgtickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}
