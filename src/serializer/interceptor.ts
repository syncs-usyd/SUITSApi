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

        constructor(private readonly serializer: SerializerService) {console.log(type)}

        intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<E | E[] | undefined>): Observable<Object> | Promise<Observable<Object>> {
            return stream$.map(x => this.serialize(x))
        }

        serialize(data: E | E[] | undefined) : Object {
            if (data == undefined)
                return {}

            let resource = this.serializer.getResource(data, type)
            return this.serializer.serialize(resource)
        }
    }

    return SerializeInterceptor;
}