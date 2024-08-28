import Link from "next/link";
import React from 'react';
import UserTable from "@/components/UserTable";

const HomePage = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center my-8">Lista de Usuários</h1>
            <div className="w-20 h-10 m-7 bg-sky-600">
                <Link href="/dashboard/page" className="flex justify-center items-center">
                    Voltar
                </Link>
            </div>
            <UserTable />
        </div>
    );
};

export default HomePage;
