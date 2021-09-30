import ApiError from './ApiError'

export default class NotFoundError extends ApiError {
    code = 404
    message = 'Not Found.'

    constructor (message?: string) {
      super()
      if (message) this.message = message
    }
}
