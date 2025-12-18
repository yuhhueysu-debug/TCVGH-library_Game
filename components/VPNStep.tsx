import React from 'react';
import Button from './Button';
import { ShieldCheck } from 'lucide-react';

interface VPNStepProps {
  onComplete: () => void;
}

const VPNStep: React.FC<VPNStepProps> = ({ onComplete }) => {
  return (
    <div className="animate-slide-up">
        <div className="flex justify-center mb-4 text-secondary">
            <ShieldCheck size={64} className="animate-pop" />
        </div>
      <h1 className="text-primary text-3xl md:text-4xl lg:text-[2.5em] font-bold font-display mb-2 leading-tight">醫學偵探大作戰</h1>
            
      <div className="text-left text-[1.1em] leading-[1.8] text-justify mb-8">
        <p className="mb-4">
          嘿！恭喜完成實境探險!
          接下來請接受更嚴格的挑戰!
          歡迎來到資料庫尋寶之旅！
          本遊戲部分關卡需連線至本院VPN方可進行，請於開始前完成以下步驟：
        </p>
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            請至Google Play 商店或 APPLE STORE 搜尋 <strong>「Ivanti Secure Access Client」</strong>並下載安裝。
          </li>
          <li>
            設定伺服器URL(s)請填入：<strong className="break-all">https://sslvpn.vghtc.gov.tw/e-learning</strong>
          </li>
          <li>
            VPN連線驗證帳密為「<strong>院內信箱帳號&信箱密碼</strong>」，只需輸入帳號即可，不需要後面的 domain。
          </li>
          <li>
            各職類實習學生帳密，請洽職類教師，或教學部(分機4354)。
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <Button onClick={onComplete}>我已完成設定！</Button>
      </div>
    </div>
  );
};

export default VPNStep;