import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@dtgtickets/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}
