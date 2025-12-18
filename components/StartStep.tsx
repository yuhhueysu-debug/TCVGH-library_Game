import React from 'react';
import Button from './Button';
import { Map } from 'lucide-react';

interface StartStepProps {
  onStart: () => void;
}

const StartStep: React.FC<StartStepProps> = ({ onStart }) => {
  return (
    <div className="animate-slide-up px-2">
      <div className="flex justify-center mb-6 text-secondary">
          <Map size={64} className="animate-pop" />
      </div>
      <h1 className="text-secondary text-3xl md:text-4xl lg:text-[2.5em] font-bold font-display mb-4 drop-shadow-[2px_2px_0px_#f0f0f0] leading-tight break-word">
        圖書館大冒險
      </h1>

      <div className="text-[1.05em] leading-[1.7] text-justify mb-8 text-gray-700">
        <p className="font-bold mb-3 text-primary text-lg border-b-2 border-secondary inline-block">遊戲指南：</p>
        <ul className="list-decimal pl-5 space-y-2 mt-2">
          <li>本遊戲分成兩階段，完成第一階段即可參加抽獎！</li>
          <li>完成第一階段可以選擇是否進入第二階段，有另外的抽獎項目等著您。</li>
          <li>闖關時，只要輸入正確答案，就能進入下一關。</li>
          <li>一人僅限參加一次，完成闖關後請務必完成抽獎表單填寫。</li>
        </ul>
      </div>

      <h3 className="text-lg md:text-xl lg:text-2xl text-primary font-bold mb-8 leading-normal">
        準備好來場刺激的尋寶之旅了嗎？
      </h3>

      <div className="mt-8">
        <Button onClick={onStart} fullWidth className="md:w-auto">Let's go!</Button>
      </div>
    </div>
  );
};

export default StartStep;