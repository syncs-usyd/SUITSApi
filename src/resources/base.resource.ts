import { Expose } from 'class-transformer'
import { Allow } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ClassType } from 'class-transformer/ClassTransformer';

export abstract class BaseResource {

    @ApiModelProperty()
    abstract id: number

    abstract getResourceName(): string

    abstract get prefix(): string

    abstract getType(): new (...args: any[]) => BaseResource

    @ApiModelProperty()
    @Expose()
    get ref() : string {
        return `${this.prefix}/${this.id}`
    }
    set ref(a: string) {} // ignore any setters for ref. idk why it breaks if this is not there


}