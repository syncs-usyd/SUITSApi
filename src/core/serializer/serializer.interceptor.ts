import { Interceptor, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { classToPlain, plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { BaseResource } from "resources/base.resource";
import { SerializerService } from "./serializer.service";
import { BaseEntity } from "entities/base.entity";
import { EntityResourceMapperService } from "./entity-resource-mapper.service";

@Interceptor()
export class SerializerInterceptor implements NestInterceptor {
    constructor(private readonly serializer: SerializerService) {}

    intercept(
        dataOrRequest: any,
        context: ExecutionContext,
        stream$: Observable<BaseEntity | BaseEntity[] | undefined>,
    ): Observable<Object> | Promise<Observable<Object>> {
        return stream$.pipe(map(x => this.serialize(x)));
    }

    serialize(data: BaseEntity | BaseEntity[] | undefined): Object {
        if (data == undefined) return {};

        let resource = this.serializer.getResource(data);
        return this.serializer.serialize(resource);
    }
}
