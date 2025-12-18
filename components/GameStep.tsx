import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Level, Path } from '../types';
import { normalizeString } from '../utils';
import confetti from 'canvas-confetti';

interface GameStepProps {
  level: Level;
  onSuccess: () => void;
  triggerShake: () => void;
  path: Path;
}

const GameStep: React.FC<GameStepProps> = ({ level, onSuccess, triggerShake, path }) => {
  const [inputVal, setInputVal] = useState('');
  const [multiInput1, setMultiInput1] = useState('');
  const [multiInput2, setMultiInput2] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const isDarkMode = path === 'reality';

  useEffect(() => {
    setInputVal('');
    setMultiInput1('');
    setMultiInput2('');
    setSelectedOption(null);
    setMessage(null);
  }, [level.id]);

  const handleSubmit = () => {
    let isCorrect = false;
    
    // 正式環境請將 isTestMode 設為 false
    const isTestMode = true;

    if (isTestMode) {
        isCorrect = true;
    } else {
        if (level.type === 'input') {
          const userAns = normalizeString(inputVal);
          const acceptable = Array.isArray(level.answer) ? level.answer : [String(level.answer)];
          isCorrect = acceptable.some(ans => normalizeString(String(ans)) === userAns);
        } else if (level.type === 'choice') {
          isCorrect = selectedOption === level.answer;
        } else if (level.type === 'multiple_input' && level.answers) {
          const ans1 = normalizeString(multiInput1);
          const ans2 = normalizeString(multiInput2).replace('q', '');
          const target1 = normalizeString(level.answers[0]);
          const target2 = normalizeString(level.answers[1]).replace('q', '');
          isCorrect = (ans1 === target1) && (ans2 === target2);
        }
    }

    if (isCorrect) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setMessage({ text: '恭喜你！答案正確！', type: 'success' });
      setTimeout(onSuccess, 1500); 
    } else {
      setMessage({ text: '答案似乎不太對，請再試一次。', type: 'error' });
      triggerShake();
    }
  };

  return (
    <div className="animate-slide-up px-1">
      <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-primary'}`}>
        {level.title}
      </h1>
      
      <div className={`text-[1.1em] border-l-4 border-secondary pl-4 my-8 text-left ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        <p className="font-bold mb-1">任務描述：</p>
        <p className="leading-relaxed opacity-90">{level.description}</p>
      </div>

      {level.imageUrl && (
        <div className="my-8">
          <img src={level.imageUrl} alt={level.title} className="w-full rounded-2xl shadow-xl animate-fade-in" />
        </div>
      )}

      {message && (
        <div className={`p-4 rounded-xl mb-6 font-bold text-center animate-bounce-in ${
          message.type === 'success' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
        }`}>
          {message.text}
        </div>
      )}

      <div className="w-full flex flex-col items-center">
        {level.type === 'input' && (
          <input 
            type="text"
            value={inputVal}
            onChange={(e) => { setInputVal(e.target.value); setMessage(null); }}
            placeholder="請輸入答案..."
            className={`w-full p-4 text-lg border-2 rounded-xl focus:outline-none transition-all ${
              isDarkMode ? 'bg-slate-600 text-white border-slate-500' : 'bg-gray-50 border-gray-300'
            }`}
          />
        )}

        {level.type === 'choice' && level.options && (
          <div className="w-full space-y-3">
            {level.options.map((option, idx) => (
              <Button
                key={idx}
                variant="choice"
                path={path}
                selected={selectedOption === idx}
                onClick={() => { setSelectedOption(idx); setMessage(null); }}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {level.type === 'multiple_input' && level.answer_placeholder && (
          <div className="w-full space-y-4">
            <input 
              type="text"
              value={multiInput1}
              onChange={(e) => { setMultiInput1(e.target.value); setMessage(null); }}
              placeholder={level.answer_placeholder[0]}
              className={`w-full p-4 text-lg border-2 rounded-xl focus:outline-none transition-all ${
                isDarkMode ? 'bg-slate-600 text-white border-slate-500' : 'bg-gray-50 border-gray-300'
              }`}
            />
            <input 
              type="text"
              value={multiInput2}
              onChange={(e) => { setMultiInput2(e.target.value); setMessage(null); }}
              placeholder={level.answer_placeholder[1]}
              className={`w-full p-4 text-lg border-2 rounded-xl focus:outline-none transition-all ${
                isDarkMode ? 'bg-slate-600 text-white border-slate-500' : 'bg-gray-50 border-gray-300'
              }`}
            />
          </div>
        )}
      </div>

      <div className="mt-10">
        <Button onClick={handleSubmit} fullWidth>提交答案</Button>
      </div>
    </div>
  );
};

export default GameStep;