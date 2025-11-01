import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError) //to identify which type of errors this filter should handle
export class PrismaExceptionFilter implements ExceptionFilter {
  //the error instance throws
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); //switching the context to Http
    const response = ctx.getResponse<Response>(); //extract the context's response to handle it manually

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    switch (exception.code) {
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Record Not Found';
        break;
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'Duplicate Record Found';
        break;
    }
    //sending the response
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
