import React, { useState } from 'react';
import Layout from './components/Layout';
import VPNStep from './components/VPNStep';
import StartStep from './components/StartStep';
import UserStep from './components/UserStep';
import GameStep from './components/GameStep';
import CompletionStep from './components/CompletionStep';
import AllCompletedStep from './components/AllCompletedStep';
import RealityIntroStep from './components/RealityIntroStep';
import { GameState, UserInfo, UserCompletionStatus, Path } from './types';
import { GAME_LEVELS, DATABASE_LEVEL_IDS, REALITY_LEVEL_IDS } from './data';

const LOCAL_STORAGE_KEY_COMPLETED_USERS = 'completedUsersDB';

const App: React.FC = () => {
  // 強制初始狀態為 START
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedPath, setSelectedPath] = useState<Path | null>(null);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [userExistsError, setUserExistsError] = useState<string | null>(null);
  const [userCompletionStatus, setUserCompletionStatus] = useState<UserCompletionStatus>({ database: false, reality: false });

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleStartGame = () => setGameState(GameState.USER_INFO);

  const handleRealityIntroComplete = () => {
      setSelectedPath('reality');
      setCompletedLevels([]);
      setGameState(GameState.PLAYING);
  };

  const handleDatabaseIntroComplete = () => {
      setSelectedPath('database');
      setCompletedLevels([]);
      setGameState(GameState.PLAYING);
  };

  const handleUserSubmit = (id: string, name: string, phone: string) => {
    setUserExistsError(null);
    const completedUsersRaw = localStorage.getItem(LOCAL_STORAGE_KEY_COMPLETED_USERS);
    const completedUsers = completedUsersRaw ? JSON.parse(completedUsersRaw) : {};
    
    const status: UserCompletionStatus = {
        database: !!(completedUsers[id] && completedUsers[id].database),
        reality: !!(completedUsers[id] && completedUsers[id].reality),
    };

    setUserInfo({ id, name, phone, completed: false });
    setUserCompletionStatus(status);

    if (status.database && status.reality) {
        setUserExistsError('您已完成所有階段挑戰，感謝您的參與！');
        triggerShake();
        setGameState(GameState.ALL_COMPLETED); 
        return;
    }

    if (status.reality && !status.database) {
        setSelectedPath('reality');
        setGameState(GameState.COMPLETED);
    } else {
        setSelectedPath('reality');
        setGameState(GameState.REALITY_INTRO);
    }
  };

  const handleStartStage2 = () => {
      setSelectedPath('database');
      setGameState(GameState.DATABASE_INTRO);
  };

  const handleLeaveGame = () => {
      setGameState(GameState.START);
      setUserInfo(null);
      setCompletedLevels([]);
      setSelectedPath(null);
      setIsShaking(false);
      setUserExistsError(null);
      setUserCompletionStatus({ database: false, reality: false });
  };

  const handleLevelComplete = (levelId: string) => {
    if (!selectedPath || !userInfo) return;
    const newCompleted = Array.from(new Set([...completedLevels, levelId]));
    setCompletedLevels(newCompleted);

    const pathLevels = selectedPath === 'database' ? DATABASE_LEVEL_IDS : REALITY_LEVEL_IDS;
    const isPathComplete = pathLevels.every(id => newCompleted.includes(id));
    
    if (isPathComplete) {
      const completionDate = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
      const completedUsersRaw = localStorage.getItem(LOCAL_STORAGE_KEY_COMPLETED_USERS);
      const completedUsers = completedUsersRaw ? JSON.parse(completedUsersRaw) : {};

      if (!completedUsers[userInfo.id]) {
        completedUsers[userInfo.id] = {};
      }
      completedUsers[userInfo.id][selectedPath] = completionDate;
      localStorage.setItem(LOCAL_STORAGE_KEY_COMPLETED_USERS, JSON.stringify(completedUsers));
      
      setUserInfo({ ...userInfo, completedDate: completionDate });
      
      const updatedStatus: UserCompletionStatus = {
        database: !!completedUsers[userInfo.id].database,
        reality: !!completedUsers[userInfo.id].reality,
      };
      setUserCompletionStatus(updatedStatus);

      if (selectedPath === 'reality') {
          setGameState(GameState.COMPLETED);
      } else {
          setGameState(GameState.ALL_COMPLETED);
      }
    }
  };

  const getNextLevel = () => {
    if (!selectedPath) return undefined;
    const pathLevels = selectedPath === 'database' ? DATABASE_LEVEL_IDS : REALITY_LEVEL_IDS;
    const nextLevelId = pathLevels.find(id => !completedLevels.includes(id));
    return GAME_LEVELS.find(level => level.id === nextLevelId);
  };

  const currentLevel = getNextLevel();
  
  let activePath: Path = 'database';
  if (gameState === GameState.REALITY_INTRO || (selectedPath === 'reality' && gameState !== GameState.DATABASE_INTRO && gameState !== GameState.ALL_COMPLETED)) {
      activePath = 'reality';
  }

  return (
    <Layout isShaking={isShaking} path={activePath}>
      {gameState === GameState.START && <StartStep onStart={handleStartGame} />}
      {gameState === GameState.USER_INFO && (
        <UserStep 
            onSubmit={handleUserSubmit} 
            triggerShake={triggerShake} 
            serverError={userExistsError}
            onInputChange={() => setUserExistsError(null)}
        />
      )}
      {gameState === GameState.REALITY_INTRO && <RealityIntroStep onStart={handleRealityIntroComplete} />}
      {gameState === GameState.DATABASE_INTRO && <VPNStep onComplete={handleDatabaseIntroComplete} />}
      {gameState === GameState.PLAYING && currentLevel && selectedPath && (
        <GameStep 
          key={currentLevel.id}
          level={currentLevel} 
          onSuccess={() => handleLevelComplete(currentLevel.id)} 
          triggerShake={triggerShake}
          path={selectedPath}
        />
      )}
      {gameState === GameState.COMPLETED && userInfo && (
        <CompletionStep 
            userInfo={userInfo}
            path="reality"
            onStartStage2={handleStartStage2}
            onLeave={handleLeaveGame}
        />
      )}
      {gameState === GameState.ALL_COMPLETED && userInfo && (
        <AllCompletedStep userInfo={userInfo} onLeave={handleLeaveGame} />
      )}
    </Layout>
  );
};

export default App;