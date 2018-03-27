import { Module, Global } from "@nestjs/common";
import { SerializerService } from "./service";

@Global()
@Module({
    components: [SerializerService],
    exports: [SerializerService]
})
export class SerializerModule {}