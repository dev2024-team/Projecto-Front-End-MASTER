import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Esta e uma pagina de login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
