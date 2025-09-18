import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column('varchar', { nullable: true })
    name!: string | null;

    @ManyToMany(() => Role, (role) => role.users, { cascade: ['insert', 'update'] })
    @JoinTable({ name: 'user_roles' })
    roles!: Role[];
}

