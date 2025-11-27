import React, { useState, useEffect } from 'react';

export default function ThanksgivingImposter() {
  const [screen, setScreen] = useState('splash');
  const [realQuestion, setRealQuestion] = useState('');
  const [imposterQuestion, setImposterQuestion] = useState('');
  const [playerCount, setPlayerCount] = useState(4);
  const [imposterPlayer, setImposterPlayer] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [revealedImposterQ, setRevealedImposterQ] = useState(false);
  const [revealedImposter, setRevealedImposter] = useState(false);

  const startGame = () => {
    if (realQuestion.trim() && imposterQuestion.trim()) {
      const imposter = Math.floor(Math.random() * playerCount) + 1;
      setImposterPlayer(imposter);
      setCurrentPlayer(1);
      setShowQuestion(false);
      setRevealedImposterQ(false);
      setRevealedImposter(false);
      setScreen('handoff');
    }
  };

  const revealQuestion = () => setShowQuestion(true);
  
  const nextPlayer = () => {
    setShowQuestion(false);
    if (currentPlayer < playerCount) {
      setCurrentPlayer(currentPlayer + 1);
      setScreen('handoff');
    } else {
      setQuestionHistory([...questionHistory, {
        realQuestion,
        imposterQuestion,
        imposterPlayer,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setScreen('reveal');
    }
  };

  const resetGame = () => {
    setScreen('setup');
    setRealQuestion('');
    setImposterQuestion('');
    setCurrentPlayer(1);
    setShowQuestion(false);
    setRevealedImposterQ(false);
    setRevealedImposter(false);
  };

  const copyHistory = () => {
    const text = questionHistory.map((game, i) => 
      `Game ${i + 1} (${game.timestamp}):\nReal: ${game.realQuestion}\nImposter: ${game.imposterQuestion}\nPlayer ${game.imposterPlayer} was the imposter`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const buttonPrimary = "w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95 text-lg";
  const buttonSecondary = "w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold py-3 px-6 rounded-xl transition-all active:scale-95";

  // Splash Screen
  if (screen === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-amber-50 to-orange-100 flex flex-col items-center justify-center p-6">
        <div className="text-8xl mb-4 animate-bounce">🦃</div>
        <h1 className="text-4xl font-bold text-amber-800 text-center mb-2">
          Peyton's Thanksgiving
        </h1>
        <h2 className="text-2xl font-semibold text-orange-600 text-center mb-4">
          Family Imposter
        </h2>
        <p className="text-amber-700 text-center mb-8 italic text-lg">
          "One of us isn't answering the same question..."
        </p>
        <div className="w-full max-w-xs space-y-3">
          <button onClick={() => setScreen('setup')} className={buttonPrimary}>
            🎮 Start Game
          </button>
          {questionHistory.length > 0 && (
            <button onClick={() => setShowHistory(true)} className={buttonSecondary}>
              📜 View History ({questionHistory.length} games)
            </button>
          )}
        </div>
      </div>
    );
  }

  // Setup Screen
  if (screen === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-amber-50 to-orange-100 p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <span className="text-5xl">🦃</span>
            <h2 className="text-2xl font-bold text-amber-800 mt-2">Game Setup</h2>
            <p className="text-amber-600 text-sm">Interviewer's eyes only!</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
            <div>
              <label className="block text-amber-800 font-semibold mb-2">
                Real Question (for most players)
              </label>
              <textarea
                value={realQuestion}
                onChange={(e) => setRealQuestion(e.target.value)}
                className="w-full p-3 border-2 border-amber-200 rounded-xl focus:border-orange-400 focus:outline-none text-gray-700"
                rows="2"
                placeholder="What's your favorite Thanksgiving dish?"
              />
            </div>
            
            <div>
              <label className="block text-amber-800 font-semibold mb-2">
                Imposter Question (for one player)
              </label>
              <textarea
                value={imposterQuestion}
                onChange={(e) => setImposterQuestion(e.target.value)}
                className="w-full p-3 border-2 border-amber-200 rounded-xl focus:border-orange-400 focus:outline-none text-gray-700"
                rows="2"
                placeholder="What's your favorite Halloween candy?"
              />
            </div>
            
            <div>
              <label className="block text-amber-800 font-semibold mb-2">
                Number of Players: {playerCount}
              </label>
              <input
                type="range"
                min="3"
                max="20"
                value={playerCount}
                onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-sm text-amber-600">
                <span>3</span>
                <span>20</span>
              </div>
            </div>
            
            <button 
              onClick={startGame}
              disabled={!realQuestion.trim() || !imposterQuestion.trim()}
              className={`${buttonPrimary} ${(!realQuestion.trim() || !imposterQuestion.trim()) ? 'opacity-50' : ''}`}
            >
              🚀 Begin Round
            </button>
            
            <button 
              onClick={() => setScreen('splash')}
              className="w-full text-amber-600 py-2"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handoff Screen
  if (screen === 'handoff') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-800 via-amber-700 to-orange-800 flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-6">🤫</div>
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Pass to Player {currentPlayer}
        </h2>
        <p className="text-amber-200 text-center mb-8 text-lg">
          No peeking! Hand the device over.
        </p>
        <button 
          onClick={() => setScreen('question')}
          className="bg-white text-amber-800 font-bold py-4 px-10 rounded-2xl shadow-lg text-xl active:scale-95 transition-all"
        >
          I'm Player {currentPlayer} 👋
        </button>
      </div>
    );
  }

  // Question Screen
  if (screen === 'question') {
    const isImposter = currentPlayer === imposterPlayer;
    const question = isImposter ? imposterQuestion : realQuestion;
    
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${
        isImposter 
          ? 'bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900'
          : 'bg-gradient-to-b from-orange-100 via-amber-50 to-orange-100'
      }`}>
        <div className="text-center mb-6">
          <span className="text-5xl">{isImposter ? '🕵️' : '🦃'}</span>
          <h2 className={`text-xl font-semibold mt-2 ${isImposter ? 'text-purple-200' : 'text-amber-700'}`}>
            Player {currentPlayer}
          </h2>
        </div>
        
        {!showQuestion ? (
          <button 
            onClick={revealQuestion}
            className={`${isImposter 
              ? 'bg-purple-500 hover:bg-purple-600' 
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
            } text-white font-bold py-5 px-10 rounded-2xl shadow-lg text-xl active:scale-95 transition-all`}
          >
            👁️ Reveal My Question
          </button>
        ) : (
          <div className="w-full max-w-sm">
            <div className={`rounded-2xl shadow-lg p-6 mb-6 ${
              isImposter ? 'bg-purple-700/50' : 'bg-white'
            }`}>
              <p className={`text-sm font-semibold mb-2 ${isImposter ? 'text-purple-300' : 'text-amber-600'}`}>
                YOUR QUESTION:
              </p>
              <p className={`text-2xl font-bold ${isImposter ? 'text-white' : 'text-amber-800'}`}>
                {question}
              </p>
            </div>
            
            <p className={`text-center mb-4 text-sm ${isImposter ? 'text-purple-300' : 'text-amber-600'}`}>
              Memorize this, then pass the device!
            </p>
            
            <button 
              onClick={nextPlayer}
              className={`w-full ${isImposter 
                ? 'bg-purple-500 hover:bg-purple-600' 
                : 'bg-gradient-to-r from-orange-500 to-red-500'
              } text-white font-bold py-4 px-6 rounded-2xl shadow-lg active:scale-95 transition-all`}
            >
              {currentPlayer < playerCount ? '➡️ Next Player' : '🎭 Everyone Ready!'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Waiting/Recall Screen
  if (screen === 'waiting') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-amber-50 to-orange-100 p-6">
        <div className="max-w-md mx-auto text-center">
          <span className="text-5xl">🤔</span>
          <h2 className="text-2xl font-bold text-amber-800 mt-4 mb-2">
            Forgot Your Question?
          </h2>
          <p className="text-amber-600 mb-6">Tap your number to see it again:</p>
          
          <div className="grid grid-cols-4 gap-3 mb-6">
            {Array.from({ length: playerCount }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => {
                  setCurrentPlayer(num);
                  setShowQuestion(false);
                  setScreen('question');
                }}
                className="bg-white hover:bg-amber-100 text-amber-800 font-bold py-4 rounded-xl shadow-md active:scale-95 transition-all"
              >
                {num}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setScreen('reveal')}
            className={buttonPrimary}
          >
            🎭 Time to Vote!
          </button>
        </div>
      </div>
    );
  }

  // Reveal Screen
  if (screen === 'reveal') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-800 via-orange-700 to-red-800 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-6">
          <span className="text-6xl">🎭</span>
          <h2 className="text-3xl font-bold text-white mt-4">Round Complete!</h2>
        </div>
        
        <div className="w-full max-w-sm space-y-4">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-5">
            <p className="text-amber-200 text-sm font-semibold mb-1">THE REAL QUESTION:</p>
            <p className="text-white text-xl font-bold">{realQuestion}</p>
          </div>
          
          {/* Reveal Imposter Question Button */}
          {!revealedImposterQ ? (
            <button 
              onClick={() => setRevealedImposterQ(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              🔍 Reveal Imposter Question
            </button>
          ) : (
            <div className="bg-purple-600/80 backdrop-blur rounded-2xl p-5">
              <p className="text-purple-200 text-sm font-semibold mb-1">IMPOSTER QUESTION:</p>
              <p className="text-white text-xl font-bold">{imposterQuestion}</p>
            </div>
          )}
          
          {/* Reveal Imposter Button */}
          {!revealedImposter ? (
            <button 
              onClick={() => setRevealedImposter(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              🕵️ Reveal Imposter
            </button>
          ) : (
            <div className="bg-red-600/80 backdrop-blur rounded-2xl p-5 text-center">
              <p className="text-red-200 text-sm font-semibold mb-1">THE IMPOSTER WAS:</p>
              <p className="text-white text-3xl font-bold">Player {imposterPlayer}!</p>
            </div>
          )}
          
          <div className="pt-4 space-y-3">
            <button onClick={resetGame} className="w-full bg-white text-amber-800 font-bold py-4 px-6 rounded-2xl shadow-lg active:scale-95 transition-all">
              🔄 New Round
            </button>
            <button 
              onClick={() => {
                setScreen('splash');
                setRealQuestion('');
                setImposterQuestion('');
              }} 
              className="w-full text-white/80 py-2"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // History Modal
  if (showHistory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-amber-50 to-orange-100 p-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-5">
          <h2 className="text-2xl font-bold text-amber-800 text-center mb-4">
            📜 Game History
          </h2>
          
          {questionHistory.length === 0 ? (
            <p className="text-amber-700 text-center text-sm">
              No games played yet this session!
            </p>
          ) : (
            <div className="space-y-3 mb-4">
              {questionHistory.map((game, i) => (
                <div key={i} className="bg-amber-50 rounded-lg p-3 text-left">
                  <p className="text-xs text-amber-500 mb-1">
                    Game {i + 1} • {game.timestamp}
                  </p>
                  <p className="text-amber-800 text-sm">
                    <span className="font-semibold">Real:</span> {game.realQuestion}
                  </p>
                  <p className="text-amber-700 text-sm">
                    <span className="font-semibold">Imposter:</span> {game.imposterQuestion}
                  </p>
                  <p className="text-orange-600 text-sm font-medium">
                    Player {game.imposterPlayer} was the imposter
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {questionHistory.length > 0 && (
            <button 
              onClick={copyHistory} 
              className={buttonSecondary + " mb-3"}
            >
              {copySuccess ? '✓ Copied!' : '📋 Copy History to Clipboard'}
            </button>
          )}
          
          <button 
            onClick={() => setShowHistory(false)} 
            className="w-full text-amber-700 py-2 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return null;
}
