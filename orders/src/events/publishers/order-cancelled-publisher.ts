import { Publisher, OrderCancelledEvent, Subjects } from '@dtgtickets/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
