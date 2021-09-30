import ApiError from './ApiError'

export default class BadRequest extends ApiError {
    code = 400
    message = 'Bad request.'

    constructor (message?: string) {
      super()
      if (message) { this.message = message }
    }
}
