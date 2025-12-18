import React, { useState } from 'react';
import Button from './Button';
import { Path, UserInfo } from '../types';
import { Award, Copy, ExternalLink, CheckCircle, ArrowRight, LogOut } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CompletionStepProps {
  userInfo: UserInfo;
  path: Path;
  onStartStage2: () => void;
  onLeave: () => void;
}

// --- 設定區 (第一階段：實境探險) ---
// 1. 第一階段表單連結
const REALITY_FORM_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSfuHZcXg1n2PXRnBSspo6o1Wf1frwlDDxDv9DZ1ehY5D9N-Ew/viewform';

// 2. 第一階段表單 Entry IDs (請使用 "取得預填連結" 功能獲取這些 ID)
// (A) 抽獎憑證欄位 ID
const REALITY_FORM_ENTRY_ID = '443765246'; 
// (B) 姓名欄位 ID (★請填入)
const REALITY_FORM_NAME_ENTRY_ID = '1466661442'; 
// (C) 電話欄位 ID (★請填入)
const REALITY_FORM_PHONE_ENTRY_ID = '1642127749';
// ---------------------------------

const CompletionStep: React.FC<CompletionStepProps> = ({ userInfo, path, onStartStage2, onLeave }) => {
  const [copied, setCopied] = useState(false);
  const [prizeFlowStarted, setPrizeFlowStarted] = useState(false);
  
  // This component is now exclusively for Stage 1 (Reality)
  const isDarkMode = true; 

  // Trigger celebration on mount
  React.useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
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
    
    // 恢復：包含 userInfo.id (輸入的任意文字) 與時間戳記
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
    const baseUrl = REALITY_FORM_LINK.split('?')[0];
    
    // 建立參數陣列，方便管理多個欄位
    const params = new URLSearchParams();
    params.append('usp', 'pp_url'); // Google Form 預填參數

    // 1. 填入抽獎憑證
    if (REALITY_FORM_ENTRY_ID) {
        params.append(`entry.${REALITY_FORM_ENTRY_ID}`, code);
    }

    // 2. 填入姓名 (如果已設定 ID)
    if (REALITY_FORM_NAME_ENTRY_ID && userInfo.name) {
        params.append(`entry.${REALITY_FORM_NAME_ENTRY_ID}`, userInfo.name);
    }
    
    // 3. 填入電話 (如果已設定 ID)
    if (REALITY_FORM_PHONE_ENTRY_ID && userInfo.phone) {
        params.append(`entry.${REALITY_FORM_PHONE_ENTRY_ID}`, userInfo.phone);
    }

    const formUrl = `${baseUrl}?${params.toString()}`;
    window.open(formUrl, '_blank');
  };

  return (
    <div className="animate-slide-up">
      <div className="flex justify-center mb-4 text-secondary">
         <Award size={80} className="animate-pop" />
      </div>
      {/* 修改：加入 text-3xl md:text-[2.5em] */}
      <h1 className="text-3xl md:text-[2.5em] font-bold font-display mb-2 text-white leading-tight">第一階段挑戰成功！</h1>
      <h2 className="text-xl md:text-[1.8em] mt-2 mb-6 text-gray-200">實境探險任務完成</h2>
      
      <p className="text-[1.1em] leading-[1.8] text-justify mb-8 text-gray-300">
        恭喜你成功解開所有實境謎題！請先領取您的「第一階段抽獎憑證」，接著您可以選擇進入更具挑戰性的「資料庫挑戰」。
      </p>

      {userInfo.completedDate && (
        <p className="font-sans mb-8 text-gray-400">
            完成時間：<span className="font-bold">{userInfo.completedDate}</span>
        </p>
      )}

      <div className="flex flex-col gap-4 items-center">
        {/* Step 1: Copy Code */}
        <Button 
            onClick={handleCopy} 
            className="!bg-[#3498db] hover:!bg-[#2980b9] !shadow-[0_4px_0px_#2980b9] active:!shadow-[0_2px_0px_#2980b9] flex items-center gap-2"
        >
          {copied ? <CheckCircle size={20}/> : <Copy size={20}/>}
          {copied ? '已成功複製！' : '1. 取得第一階段抽獎憑證'}
        </Button>
        
        {prizeFlowStarted && (
           <div className="text-success font-bold mt-[-10px] animate-bounce-in">
               憑證已複製到剪貼簿！
           </div>
        )}

        {/* Step 2: Fill Form */}
        {prizeFlowStarted && (
            <div className="w-full mt-4 animate-slide-up text-gray-200">
                <Button 
                    onClick={handleFormOpen}
                    className="!bg-[#27ae60] hover:!bg-[#219150] !shadow-[0_4px_0px_#1e8449] active:!shadow-[0_2px_0px_#1e8449] flex items-center gap-2 mx-auto"
                >
                    <ExternalLink size={20}/>
                    2. 填寫第一階段抽獎表單
                </Button>
            </div>
        )}

        {/* Step 3: Decision */}
        {prizeFlowStarted && (
            <div className="w-full mt-8 pt-8 border-t border-slate-600 animate-fade-in">
                <h3 className="text-xl font-bold text-white mb-4">是否進入第二階段：資料庫挑戰？</h3>
                <p className="text-gray-300 mb-6 text-sm">
                    第二階段將考驗您的醫學文獻檢索能力，完成後可參加額外的抽獎活動！
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                     <Button
                        onClick={onLeave}
                        className="!bg-slate-600 hover:!bg-slate-500 !shadow-none flex items-center justify-center gap-2"
                    >
                        <LogOut size={20}/>
                        不參加，直接離開
                    </Button>
                    <Button
                        onClick={onStartStage2}
                        className="!bg-secondary hover:!bg-secondaryDark !shadow-[0_4px_0px_#7f8c8d] active:!shadow-[0_2px_0px_#7f8c8d] flex items-center justify-center gap-2"
                    >
                        進入第二階段
                        <ArrowRight size={20}/>
                    </Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CompletionStep;