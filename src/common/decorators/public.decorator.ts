import { Reflector } from '@nestjs/core';

export const PUBLIC = Reflector.createDecorator<boolean>();

//wrapping the decorator to use the value as true everyTime
export const Public = () => PUBLIC(true);
