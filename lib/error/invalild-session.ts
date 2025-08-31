export class InvalidSessionError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid session')

    this.name = 'InvalidSessionError'
  }
}
