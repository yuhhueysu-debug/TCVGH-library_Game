import React, { useState } from 'react';
import Button from './Button';
import { toHalfWidth } from '../utils';
import { User, Phone, IdCard } from 'lucide-react';

interface UserStepProps {
  onSubmit: (id: string, name: string, phone: string) => void;
  triggerShake: () => void;
  serverError?: string | null;
  onInputChange?: () => void;
}

const UserStep: React.FC<UserStepProps> = ({ onSubmit, triggerShake, serverError, onInputChange }) => {
  const [idValue, setIdValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [localError, setLocalError] = useState('');

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(toHalfWidth(e.target.value));
    setLocalError('');
    onInputChange?.();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(toHalfWidth(e.target.value));
    setLocalError('');
    onInputChange?.();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(toHalfWidth(e.target.value));
    setLocalError('');
    onInputChange?.();
  };

  const handleSubmit = () => {
    const cleanId = idValue.trim();
    const cleanName = nameValue.trim();
    const cleanPhone = phoneValue.trim();
    
    if (!cleanId || !cleanName || !cleanPhone) {
      setLocalError('請完整填寫資訊，以便後續抽獎聯繫。');
      triggerShake();
      return;
    }
    onSubmit(cleanId, cleanName, cleanPhone);
  };

  const displayError = serverError || localError;

  return (
    <div className="animate-slide-up px-2">
      <div className="flex justify-center mb-6 text-secondary">
          <User size={64} className="animate-pop" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">輸入玩家資訊</h2>
      <p className="text-[1.05em] leading-[1.7] text-gray-600 mb-8">
        請填寫基本資料作為抽獎憑證，資訊將自動帶入抽獎表單。
      </p>

      <div className="w-full flex flex-col gap-4">
        <div className="relative">
            <div className="absolute top-[18px] left-[15px] text-gray-400">
                <IdCard size={20} />
            </div>
            <input 
              type="text" 
              value={idValue}
              onChange={handleIdChange}
              placeholder="卡號 / 員工編號 / 身份證號"
              className="w-full pl-[45px] p-[15px] text-[1.1em] text-black border-2 border-[#bdc3c7] rounded-[15px] bg-[#f9f9f9] focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/20 transition-all"
            />
        </div>

        <div className="relative">
            <div className="absolute top-[18px] left-[15px] text-gray-400">
                <User size={20} />
            </div>
            <input 
              type="text" 
              value={nameValue}
              onChange={handleNameChange}
              placeholder="您的姓名"
              className="w-full pl-[45px] p-[15px] text-[1.1em] text-black border-2 border-[#bdc3c7] rounded-[15px] bg-[#f9f9f9] focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/20 transition-all"
            />
        </div>

        <div className="relative">
             <div className="absolute top-[18px] left-[15px] text-gray-400">
                <Phone size={20} />
            </div>
            <input 
              type="text" 
              value={phoneValue}
              onChange={handlePhoneChange}
              placeholder="聯絡電話"
              className="w-full pl-[45px] p-[15px] text-[1.1em] text-black border-2 border-[#bdc3c7] rounded-[15px] bg-[#f9f9f9] focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/20 transition-all"
            />
        </div>
      </div>

      {displayError && (
        <div className="mt-6 p-4 rounded-[12px] font-bold text-center bg-[#fcebeb] text-error animate-bounce-in">
          {displayError}
        </div>
      )}

      <div className="mt-10">
        <Button onClick={handleSubmit} fullWidth>開始遊戲</Button>
      </div>
    </div>
  );
};

export default UserStep;