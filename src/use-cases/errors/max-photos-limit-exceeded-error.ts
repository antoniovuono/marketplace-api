export class MaxPhotosLimitExceededError extends Error {
  constructor() {
    super('You can only add 4 photos per sale')
  }
}
