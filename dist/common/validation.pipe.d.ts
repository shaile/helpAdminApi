import { PipeTransform } from '@nestjs/common';
export declare class ValidateUserPipe implements PipeTransform {
    transform(value: any): boolean;
}
