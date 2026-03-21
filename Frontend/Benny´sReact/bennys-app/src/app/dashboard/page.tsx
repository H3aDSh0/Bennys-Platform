"use client"

import Authorization from "@/components/ui/auth";
import Auth from "@/components/ui/auth";
import { Dashboard } from "@/components/ui/dashboardexemplo";
import { DashboardPage } from "@/components/ui/dashboard";
import ProtectedLayout from "@/components/ui/protectedLayout";





const dashboard = () => {



    return (



        <Authorization /*requiredRoles={['ROLE_Fabricante']}*/>
            <DashboardPage></DashboardPage>
        </Authorization>








    )
}
export default dashboard;