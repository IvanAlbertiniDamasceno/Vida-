import React, { useState } from 'react';
import { User } from '../types';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { UserPlus } from 'lucide-react';

interface RegisterScreenProps {
  onRegister: (user: User) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && email) {
      onRegister({ firstName, lastName, email });
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-white">
      {/* Character Image Placeholder similar to the reference */}
      <div className="mb-8 relative">
        <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
           {/* Using a friendly generic 3D-style avatar */}
           <img 
             src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=200" 
             alt="Mascote Vida+" 
             className="w-full h-full object-cover opacity-90"
           />
        </div>
        <div className="absolute -bottom-2 w-full text-center">
             <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-full font-bold">VIDA +</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-8 self-start w-full">Cadastro</h1>

      <form onSubmit={handleSubmit} className="w-full space-y-2">
        <div className="flex gap-2">
          <Input 
            label="Nome" 
            placeholder="Primeiro Nome" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input 
            label=" " 
            placeholder="Sobrenome" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <Input 
          label="E-mail" 
          type="email" 
          placeholder="seu@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="pt-8 flex gap-3">
          <Button type="button" variant="outline" onClick={() => alert("Salvo (Simulação)")}>
            Salvar
          </Button>
          <Button type="submit">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
};
