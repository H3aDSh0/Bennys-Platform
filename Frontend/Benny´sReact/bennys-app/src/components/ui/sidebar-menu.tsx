import React from 'react';
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

interface SidebarMenuProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        title: string
    }[]
    selectedOption: string; // Adicione a propriedade selectedOption
    onSelectOption: (title: string) => void;
}

export function SidebarMenu({ className, items, selectedOption, onSelectOption, ...props }: SidebarMenuProps) {
    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <button
                    key={item.title}
                    onClick={() => onSelectOption(item.title)}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "justify-start",
                        selectedOption === item.title 
                            ? "bg-muted hover:bg-muted" // Aplicar estilo se a opção estiver selecionada
                            : "hover:bg-transparent hover:underline", // Caso contrário, aplicar outro estilo
                    )}
                >
                    {item.title}
                </button>
            ))}
        </nav>
    )
}
