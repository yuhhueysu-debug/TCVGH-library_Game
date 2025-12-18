import React from 'react';
import { UserCompletionStatus, Path } from '../types';
import { CheckSquare } from 'lucide-react';

const DatabaseIllustration = () => (
    <div className="mb-4 transition-transform duration-300 group-hover:scale-110 mx-auto">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 15.5V18.5C18 19.6046 17.1046 20.5 16 20.5H8C6.89543 20.5 6 19.6046 6 18.5V15.5" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16.5V20.5" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 11.5V6.5C4 5.06406 5.06406 3.5 7 3.5H17C18.9359 3.5 20 5.06406 20 6.5V11.5C20 12.9359 18.9359 14.5 17 14.5H7C5.06406 14.5 4 12.9359 4 11.5Z" fill="#e0f2f1" stroke="#83c5be" strokeWidth="1.5"/>
        <path d="M9.5 8L8 9.5L9.5 11" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 8L16 9.5L14.5 11" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
);

const RealityIllustration = () => (
    <div className="mb-4 transition-transform duration-300 group-hover:scale-110 mx-auto">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18.5L4 20.5L9 15.5L15 20.5L20 18.5L15 13.5L9 18.5Z" fill="#e0f2f1" stroke="#83c5be" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 13.5L20 8.5L15 3.5L9 8.5L4 6.5L9 11.5" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="10" r="2" fill="#e74c3c" stroke="#fff" strokeWidth="1"/>
      </svg>
    </div>
);


interface PathSelectionStepProps {
  onSelect: (path: Path) => void;
  completionStatus: UserCompletionStatus;
  triggerShake: () => void;
}

const PathSelectionStep: React.FC<PathSelectionStepProps> = ({ onSelect, completionStatus, triggerShake }) => {

  const handleSelect = (path: Path) => {
    if ((path === 'database' && completionStatus.database) || (path === 'reality' && completionStatus.reality)) {
      triggerShake();
      return;
    }
    onSelect(path);
  }

  return (
    <div className="animate-slide-up">
      <h2 className="text-[1.8em] text-primary mt-2 mb-4">選擇你的挑戰路徑</h2>
      <p className="text-[1.1em] leading-[1.8] text-justify mb-8">
        請選擇一項挑戰開始你的冒險！完成後可再挑戰另一項。
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <button
          onClick={() => handleSelect('database')}
          disabled={completionStatus.database}
          className="group relative text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-secondary/50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md disabled:opacity-70"
          style={{ transform: 'rotate(-2deg)' }}
        >
          {completionStatus.database && (
             <div className="absolute inset-0 bg-success/80 rounded-2xl flex flex-col items-center justify-center text-white font-bold animate-fade-in">
                <CheckSquare size={48} />
                <span className="mt-2 text-xl">已完成</span>
            </div>
          )}
          <DatabaseIllustration />
          <h3 className="font-bold text-xl text-primary">資料庫挑戰</h3>
          <p className="text-sm mt-1 text-gray-500">考驗你的線上資料庫搜尋技巧。</p>
        </button>

        <button
          onClick={() => handleSelect('reality')}
          disabled={completionStatus.reality}
          className="group relative text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-secondary/50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md disabled:opacity-70"
          style={{ transform: 'rotate(2deg)' }}
        >
           {completionStatus.reality && (
             <div className="absolute inset-0 bg-success/80 rounded-2xl flex flex-col items-center justify-center text-white font-bold animate-fade-in">
                <CheckSquare size={48} />
                <span className="mt-2 text-xl">已完成</span>
            </div>
          )}
          <RealityIllustration />
          <h3 className="font-bold text-xl text-primary">實境探險</h3>
          <p className="text-sm mt-1 text-gray-500">親臨圖書館，發掘隱藏的秘密。</p>
        </button>
      </div>
    </div>
  );
};

export default PathSelectionStep;