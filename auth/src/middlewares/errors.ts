import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import ApiValidationError from '../errors/ApiValidationError'

function errorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ApiValidationError) {
    return res.status(error.code).json({ errors: error.reasons })
  }

  if (error instanceof ApiError) {
    return res.status(error.code).json({ errors: [{ message: error.message }] })
  }

  next(error)
}

export default errorHandler
