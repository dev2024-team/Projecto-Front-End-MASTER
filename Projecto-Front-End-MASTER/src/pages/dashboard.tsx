import Link from 'next/link';
import CustomBox from '@/components/CustomBox';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';


const Dashboard = () => {
    const router = useRouter();




    const handleLogout = () => {
        // Remove o token do localStorage
        localStorage.removeItem('token');

        // Redireciona o usuário para a página de login
        router.push('/login');
    }


  // Verifica se o token existe e se está expirado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decodifica o token para acessar o campo exp
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);  // Tempo atual em segundos

        if (decodedToken.exp < currentTime) {
          // Token expirado, redirecionar para login
          router.push('/login');
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        router.push('/login');
      }
    } else {
      // Não há token, redirecionar para login
      router.push('/login');
    }
  }, [router]);



    return (
        <div>
            {/* Cabeçalho da dashboard */}
            <header className="flex justify-between items-center mb-8 bg-slate-800">
                <h1 className="text-2xl font-bold ml-10">Menu dos estudantes</h1>
                {/* Link de logout */}
                <button onClick={handleLogout} className="flex items-center justify-center text-white-500 hover:underline mr-36 mt-12 bg-sky-600 w-24 h-10 mb-10 ">
                    Logout
                </button>
            </header>

            {/* Conteúdo principal */}
            <p className="ml-16">Bem-vindo à sua dashboard!</p>

            {/* Grid layout para os CustomBox components */}
            <div className="grid grid-cols-2 gap-10">
                <CustomBox text='Retorno de Usuario' url='/estudante' />
                <CustomBox text='Cadastro' url='/addUsers' />
                <CustomBox text='Adicionar Roles' url='/estudante' />
                <CustomBox text='Diverso' url='/estudante' />
            </div>
        </div>
    );
};

export default Dashboard;
