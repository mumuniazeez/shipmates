import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Prisma, User } from 'generated/prisma';

export const GetUser = createParamDecorator<Prisma.UserScalarFieldEnum>(
  (data: Prisma.UserScalarFieldEnum | undefined, context: ExecutionContext) => {
    const request: Request & { user: User } = context
      .switchToHttp()
      .getRequest();
    if (data) return request.user[data];
    return request.user;
  },
);
