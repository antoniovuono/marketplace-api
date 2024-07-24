type TResourceAlreadyExists = 'Email' | 'Phone'

export class ResourceAlreadyExists extends Error {
  constructor(resource: TResourceAlreadyExists) {
    super(`${resource} already registered`)
  }
}
