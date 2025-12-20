import { Reflector } from '@nestjs/core';

export const isPublic = Reflector.createDecorator<boolean>();
export const Public = () => isPublic(true);
