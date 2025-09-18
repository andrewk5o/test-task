import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User, Role } from '../types';
import { toast } from 'sonner';

export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('/users');
            if (!res.ok) throw new Error(await res.text());
            return (await res.json()) as User[];
        },
    });
}

export function useRoles() {
    return useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const res = await fetch('/roles');
            if (!res.ok) throw new Error(await res.text());
            return (await res.json()) as Role[];
        },
    });
}

export function useUpdateUserRoles() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, roleIds }: { userId: string; roleIds: string[] }) => {
            const res = await fetch(`/users/${userId}/roles`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roleIds }),
            });
            if (!res.ok) throw new Error(await res.text());
        },
        onMutate: async ({ userId, roleIds }) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });
            const previous = queryClient.getQueryData<User[]>(['users']);
            queryClient.setQueryData<User[]>(['users'], (old) => (old || []).map((u) => (u.id === userId ? { ...u, roleIds } : u)));
            return { previous } as { previous?: User[] };
        },
        onError: (error, _vars, ctx) => {
            if (ctx?.previous) queryClient.setQueryData(['users'], ctx.previous);
            toast.error(`Failed to update roles: ${error.message}`);
        },
        onSuccess: () => {
            toast.success('Roles updated successfully');
        },
    });
}

