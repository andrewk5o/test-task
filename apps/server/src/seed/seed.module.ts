import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/role.entity';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Role, User])],
})
export class SeedModule implements OnModuleInit {
    constructor(
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) { }

    async onModuleInit() {
        const roleNames = ['admin', 'user', 'moderator', 'viewer'];
        const existing = await this.roleRepo.find();
        if (existing.length === 0) {
            const roles = await this.roleRepo.save(roleNames.map((name) => ({ name })));
            await this.userRepo.save([
                { email: 'admin@example.com', name: 'Admin', roles: [roles[0]] },
                { email: 'user@example.com', name: 'User', roles: [roles[1]] },
                { email: 'user2@example.com', name: 'User2', roles: [roles[1]] },
                { email: 'moderator@example.com', name: 'Moderator', roles: [roles[2]] },
                { email: 'viewer@example.com', name: 'Viewer', roles: [roles[3]] },
            ]);
        }
    }
}

