import { useMemo, useState } from 'react';
import { useRoles, useUpdateUserRoles, useUsers } from '../queries/users';
import { UsersTable } from '../components/users-table';
import { RoleFilter } from '../components/role-filter';
import { LoadingIndicator } from '../components/loading-indicator';
import { User, Role } from '../types';
import { toast } from 'sonner';

export function App() {
    const { data: users = [], isLoading: usersLoading, error: usersError } = useUsers();
    const { data: roles = [], isLoading: rolesLoading, error: rolesError } = useRoles();
    const [filterRoleId, setFilterRoleId] = useState<string>('');
    // no per-user loading indicator; keep UI responsive
    const mutation = useUpdateUserRoles();

    const filteredUsers = useMemo(() => {
        if (!filterRoleId) return users;
        return users.filter((u) => u.roleIds.includes(filterRoleId));
    }, [users, filterRoleId]);

    const onChangeRoles = (user: User, newRoleIds: string[]) => {
        mutation.mutate({ userId: user.id, roleIds: newRoleIds });
    };

    const loading = usersLoading || rolesLoading;
    if (loading) {
        return <LoadingIndicator />;
    }

    // Handle errors with toasts instead of blocking UI
    if (usersError) {
        toast.error(`Failed to load users: ${(usersError as Error).message}`);
    }
    if (rolesError) {
        toast.error(`Failed to load roles: ${(rolesError as Error).message}`);
    }

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <h1 className="text-xl md:text-2xl font-semibold mb-4">Users</h1>
            <RoleFilter value={filterRoleId} onChange={setFilterRoleId} roles={roles} />
            <UsersTable users={filteredUsers} roles={roles} onChangeRoles={onChangeRoles} />
        </div>
    );
}

