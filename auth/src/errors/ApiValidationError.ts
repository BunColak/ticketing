import { ValidationError } from 'express-validator'
import ApiError from './ApiError'

export default class ApiValidationError extends ApiError {
    code = 400
    reasons: {message: string, field: string}[] = []

    constructor (reasons: ValidationError[]) {
      super()
      this.reasons = reasons.map(e => ({ message: e.msg, field: e.param }))
    }
}
