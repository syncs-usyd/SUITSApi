import { Interceptor, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import { classToPlain, plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { serialize } from './serialize';
import { BaseResource } from "resources/resource.base";

export function Serializer<T extends BaseResource>(type: ClassType<T>) {

    @Interceptor()
    class SerializeInterceptor implements NestInterceptor {
        intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<T>): Observable<T> | Promise<Observable<T>> {
            return stream$.map(this.serialize);
        }

        serialize(data: T) {
            return serialize(type, data)
        }
    }

    return SerializeInterceptor;
}