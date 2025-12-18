import React, { useState } from 'react';
import { PartyPopper, Copy, CheckCircle, ExternalLink, LogOut } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserInfo } from '../types';
import Button from './Button';

interface AllCompletedStepProps {
  userInfo: UserInfo;
  onLeave: () => void;
}

// --- 設定區 (第二階段：資料庫挑戰) ---
// 1. 第二階段表單連結
const DATABASE_FORM_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSfypsblR_Wy_6-W5lK-SH8FWkuKw29qxuX-z1srrijOQgq-ug/viewform';

// 2. 第二階段表單 Entry IDs (請使用 "取得預填連結" 功能獲取這些 ID)
// (A) 抽獎憑證欄位 ID
const DATABASE_FORM_ENTRY_ID = '1488005670';
// (B) 姓名欄位 ID (★請填入)
const DATABASE_FORM_NAME_ENTRY_ID = '629662652'; 
// (C) 電話欄位 ID (★請填入)
const DATABASE_FORM_PHONE_ENTRY_ID = '2085173804';
// -----------------------------------

const AllCompletedStep: React.FC<AllCompletedStepProps> = ({ userInfo, onLeave }) => {
  const [copied, setCopied] = useState(false);
  const [prizeFlowStarted, setPrizeFlowStarted] = useState(false);

  // Trigger celebration on mount
  React.useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    }

    const interval = window.setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const generateCode = () => {
    const now = new Date();
    const yearStr = now.getFullYear().toString().slice(-2);
    const monthStr = (now.getMonth() + 1).toString().padStart(2, '0');
    const dateStr = now.getDate().toString().padStart(2, '0');
    const hoursStr = now.getHours().toString().padStart(2, '0');
    const minutesStr = now.getMinutes().toString().padStart(2, '0');
    const secondsStr = now.getSeconds().toString().padStart(2, '0');
    
    return `${yearStr}${monthStr}${dateStr}${hoursStr}${minutesStr}${secondsStr}${userInfo.id}`;
  };

  const copyToClipboard = async (text: string) => {
    // 嘗試使用現代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.warn('Clipboard API failed, trying fallback...', err);
        }
    }

    // Fallback: 使用传统的 textarea + execCommand
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // 確保 textarea 不會影響版面但可被選取
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        console.error('Fallback copy failed', err);
        return false;
    }
  };

  const handleCopy = async () => {
    const code = generateCode();
    const success = await copyToClipboard(code);
    
    if (success) {
      setCopied(true);
      setPrizeFlowStarted(true);
      setTimeout(() => setCopied(false), 3000);
    } else {
       // 複製失敗時使用 prompt 讓使用者可以手動複製，並視為流程已啟動
       window.prompt("自動複製失敗，請手動複製以下代碼：", code);
       setPrizeFlowStarted(true);
    }
  };

  const handleFormOpen = () => {
    const code = generateCode();
    const baseUrl = DATABASE_FORM_LINK.split('?')[0];

    // 建立參數陣列
    const params = new URLSearchParams();
    params.append('usp', 'pp_url');

    // 1. 填入抽獎憑證
    if (DATABASE_FORM_ENTRY_ID) {
        params.append(`entry.${DATABASE_FORM_ENTRY_ID}`, code);
    }
    
    // 2. 填入姓名
    if (DATABASE_FORM_NAME_ENTRY_ID && userInfo.name) {
        params.append(`entry.${DATABASE_FORM_NAME_ENTRY_ID}`, userInfo.name);
    }
    
    // 3. 填入電話
    if (DATABASE_FORM_PHONE_ENTRY_ID && userInfo.phone) {
        params.append(`entry.${DATABASE_FORM_PHONE_ENTRY_ID}`, userInfo.phone);
    }

    const formUrl = `${baseUrl}?${params.toString()}`;
    window.open(formUrl, '_blank');
  };

  return (
    <div className="animate-slide-up">
      <div className="flex justify-center mb-4 text-yellow-500">
         <PartyPopper size={80} className="animate-pop" />
      </div>
      {/* 修改：加入 text-3xl md:text-[2.5em] */}
      <h1 className="text-primary text-3xl md:text-[2.5em] font-bold font-display mb-2 leading-tight">全數通關！</h1>
      <h2 className="text-xl md:text-[1.8em] text-primary mt-2 mb-6">您已完成資料庫挑戰</h2>
      <p className="text-[1.1em] leading-[1.8] text-justify mb-8 text-gray-600">
        偵探 <span className="font-bold text-primary">{userInfo.name || userInfo.id}</span>，您真是太棒了！您已經通過了所有考驗，請領取第二階段的抽獎憑證。
      </p>

      <div className="flex flex-col gap-4 items-center">
        {/* Step 1: Copy Code */}
        <Button 
            onClick={handleCopy} 
            className="!bg-[#3498db] hover:!bg-[#2980b9] !shadow-[0_4px_0px_#2980b9] active:!shadow-[0_2px_0px_#2980b9] flex items-center gap-2"
        >
          {copied ? <CheckCircle size={20}/> : <Copy size={20}/>}
          {copied ? '1. 取得第二階段抽獎憑證' : '1. 取得第二階段抽獎憑證'}
        </Button>
        
        {prizeFlowStarted && (
           <div className="text-success font-bold mt-[-10px] animate-bounce-in">
               憑證已複製到剪貼簿！
           </div>
        )}

        {/* Step 2: Fill Form */}
        {prizeFlowStarted && (
            <div className="w-full mt-4 animate-slide-up">
                <Button 
                    onClick={handleFormOpen}
                    className="!bg-[#27ae60] hover:!bg-[#219150] !shadow-[0_4px_0px_#1e8449] active:!shadow-[0_2px_0px_#1e8449] flex items-center gap-2 mx-auto"
                >
                    <ExternalLink size={20}/>
                    2. 填寫第二階段抽獎表單
                </Button>
            </div>
        )}
        
         {/* Step 3: Leave Button */}
         {prizeFlowStarted && (
            <div className="w-full mt-8 pt-8 border-t border-gray-300 animate-fade-in">
                 <Button
                    onClick={onLeave}
                    className="!bg-gray-500 hover:!bg-gray-600 !shadow-none flex items-center justify-center gap-2 mx-auto"
                >
                    <LogOut size={20}/>
                    離開遊戲 (回到首頁)
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};

export default AllCompletedStep;