import ApiError from './ApiError'

export default class UniqueKeyError extends ApiError {
    code = 400
}
