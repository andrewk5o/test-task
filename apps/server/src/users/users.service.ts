import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({ relations: { roles: true }, order: { email: 'ASC' } });
    }

    async updateUserRoles(userId: string, roleIds: string[]): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: { roles: true } });
        if (!user) throw new NotFoundException('User not found');

        if (!roleIds || roleIds.length === 0) {
            user.roles = [];
        } else {
            const roles = await this.roleRepository.find({ where: { id: In(roleIds) } });
            user.roles = roles;
        }
        return this.userRepository.save(user);
    }
}

