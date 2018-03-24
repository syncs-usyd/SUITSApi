import { classToPlain, plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export function serialize<I, O>(type: ClassType<O>, data: I) : O {
    return plainToClass(type, data)
}
