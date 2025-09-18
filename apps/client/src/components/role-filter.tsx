import { Role } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function RoleFilter({ value, onChange, roles }: { value: string; onChange: (id: string) => void; roles: Role[] }) {
    const selectValue = value === '' ? '__all__' : value;

    return (
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium">Filter by role:</label>
            <div className="w-full sm:min-w-[220px] sm:w-auto">
                <Select value={selectValue} onValueChange={(v) => onChange(v === '__all__' ? '' : v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__all__">All roles</SelectItem>
                        {roles.map((r) => (
                            <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

