import { Expose, Exclude } from 'class-transformer'
import { URL } from 'url';

export abstract class BaseResource {

    protected readonly abstract prefix: string

    abstract id: number

    getRef() : string {
        return `${this.prefix}/id`
    }
}