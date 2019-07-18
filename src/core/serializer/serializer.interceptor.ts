import { ExecutionContext, Interceptor, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { BaseEntity } from "../../entities/base.entity";
import { SerializerService } from "./serializer.service";

@Interceptor()
export class SerializerInterceptor implements NestInterceptor {
    constructor(private readonly serializer: SerializerService) {}

    public intercept(
        dataOrRequest: any,
        context: ExecutionContext,
        stream$: Observable<BaseEntity | BaseEntity[] | undefined>,
    ): Observable<Object> | Promise<Observable<Object>> {
        return stream$.pipe(map(x => this.serialize(x)));
    }

    public serialize(data: BaseEntity | BaseEntity[] | undefined): Object {
        if (data == undefined) {
            return {};
        }

        const resource = this.serializer.getResource(data);
        return this.serializer.serialize(resource);
    }
}
