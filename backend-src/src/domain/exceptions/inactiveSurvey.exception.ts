import { DomainException } from "./domain.exception";

export class InactiveSurveyException extends DomainException {
  constructor() {
    super('This survey is not active');
  }
}