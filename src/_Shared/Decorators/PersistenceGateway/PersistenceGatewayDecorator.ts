import { applyDecorators, Injectable } from '@nestjs/common';

export const PersistenceGateway: ClassDecorator = applyDecorators(Injectable);
