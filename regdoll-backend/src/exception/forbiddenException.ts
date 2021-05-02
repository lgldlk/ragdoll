import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(str: String) {
    if (str == undefined) {
      super('无权限', HttpStatus.FORBIDDEN);
    } else {
      super(str, HttpStatus.FORBIDDEN);
    }
  }
}
