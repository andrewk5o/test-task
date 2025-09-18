import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.usersService.findAll();
        return users.map((u) => ({
            id: u.id,
            email: u.email,
            name: u.name,
            roleIds: (u.roles || []).map((r) => r.id),
        }));
    }

    @Patch(':id/roles')
    updateRoles(@Param('id') id: string, @Body() body: UpdateUserRolesDto) {
        return this.usersService.updateUserRoles(id, body.roleIds);
    }
}

