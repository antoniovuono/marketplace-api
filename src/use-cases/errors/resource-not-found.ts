type TResourceNotFound = 'User' | 'Sale'

export class ResourceNotFound extends Error {
  constructor(resource: TResourceNotFound) {
    super(`${resource} not found`)
  }
}
