import React from 'react';
import Button from './Button';
import { Compass } from 'lucide-react';

interface RealityIntroStepProps {
  onStart: () => void;
}

const RealityIntroStep: React.FC<RealityIntroStepProps> = ({ onStart }) => {
  return (
    <div className="animate-slide-up px-2">
      <div className="flex justify-center mb-6 text-secondary">
          <Compass size={64} className="animate-pop" />
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-[2.5em] font-bold font-display mb-2 text-white leading-tight break-word">
        實境探險
      </h1>
      <h2 className="text-xl md:text-2xl mt-2 mb-8 text-gray-300">探索圖書館新風貌</h2>
      
      <div className="bg-slate-600/50 p-6 rounded-2xl mb-10 border border-slate-500">
        <p className="text-[1.15em] leading-[1.8] text-justify text-gray-100">
          歡迎來到嶄新的圖書館！想知道我們增加了哪些便利的設備與服務嗎？<br/>
          跟著謎題走遍館內各個角落，重新認識這塊智慧寶庫吧！
        </p>
      </div>

      <div className="mt-8">
        <Button onClick={onStart} fullWidth className="md:w-auto">立即啟程</Button>
      </div>
    </div>
  );
};

export default RealityIntroStep;