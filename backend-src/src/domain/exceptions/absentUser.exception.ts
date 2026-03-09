import { DomainException } from "./domain.exception";

export class AbsentUserException extends DomainException {
  constructor() {
    super('User not present in the room');
  }
}