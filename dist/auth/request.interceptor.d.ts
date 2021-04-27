import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class RequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}
