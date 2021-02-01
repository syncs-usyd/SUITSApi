import { ApiProperty } from "@nestjs/swagger";

export class TokenResource {
    @ApiProperty()
    public token: string;
}
