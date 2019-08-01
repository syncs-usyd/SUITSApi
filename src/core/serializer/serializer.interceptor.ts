import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseEntity } from "../../entities/base.entity";
import { SerializerService } from "./serializer.service";

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
    constructor(private readonly serializer: SerializerService) {}

    public intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Object> {
        return next.handle().pipe(map(x => this.serialize(x)));
    }

    public serialize(data: BaseEntity | BaseEntity[] | undefined): Object {
        if (data === undefined) {
            return {};
        }

        const resource = this.serializer.getResource(data);
        return this.serializer.serialize(resource);
    }
}
