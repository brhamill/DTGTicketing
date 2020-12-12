import { Publisher, Subjects, TicketCreatedEvent } from '@dtgtickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
