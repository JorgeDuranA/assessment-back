import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof HttpException) {
          // Si el error es una excepción HTTP, lo reenviamos sin modificar
          return throwError(() => err);
        }
        return throwError(
          () => new HttpException(err.message, err.statusCode || 417),
        );
      }),
    );
  }
}
