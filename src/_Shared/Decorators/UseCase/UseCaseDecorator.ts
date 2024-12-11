import { applyDecorators, Injectable } from '@nestjs/common';

export const UseCase: ClassDecorator = applyDecorators(Injectable);
