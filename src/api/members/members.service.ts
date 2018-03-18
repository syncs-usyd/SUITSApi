import { Component } from '@nestjs/common';

@Component()
export class MembersService {
    
    getAll(): any[] {
        return [
            {
                name: "Kosta",
                id: 1
            }
        ]
    }
}