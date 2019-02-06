import { ClassType } from "class-transformer-validator";

export abstract class BaseEntity {
    abstract id: number;

    abstract getType(): new (...args: any[]) => BaseEntity;
}
