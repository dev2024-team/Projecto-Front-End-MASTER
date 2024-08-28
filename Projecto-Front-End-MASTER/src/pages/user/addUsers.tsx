import Link from "next/link";
import React from 'react';
import AddUserForm from "@/components/addUserForm"; // Certifique-se que o caminho está correto

const AddEstudante = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center my-8">Adicionar Usuário</h1>
            <div className="w-20 h-10 m-7 bg-sky-600 text-white flex justify-center items-center">
                <Link href="/dashboard/page">
                    Voltar
                </Link>
            </div>
            <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
                {/* Renderiza o formulário de adição de usuário */}
                <AddUserForm />
            </div>
        </div>
    );
};

export default AddEstudante;
