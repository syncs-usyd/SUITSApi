import { ApiModelProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export abstract class BaseResource {
    @ApiModelProperty()
    public abstract id: number;

    public abstract getResourceName(): string;

    abstract get prefix(): string;

    @ApiModelProperty()
    @Expose()
    get ref(): string {
        return `${this.prefix}/${this.id}`;
    }
    // tslint:disable-next-line: no-empty
    set ref(a: string) {} // ignore any setters for ref. idk why it breaks if this is not there
}
