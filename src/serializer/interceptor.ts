import { Interceptor, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import { classToPlain, plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { BaseResource } from "resources/resource.base";
import { SerializerService } from "./service";
import { BaseEntity } from "entities/entity.base";

export function Serializer<E extends BaseEntity, R extends BaseResource>(type: ClassType<R>) {
    @Interceptor()
    class SerializeInterceptor implements NestInterceptor {

        constructor(private readonly serializer: SerializerService) {}

        intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<E>): Observable<Object> | Promise<Observable<Object>> {
            return stream$.map(x => this.serialize(x))
        }

        serialize(data: E) : Object {
            let resource = this.serializer.getResource(data, type)
            return this.serializer.serialize(resource)
        }
    }

    return SerializeInterceptor;
}