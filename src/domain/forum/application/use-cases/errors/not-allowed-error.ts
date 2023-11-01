import { UseCaseError } from "@/core/errors/use-case-error";

export class NotAllowerdError extends Error implements UseCaseError {
  constructor() {
    super('Not allowed');
  }
}
