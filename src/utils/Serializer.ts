import { Interceptor, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import { classToPlain, plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export function Serializer(type: ClassType<any>) {

    @Interceptor()
    class SerializeInterceptor implements NestInterceptor {
        intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<any>): Observable<any> | Promise<Observable<any>> {
            return stream$.map(this.serialize);
        }

        async serialize(data: any) {
            await data.eventsAttended;
            console.log(data)
            return classToPlain(plainToClass(type, data))
        }
    }

    return SerializeInterceptor;
}