import { HttpException, HttpStatus } from '@nestjs/common';

export const customError = (msg: string) =>
  new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: msg,
    },
    HttpStatus.BAD_REQUEST,
  );

export const customOk = (msg: string) => ({
  status: HttpStatus.OK,
  message: msg,
});
