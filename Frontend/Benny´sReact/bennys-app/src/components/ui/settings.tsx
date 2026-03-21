import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateProfile, UserProfile, UserProfileUpdate } from '../apiRequests';
import { Button } from './button';
import { Label } from './label';
import { Input } from './input';
import { Textarea } from './textarea';
import { z, ZodError } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import ProfileSettings from './profile';
import { SidebarMenu } from './sidebar-menu';




const SettingsPage = () => {
    const [selectedOption, setSelectedOption] = useState('Perfil');

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const sidebarItems = [
        { title: 'Perfil' },
        { title: 'Email Preferences' },
        { title: 'Account Settings' }
    ];

    //console.log("opcao agora" + selectedOption);
    let content;
    if (selectedOption === 'Perfil') {
        console.log("mudei para Profile");
        content = <ProfileSettings />;
    } else if (selectedOption === 'Email Preferences') {
        console.log("mudei para Preferences");

        content = <div>Email Preferences</div>;
    } else if (selectedOption === 'Account Settings') {
        console.log("mudei para Preferences");
        content = <div>Account Settings</div>;;
    }


    return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Definições</h2>
                <p className="text-muted-foreground">
                    Gerir as configurações da sua conta.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarMenu items={sidebarItems} selectedOption={selectedOption} onSelectOption={handleOptionChange} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    {content}
                </div>
            </div>
        </>
    );
};

export default SettingsPage;
