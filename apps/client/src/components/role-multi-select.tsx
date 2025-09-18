import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Role } from '../types';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export function RoleMultiSelect({ value, onChange, options, disabled }: { value: string[]; onChange: (ids: string[]) => void; options: Role[]; disabled?: boolean }) {
    const [open, setOpen] = React.useState(false);
    const selected = options.filter((o) => value.includes(o.id));

    const toggle = (id: string) => {
        if (value.includes(id)) onChange(value.filter((v) => v !== id));
        else onChange([...value, id]);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    disabled={disabled}
                    className={cn(
                        'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-2 md:px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    title={selected.length ? selected.map((s) => s.name).join(', ') : 'Select roles'}
                >
                    <span className="truncate text-left flex-1 min-w-0">
                        {selected.length ? selected.map((s) => s.name).join(', ') : 'Select roles'}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                sideOffset={4}
                className="min-w-[8rem] overflow-hidden p-1"
                align="start"
            >
                <div className="max-h-64 overflow-auto">
                    {options.map((opt) => {
                        const active = value.includes(opt.id);
                        return (
                            <button
                                key={opt.id}
                                className={cn(
                                    'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                                )}
                                onClick={() => toggle(opt.id)}
                            >
                                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                    <Check className={cn('h-4 w-4', active ? 'opacity-100' : 'opacity-0')} />
                                </span>
                                <span className="ml-6">{opt.name}</span>
                            </button>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}

