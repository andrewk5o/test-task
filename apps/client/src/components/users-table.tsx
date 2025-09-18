import { RoleMultiSelect } from './role-multi-select';
import { User, Role } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function UsersTable({ users, roles, onChangeRoles }: { users: User[]; roles: Role[]; onChangeRoles: (user: User, roleIds: string[]) => void }) {
    return (
        <div className="rounded-md border">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[120px]">Name</TableHead>
                            <TableHead className="min-w-[200px]">Email</TableHead>
                            <TableHead className="min-w-[250px]">Roles</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell className="font-medium">{u.name || '—'}</TableCell>
                                <TableCell className="text-sm text-muted-foreground break-all">{u.email}</TableCell>
                                <TableCell className="w-[300px]">
                                    <div className="w-full">
                                        <RoleMultiSelect value={u.roleIds} onChange={(ids) => onChangeRoles(u, ids)} options={roles} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

