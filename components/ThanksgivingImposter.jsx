import React, { useState, useCallback, useEffect } from 'react';
import questionSets from '../data/questionSets';

const Turkey = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <ellipse cx="100" cy="70" rx="70" ry="50" fill="#D2691E" />
    <ellipse cx="60" cy="60" rx="25" ry="40" fill="#8B0000" />
    <ellipse cx="100" cy="50" rx="25" ry="45" fill="#FF8C00" />
    <ellipse cx="140" cy="60" rx="25" ry="40" fill="#8B0000" />
    <ellipse cx="45" cy="75" rx="20" ry="35" fill="#CD853F" />
    <ellipse cx="155" cy="75" rx="20" ry="35" fill="#CD853F" />
    <ellipse cx="100" cy="130" rx="45" ry="40" fill="#8B4513" />
    <circle cx="100" cy="95" r="22" fill="#8B4513" />
    <circle cx="92" cy="90" r="6" fill="white" />
    <circle cx="108" cy="90" r="6" fill="white" />
    <circle cx="93" cy="91" r="3" fill="#1a1a1a" />
    <circle cx="109" cy="91" r="3" fill="#1a1a1a" />
    <polygon points="100,97 94,105 106,105" fill="#FFA500" />
    <ellipse cx="100" cy="112" rx="4" ry="8" fill="#DC143C" />
    <ellipse cx="100" cy="103" rx="6" ry="3" fill="#DC143C" />
    <rect x="85" y="165" width="6" height="20" fill="#FFA500" />
    <rect x="109" y="165" width="6" height="20" fill="#FFA500" />
    <polygon points="75,185 91,185 88,195 82,185 78,195" fill="#FFA500" />
    <polygon points="109,185 125,185 122,195 117,185 113,195" fill="#FFA500" />
    <rect x="80" y="68" width="40" height="8" fill="#1a1a1a" />
    <rect x="87" y="45" width="26" height="25" fill="#1a1a1a" />
    <rect x="95" y="55" width="10" height="12" fill="#FFA500" />
  </svg>
);

const FallingLeaf = ({ style, duration, delay, sway, rotation }) => (
  <div
    className="absolute text-2xl pointer-events-none"
    style={{
      ...style,
      top: 0,
      animation: `fall ${duration}s linear ${delay}s infinite`,
      '--sway': `${sway}px`,
      '--rotation': `${rotation}deg`,
    }}
  >
    🍂
  </div>
);

const ExitButton = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-4 right-4 w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center text-xl font-bold transition-all active:scale-95 shadow-md" aria-label="Exit game">✕</button>
);

const ConfirmDialog = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs text-center">
      <div className="text-4xl mb-3">🦃</div>
      <h3 className="text-lg font-bold text-amber-800 mb-2">Quit Game?</h3>
      <p className="text-amber-700 text-sm mb-4">Are you sure you want to quit and start over?</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all active:scale-95">Cancel</button>
        <button onClick={onConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all active:scale-95">Quit</button>
      </div>
    </div>
  </div>
);

export default function ThanksgivingImposter() {
  const [gameState, setGameState] = useState('splash');
  const [realQuestion, setRealQuestion] = useState('');
  const [imposterQuestion, setImposterQuestion] = useState('');
  const [playerCount, setPlayerCount] = useState(7);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [imposterPlayer, setImposterPlayer] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [recallPlayer, setRecallPlayer] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showImposterQuestion, setShowImposterQuestion] = useState(false);
  const [showImposterPlayer, setShowImposterPlayer] = useState(false);
  const [questionHistoryIndex, setQuestionHistoryIndex] = useState(-1);
  const [viewedQuestions, setViewedQuestions] = useState([]);

  // Load player count from sessionStorage on mount
  useEffect(() => {
    const savedPlayerCount = sessionStorage.getItem('imposterGamePlayerCount');
    if (savedPlayerCount) {
      const count = parseInt(savedPlayerCount, 10);
      if (count >= 3 && count <= 20) {
        setPlayerCount(count);
      }
    }
  }, []);

  // Save player count to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('imposterGamePlayerCount', playerCount.toString());
  }, [playerCount]);

  const startGame = useCallback(() => {
    if (!realQuestion.trim() || !imposterQuestion.trim()) return;
    const imposter = Math.floor(Math.random() * playerCount) + 1;
    setImposterPlayer(imposter);
    setCurrentPlayer(1);
    setQuestionHistory(prev => [...prev, {
      realQuestion: realQuestion.trim(),
      imposterQuestion: imposterQuestion.trim(),
      imposterPlayer: imposter,
      playerCount,
      timestamp: new Date().toLocaleTimeString()
    }]);
    setGameState('ready');
  }, [realQuestion, imposterQuestion, playerCount]);

  const showQuestion = () => setGameState('viewing');

  const nextPlayer = () => {
    if (currentPlayer >= playerCount) {
      setGameState('waiting');
    } else {
      setCurrentPlayer(prev => prev + 1);
      setGameState('ready');
    }
  };

  const handleRecall = (player) => {
    setRecallPlayer(player);
    setGameState('recall');
  };

  const returnFromRecall = () => {
    setRecallPlayer(null);
    setGameState('waiting');
  };

  const goToReveal = () => {
    setShowImposterQuestion(false);
    setShowImposterPlayer(false);
    setGameState('reveal');
  };

  const copyHistory = async () => {
    const historyText = questionHistory.map((game, i) =>
      `Game ${i + 1} (${game.timestamp}):\n  Real: "${game.realQuestion}"\n  Imposter: "${game.imposterQuestion}"\n  Imposter was: Player ${game.imposterPlayer} of ${game.playerCount}`
    ).join('\n\n');
    try {
      await navigator.clipboard.writeText(historyText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = historyText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const newGame = () => {
    setGameState('splash');
    setRealQuestion('');
    setImposterQuestion('');
    // playerCount is preserved via sessionStorage
    setCurrentPlayer(1);
    setImposterPlayer(null);
    setRecallPlayer(null);
    setShowExitConfirm(false);
    setShowImposterQuestion(false);
    setShowImposterPlayer(false);
    setQuestionHistoryIndex(-1);
    setViewedQuestions([]);
  };

  const handleExitClick = () => setShowExitConfirm(true);
  const handleExitConfirm = () => newGame();
  const handleExitCancel = () => setShowExitConfirm(false);

  const generateRandomQuestion = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * questionSets.length);
    const questionSet = questionSets[randomIndex];

    setRealQuestion(questionSet.realQuestion);
    setImposterQuestion(questionSet.imposterQuestion);

    // Add to viewed history (truncate forward history if we're not at the end)
    const newHistory = [...viewedQuestions.slice(0, questionHistoryIndex + 1), questionSet];
    setViewedQuestions(newHistory);
    setQuestionHistoryIndex(newHistory.length - 1);
  }, [viewedQuestions, questionHistoryIndex]);

  const goToPreviousQuestion = useCallback(() => {
    if (questionHistoryIndex > 0) {
      const prevIndex = questionHistoryIndex - 1;
      const questionSet = viewedQuestions[prevIndex];
      setRealQuestion(questionSet.realQuestion);
      setImposterQuestion(questionSet.imposterQuestion);
      setQuestionHistoryIndex(prevIndex);
    }
  }, [questionHistoryIndex, viewedQuestions]);

  const goToNextQuestion = useCallback(() => {
    if (questionHistoryIndex < viewedQuestions.length - 1) {
      const nextIndex = questionHistoryIndex + 1;
      const questionSet = viewedQuestions[nextIndex];
      setRealQuestion(questionSet.realQuestion);
      setImposterQuestion(questionSet.imposterQuestion);
      setQuestionHistoryIndex(nextIndex);
    }
  }, [questionHistoryIndex, viewedQuestions]);

  const getPassButtonText = () => {
    if (currentPlayer >= playerCount) {
      return "DONE - Pass to Interviewer";
    }
    return `DONE - Pass to Player ${currentPlayer + 1}`;
  };

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const count = Math.floor(Math.random() * 16) + 15; // 15-30 leaves
    setLeaves(Array.from({ length: count }, (_, i) => {
      const duration = 8 + Math.random() * 8; // 8-16 seconds
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        duration,
        delay: -Math.random() * duration, // Negative delay starts animation mid-cycle
        sway: (Math.random() - 0.5) * 100, // -50px to +50px
        rotation: Math.random() * 720 - 360, // -360 to +360 degrees
      };
    }));
  }, []);

  const containerStyle = "min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 flex flex-col items-center justify-center p-4 relative overflow-hidden";
  const cardStyle = "bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 w-full max-w-sm relative";
  const buttonPrimary = "w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg transition-all active:scale-95";
  const buttonSecondary = "w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95";
  const inputStyle = "w-full p-3 border-2 border-amber-200 rounded-xl focus:border-orange-400 focus:outline-none bg-white text-gray-800";

  return (
    <div className={containerStyle}>
      {leaves.map((leaf) => (
        <FallingLeaf
          key={leaf.id}
          style={{ left: leaf.left }}
          duration={leaf.duration}
          delay={leaf.delay}
          sway={leaf.sway}
          rotation={leaf.rotation}
        />
      ))}

      {showExitConfirm && <ConfirmDialog onConfirm={handleExitConfirm} onCancel={handleExitCancel} />}

      {gameState === 'splash' && (
        <div className={cardStyle + " text-center"}>
          <Turkey className="w-32 h-32 mx-auto mb-4 dancing-turkey" />
          <h1 className="text-2xl font-bold text-amber-800 mb-1">Peyton's Thanksgiving</h1>
          <h2 className="text-3xl font-extrabold text-orange-600 mb-2">Family Imposter</h2>
          <p className="text-amber-700 italic mb-6 text-sm">"One of us isn't answering the same question..."</p>
          <button onClick={() => setGameState('setup')} className={buttonPrimary}>🦃 Start Game</button>
          {questionHistory.length > 0 && (
            <button onClick={() => setShowHistory(true)} className="mt-4 text-amber-700 underline text-sm">
              View Question History ({questionHistory.length})
            </button>
          )}
        </div>
      )}

      {gameState === 'setup' && (
        <div className={cardStyle}>
          <ExitButton onClick={handleExitClick} />
          <h2 className="text-xl font-bold text-amber-800 mb-4 text-center">🦃 Game Setup</h2>
          <p className="text-amber-700 text-sm mb-4 text-center">Interviewer: Enter two similar questions!</p>
          <div className="space-y-4">
            {/* Random Question Generator */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={goToPreviousQuestion}
                  disabled={questionHistoryIndex <= 0}
                  className="w-10 h-10 bg-amber-200 hover:bg-amber-300 disabled:bg-amber-100 disabled:text-amber-400 text-amber-800 font-bold rounded-full transition-all active:scale-95 flex items-center justify-center"
                  aria-label="Previous question"
                >
                  ←
                </button>
                <button
                  onClick={generateRandomQuestion}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all active:scale-95"
                >
                  🎲 Random Questions
                </button>
                <button
                  onClick={goToNextQuestion}
                  disabled={questionHistoryIndex >= viewedQuestions.length - 1}
                  className="w-10 h-10 bg-amber-200 hover:bg-amber-300 disabled:bg-amber-100 disabled:text-amber-400 text-amber-800 font-bold rounded-full transition-all active:scale-95 flex items-center justify-center"
                  aria-label="Next question"
                >
                  →
                </button>
              </div>
              {viewedQuestions.length > 0 && (
                <p className="text-xs text-amber-600 text-center mt-2">
                  {questionHistoryIndex + 1} of {viewedQuestions.length} viewed
                </p>
              )}
            </div>

            <div>
              <label className="block text-amber-800 font-semibold mb-1 text-sm">The Real Question:</label>
              <textarea value={realQuestion} onChange={(e) => setRealQuestion(e.target.value)} className={inputStyle + " h-20 resize-none"} placeholder="What's your favorite holiday dish?" />
            </div>
            <div>
              <label className="block text-amber-800 font-semibold mb-1 text-sm">The Imposter Question:</label>
              <textarea value={imposterQuestion} onChange={(e) => setImposterQuestion(e.target.value)} className={inputStyle + " h-20 resize-none"} placeholder="What's your favorite holiday movie?" />
            </div>
            <div>
              <label className="block text-amber-800 font-semibold mb-1 text-sm">Number of Players:</label>
              <div className="flex items-center gap-4 justify-center">
                <button onClick={() => setPlayerCount(Math.max(3, playerCount - 1))} className="w-12 h-12 bg-amber-200 hover:bg-amber-300 rounded-full text-2xl font-bold text-amber-800 transition-all">-</button>
                <span className="text-3xl font-bold text-amber-800 w-12 text-center">{playerCount}</span>
                <button onClick={() => setPlayerCount(Math.min(20, playerCount + 1))} className="w-12 h-12 bg-amber-200 hover:bg-amber-300 rounded-full text-2xl font-bold text-amber-800 transition-all">+</button>
              </div>
            </div>
            <button onClick={startGame} disabled={!realQuestion.trim() || !imposterQuestion.trim()} className={buttonPrimary + " disabled:opacity-50 disabled:cursor-not-allowed mt-4"}>Begin! 🍂</button>
          </div>
        </div>
      )}

      {gameState === 'ready' && (
        <div className={cardStyle + " text-center"}>
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Player {currentPlayer}</h2>
          <p className="text-amber-700 mb-6">Take the phone privately, then tap below to see your question.</p>
          <button onClick={showQuestion} className={buttonPrimary}>👀 Show My Question</button>
        </div>
      )}

      {gameState === 'viewing' && (
        <div className={cardStyle + " text-center"}>
          <h3 className="text-amber-600 font-bold mb-4 text-sm uppercase tracking-wide">PLAYER {currentPlayer} QUESTION</h3>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-xl text-amber-900 font-medium">{currentPlayer === imposterPlayer ? imposterQuestion : realQuestion}</p>
          </div>
          <button onClick={nextPlayer} className={buttonPrimary}>{getPassButtonText()}</button>
        </div>
      )}

      {gameState === 'waiting' && (
        <div className={cardStyle + " text-center"}>
          <ExitButton onClick={handleExitClick} />
          <div className="text-4xl mb-3">🤔</div>
          <h2 className="text-xl font-bold text-amber-800 mb-2">Who Forgot Their Question?</h2>
          <p className="text-amber-700 text-sm mb-4">Tap your player number to see your question again:</p>
          <div className="mb-6">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: playerCount }, (_, i) => (
                <button key={i + 1} onClick={() => handleRecall(i + 1)} className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold py-3 px-3 rounded-lg transition-all text-base active:scale-95">{i + 1}</button>
              ))}
            </div>
          </div>
          <button onClick={goToReveal} className={buttonPrimary}>📣 Announce the Question</button>
        </div>
      )}

      {gameState === 'recall' && (
        <div className={cardStyle + " text-center"}>
          <ExitButton onClick={handleExitClick} />
          <h3 className="text-amber-600 font-semibold mb-1 text-sm">Player {recallPlayer}'s Question:</h3>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-xl text-amber-900 font-medium">{recallPlayer === imposterPlayer ? imposterQuestion : realQuestion}</p>
          </div>
          <button onClick={returnFromRecall} className={buttonSecondary}>← Return to Game</button>
        </div>
      )}

      {gameState === 'reveal' && (
        <div className={cardStyle + " text-center"}>
          <ExitButton onClick={handleExitClick} />
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-lg font-bold text-amber-800 mb-3">The Real Question Was:</h2>
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 mb-4">
            <p className="text-xl text-green-800 font-semibold">"{realQuestion}"</p>
          </div>

          <div className="space-y-3 mb-4">
            {!showImposterQuestion ? (
              <button
                onClick={() => setShowImposterQuestion(true)}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 px-6 rounded-xl transition-all active:scale-95 border-2 border-red-200"
              >
                🔍 Reveal Imposter Question
              </button>
            ) : (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                <p className="text-red-700 text-sm mb-1">The Imposter Question:</p>
                <p className="text-red-800 font-medium">"{imposterQuestion}"</p>
              </div>
            )}

            {!showImposterPlayer ? (
              <button
                onClick={() => setShowImposterPlayer(true)}
                className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-3 px-6 rounded-xl transition-all active:scale-95 border-2 border-purple-200"
              >
                🕵️ Reveal Imposter
              </button>
            ) : (
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3">
                <p className="text-purple-800 font-bold text-lg">🕵️ Player {imposterPlayer} was the Imposter!</p>
              </div>
            )}
          </div>

          <button onClick={newGame} className={buttonPrimary}>🦃 New Game</button>
          <button onClick={() => setGameState('waiting')} className="w-full text-amber-700 py-2 mt-2 text-sm">← Back to Player Questions</button>
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowHistory(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-amber-800 text-center mb-3">📜 Question History</h2>
            <textarea
              readOnly
              className="w-full h-48 p-3 bg-amber-50 border-2 border-amber-200 rounded-xl text-sm text-amber-900 resize-none focus:outline-none"
              value={questionHistory.length === 0
                ? "No games played yet this session!"
                : questionHistory.map((game, i) =>
                  `Game ${i + 1} (${game.timestamp}):\nReal: ${game.realQuestion}\nImposter: ${game.imposterQuestion}\nPlayer ${game.imposterPlayer} was the imposter`
                ).join('\n\n─────────────────\n\n')
              }
            />
            <div className="mt-3 space-y-2">
              {questionHistory.length > 0 && (
                <button onClick={copyHistory} className={buttonSecondary}>{copySuccess ? '✓ Copied!' : '📋 Copy History to Clipboard'}</button>
              )}
              <button onClick={() => setShowHistory(false)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all active:scale-95">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}