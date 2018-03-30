import { Expose } from 'class-transformer'
import { Allow } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { RefResource } from 'resources/resource.ref';

export abstract class BaseResource extends RefResource {

    abstract id: number

    abstract getResourceName(): string

    @ApiModelProperty()
    @Expose()
    get ref() : string {
        return `${this.prefix}/${this.id}`
    }
    set ref(a: string) {} // ignore any setters for ref. idk why it breaks if this is not there

    abstract get prefix(): string
}