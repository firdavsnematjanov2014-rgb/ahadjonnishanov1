import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Trophy,
  Zap,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  Binary,
  Cpu,
  Bug,
  MoveDown,
  Layers
} from 'lucide-react';
import { UserProfile } from '../types';

interface InteractiveGamesProps {
  currentUser: UserProfile;
  onAddXp: (amount: number, reason: string) => void;
}

// Audio beeps using Web Audio API
const playSound = (type: 'correct' | 'wrong' | 'win' | 'click') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'win') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      osc.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.3); // C6
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch {
    // AudioContext ignored in unsupported environments
  }
};

type GameType = 'typing' | 'circuit' | 'algorithm' | 'bughunter' | 'binary' | 'hardware';

export const InteractiveGames: React.FC<InteractiveGamesProps> = ({
  currentUser,
  onAddXp,
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('typing');

  // ==========================================
  // GAME 1: KLAVIATURA POYGASi (Typing Sprint)
  // ==========================================
  const TYPING_PHRASES = [
    'print("Salom, Axadboy Nishanov")',
    'for son in range(1, 10): print(son)',
    'if yosh >= 18: print("Xush kelibsiz")',
    'def hisobla(a, b): return a + b',
    'royxat = ["Python", "HTML", "CSS", "SQL"]',
    'algoritm = "aniq ketma-ketlikdagi buyruqlar"',
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [typingFinished, setTypingFinished] = useState(false);

  const targetPhrase = TYPING_PHRASES[phraseIndex];

  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!typingStartTime) setTypingStartTime(Date.now());
    setTypedText(val);

    let mistakes = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== targetPhrase[i]) mistakes++;
    }
    const acc = val.length > 0 ? Math.max(0, Math.round(((val.length - mistakes) / val.length) * 100)) : 100;
    setAccuracy(acc);

    if (val === targetPhrase) {
      const timeTakenSec = (Date.now() - (typingStartTime || Date.now())) / 1000;
      const words = targetPhrase.split(' ').length;
      const calculatedWpm = Math.round((words / Math.max(timeTakenSec, 1)) * 60);
      setWpm(calculatedWpm);
      setTypingFinished(true);
      playSound('win');
      onAddXp(60, "Klaviatura poygasi g'olibi");
    }
  };

  const handleNextTypingPhrase = () => {
    setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
    setTypedText('');
    setTypingStartTime(null);
    setTypingFinished(false);
  };

  // ==========================================
  // GAME 2: MANTIQIY DARVOZALAR (Logic Gates)
  // ==========================================
  const [inputA, setInputA] = useState<0 | 1>(1);
  const [inputB, setInputB] = useState<0 | 1>(0);
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND'>('AND');
  const [gateTargetOutput, setGateTargetOutput] = useState<0 | 1>(1);
  const [circuitScore, setCircuitScore] = useState(0);
  const [circuitMessage, setCircuitMessage] = useState<string>('');

  const calculateGateOutput = (a: 0 | 1, b: 0 | 1, gate: string): 0 | 1 => {
    switch (gate) {
      case 'AND': return (a && b) ? 1 : 0;
      case 'OR': return (a || b) ? 1 : 0;
      case 'NOT': return a === 0 ? 1 : 0;
      case 'XOR': return (a !== b) ? 1 : 0;
      case 'NAND': return !(a && b) ? 1 : 0;
      default: return 0;
    }
  };

  const currentGateOutput = calculateGateOutput(inputA, inputB, gateType);

  const checkCircuit = () => {
    if (currentGateOutput === gateTargetOutput) {
      playSound('correct');
      setCircuitScore((prev) => prev + 25);
      setCircuitMessage("Barakalla! Mantiqiy signal to'g'ri ulandi (+25 XP)");
      onAddXp(25, "Mantiqiy darvoza to'g'ri yechildi");
      setTimeout(() => {
        setGateTargetOutput(Math.random() > 0.5 ? 1 : 0);
        setCircuitMessage('');
      }, 1500);
    } else {
      playSound('wrong');
      setCircuitMessage("Signal mos kelmadi! A yoki B qiymatlarini o'zgartiring.");
    }
  };

  // ==========================================
  // GAME 3: ALGORITM QADAMLARI (Step Puzzle)
  // ==========================================
  const ALGORITHM_LEVELS = [
    {
      title: "Choy damlash chiziqli algoritmi",
      target: [
        "1. Choynakka toza suv quying",
        "2. Suvni gazga qo'yib qaynating",
        "3. Quruq choy barglarini damlamaga soling",
        "4. Qaynoq suvni choynakka quyib, 5 daqiqa dam bering",
      ],
      initial: [
        "4. Qaynoq suvni choynakka quyib, 5 daqiqa dam bering",
        "1. Choynakka toza suv quying",
        "3. Quruq choy barglarini damlamaga soling",
        "2. Suvni gazga qo'yib qaynating",
      ],
    },
    {
      title: "Python da sonning kvadratini hisoblash",
      target: [
        'son = int(input("Son kiriting: "))',
        'kvadrat = son ** 2',
        'print("Natija:", kvadrat)',
      ],
      initial: [
        'print("Natija:", kvadrat)',
        'son = int(input("Son kiriting: "))',
        'kvadrat = son ** 2',
      ],
    },
  ];

  const [algLevel, setAlgLevel] = useState(0);
  const [algSteps, setAlgSteps] = useState<string[]>(ALGORITHM_LEVELS[0].initial);
  const [algSolved, setAlgSolved] = useState(false);

  const moveAlgStep = (idx: number, direction: 'up' | 'down') => {
    const newSteps = [...algSteps];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newSteps.length) return;
    const temp = newSteps[idx];
    newSteps[idx] = newSteps[targetIdx];
    newSteps[targetIdx] = temp;
    setAlgSteps(newSteps);
    playSound('click');

    const isCorrect = newSteps.every(
      (val, i) => val === ALGORITHM_LEVELS[algLevel].target[i]
    );
    if (isCorrect) {
      setAlgSolved(true);
      playSound('win');
      onAddXp(50, "Algoritm to'g'ri tartiblandi");
    }
  };

  // ==========================================
  // GAME 4: PYTHON BUG HUNTER (Kod Xatosini Top)
  // ==========================================
  const BUG_LEVELS = [
    {
      title: "Sikl oxiridagi sintaktik xato",
      code: "for son in range(1, 11)\n    print(son)",
      options: [
        "range(1, 11) dan keyin ikki nuqta (:) tushib qolgan",
        "print so'zi noto'g'ri yozilgan",
        "range o'rniga list ishlatish shart",
        "for operatori Python da mavjud emas",
      ],
      correctIndex: 0,
      explanation: "Python da for, while, if, def kabi blok boshlovchi operatorlar oxirida doimo ':' (ikki nuqta) bo'lishi shart!",
    },
    {
      title: "Taqqoslash shartidagi xato",
      code: "yosh = 16\nif yosh = 18:\n    print('Voyaga yetgan')",
      options: [
        "yosh o'zgaruvchisiga qiymat berilmagan",
        "Taqqoslash uchun '=' emas, '==' ishlatilishi kerak",
        "print o'rniga input bo'lishi lozim",
        "if kalit so'zi katta harfda yozilishi kerak",
      ],
      correctIndex: 1,
      explanation: "Bitta barobar '=' qiymat berish amali, ikkita barobar '==' esa tenglikni tekshirish amalidir!",
    },
    {
      title: "Tur mos kelmasligi (TypeError)",
      code: "ball = 95\nprint('Sizning balingiz: ' + ball)",
      options: [
        "print ichida plyus ishlatib bo'lmaydi",
        "ball son (int) bo'lgani uchun str(ball) deb o'girish yoki vergul (,) qo'yish kerak",
        "ball nomli o'zgaruvchi yaratib bo'lmaydi",
        "Matn qo'shtirnoqsiz bo'lishi kerak",
      ],
      correctIndex: 1,
      explanation: "Python da matn (str) bilan son (int) ni to'g'ridan-to'g'ri plyus (+) bilan ulab bo'lmaydi.",
    },
    {
      title: "Indentatsiya (Surilish) xatosi",
      code: "def salom_ber():\nprint('Salom!')\n    print('Xush kelibsiz')",
      options: [
        "Funksiya tanasi 4 ta probel (tab) surilishi kerak (IndentationError)",
        "Funksiya nomi noto'g'ri",
        "return so'zi bo'lmasa xato beradi",
        "def so'zi o'rniga function deb yoziladi",
      ],
      correctIndex: 0,
      explanation: "Python da har bir funksiya yoki blok ichidagi amallar bir xil masofada (kamida 4 probel) surilishi shart!",
    },
  ];

  const [bugIndex, setBugIndex] = useState(0);
  const [bugSelectedOpt, setBugSelectedOpt] = useState<number | null>(null);
  const [bugAnswered, setBugAnswered] = useState(false);
  const [bugScore, setBugScore] = useState(0);

  const currentBug = BUG_LEVELS[bugIndex];

  const handleBugAnswer = (idx: number) => {
    if (bugAnswered) return;
    setBugSelectedOpt(idx);
    setBugAnswered(true);
    if (idx === currentBug.correctIndex) {
      playSound('correct');
      setBugScore((p) => p + 30);
      onAddXp(30, "Python xatosi topildi");
    } else {
      playSound('wrong');
    }
  };

  const handleNextBug = () => {
    setBugIndex((p) => (p + 1) % BUG_LEVELS.length);
    setBugSelectedOpt(null);
    setBugAnswered(false);
  };

  // ==========================================
  // GAME 5: IKKILIK SANOQ TEZKOR VIKTORINASI (Binary Blitz)
  // ==========================================
  const BINARY_QUESTIONS = [
    { binary: '00000101', decimal: 5 },
    { binary: '00001010', decimal: 10 },
    { binary: '00001111', decimal: 15 },
    { binary: '00010000', decimal: 16 },
    { binary: '00010100', decimal: 20 },
    { binary: '00100000', decimal: 32 },
    { binary: '01000000', decimal: 64 },
    { binary: '01100100', decimal: 100 },
  ];

  const [binIndex, setBinIndex] = useState(0);
  const [binUserAnswer, setBinUserAnswer] = useState('');
  const [binScore, setBinScore] = useState(0);
  const [binStatus, setBinStatus] = useState<string>('');

  const currentBin = BINARY_QUESTIONS[binIndex];

  const handleBinarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(binUserAnswer.trim(), 10);
    if (val === currentBin.decimal) {
      playSound('win');
      setBinScore((p) => p + 40);
      setBinStatus("To'g'ri! +40 XP");
      onAddXp(40, "Ikkilik kod to'g'ri hisoblandi");
      setTimeout(() => {
        setBinIndex((p) => (p + 1) % BINARY_QUESTIONS.length);
        setBinUserAnswer('');
        setBinStatus('');
      }, 1000);
    } else {
      playSound('wrong');
      setBinStatus(`Noto'g'ri! ${currentBin.binary} = ${currentBin.decimal}`);
    }
  };

  // ==========================================
  // GAME 6: KOMPYUTER QURILMALARI SARALOVCHI (Hardware Sorter)
  // ==========================================
  const HARDWARE_ITEMS = [
    { name: 'Klaviatura', category: 'input' },
    { name: 'Monitor (Ekran)', category: 'output' },
    { name: 'SSD Qattiq Disk', category: 'storage' },
    { name: 'Markaziy Protsessor (CPU)', category: 'cpu' },
    { name: 'Printer (Chop etuvchi)', category: 'output' },
    { name: 'Skaner', category: 'input' },
    { name: 'Tezkor Xotira (RAM)', category: 'storage' },
    { name: 'Videokarta (GPU)', category: 'cpu' },
    { name: 'Mikrofon', category: 'input' },
    { name: 'Karnay (Kolonka)', category: 'output' },
  ];

  const [hwIndex, setHwIndex] = useState(0);
  const [hwScore, setHwScore] = useState(0);
  const [hwFeedback, setHwFeedback] = useState<string>('');

  const currentHwItem = HARDWARE_ITEMS[hwIndex];

  const handleHardwareSort = (category: string) => {
    if (category === currentHwItem.category) {
      playSound('correct');
      setHwScore((p) => p + 20);
      setHwFeedback("To'g'ri saralandi! +20 XP");
      onAddXp(20, "Qurilma to'g'ri toifalandi");
      setTimeout(() => {
        setHwIndex((p) => (p + 1) % HARDWARE_ITEMS.length);
        setHwFeedback('');
      }, 800);
    } else {
      playSound('wrong');
      setHwFeedback("Noto'g'ri toifa! Qaytadan o'ylab ko'ring.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-2">
            <Gamepad2 className="w-4 h-4" />
            <span>6 TA INTERAKTIV INFORMATIKA O'YINLARI</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Darsni Qiziq O'tish Uchun Ta'limiy O'yinlar
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Axadboy Nishanov darslarida kodlash tezligi, ikkilik mantiq, bug qidirish va apparat ta'minotini o'yin orqali mustahkamlang!
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-purple-900/40 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-2 self-start md:self-auto">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Sizning umumiy XP balingiz: {currentUser.xp}</span>
        </div>
      </div>

      {/* 6 Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <button
          onClick={() => setActiveGame('typing')}
          className={`p-3.5 rounded-2xl border text-left font-bold text-xs flex flex-col gap-1 transition-all ${
            activeGame === 'typing'
              ? 'bg-gradient-to-b from-purple-600 to-indigo-700 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-105'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <span className="text-lg">🏎️</span>
          <span>1. Klaviatura Poygasi</span>
        </button>

        <button
          onClick={() => setActiveGame('circuit')}
          className={`p-3.5 rounded-2xl border text-left font-bold text-xs flex flex-col gap-1 transition-all ${
            activeGame === 'circuit'
              ? 'bg-gradient-to-b from-purple-600 to-indigo-700 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-105'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <span className="text-lg">⚡</span>
          <span>2. Mantiqiy Sxemalar</span>
        </button>

        <button
          onClick={() => setActiveGame('algorithm')}
          className={`p-3.5 rounded-2xl border text-left font-bold text-xs flex flex-col gap-1 transition-all ${
            activeGame === 'algorithm'
              ? 'bg-gradient-to-b from-purple-600 to-indigo-700 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-105'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <span className="text-lg">🧩</span>
          <span>3. Algoritm Qadamlari</span>
        </button>

        <button
          onClick={() => setActiveGame('bughunter')}
          className={`p-3.5 rounded-2xl border text-left font-bold text-xs flex flex-col gap-1 transition-all ${
            activeGame === 'bughunter'
              ? 'bg-gradient-to-b from-purple-600 to-indigo-700 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-105'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <span className="text-lg">🐛</span>
          <span>4. Python Bug Hunter</span>
        </button>

        <button
          onClick={() => setActiveGame('binary')}
          className={`p-3.5 rounded-2xl border text-left font-bold text-xs flex flex-col gap-1 transition-all ${
            activeGame === 'binary'
              ? 'bg-gradient-to-b from-purple-600 to-indigo-700 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-105'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <span className="text-lg">🔢</span>
          <span>5. Ikkilik Sanoq Blitz</span>
        </button>

        <button
          onClick={() => setActiveGame('hardware')}
          className={`p-3.5 rounded-2xl border text-left font-bold text-xs flex flex-col gap-1 transition-all ${
            activeGame === 'hardware'
              ? 'bg-gradient-to-b from-purple-600 to-indigo-700 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-105'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <span className="text-lg">🖥️</span>
          <span>6. Qurilma Saralovchi</span>
        </button>
      </div>

      {/* GAME 1: TYPING SPRINT */}
      {activeGame === 'typing' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Klaviatura Poygasi — Python Kodini Tezkor Terish
              </h3>
              <p className="text-xs text-slate-400">
                Kod matnini klaviaturada xatosiz va tezroq yozing. WPM tezligingiz hisoblanadi!
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
              Bosqich: {phraseIndex + 1}/{TYPING_PHRASES.length}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-base sm:text-lg text-slate-200">
            {targetPhrase.split('').map((char, index) => {
              let color = 'text-slate-500';
              if (index < typedText.length) {
                color = typedText[index] === char ? 'text-emerald-400 font-bold bg-emerald-950/40' : 'text-rose-400 font-bold bg-rose-950/40';
              } else if (index === typedText.length) {
                color = 'text-cyan-400 underline animate-pulse';
              }
              return (
                <span key={index} className={color}>
                  {char}
                </span>
              );
            })}
          </div>

          <input
            type="text"
            value={typedText}
            onChange={handleTypingChange}
            placeholder="Shu yerga kodni terishni boshlang..."
            disabled={typingFinished}
            className="w-full px-5 py-4 rounded-2xl bg-slate-950 border border-indigo-500/50 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />

          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex gap-4">
              <span>
                Aniqlik: <strong className="text-emerald-400">{accuracy}%</strong>
              </span>
              <span>
                WPM: <strong className="text-amber-400">{wpm} so'z/daq</strong>
              </span>
            </div>
            {typingFinished && (
              <button
                onClick={handleNextTypingPhrase}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2"
              >
                Keyingi kod poygasi
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* GAME 2: LOGIC GATES LAB */}
      {activeGame === 'circuit' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Mantiqiy Sxemalar — AND, OR, NOT, XOR Darvozalari
              </h3>
              <p className="text-xs text-slate-400">
                Kiruvchi signallarni almashtirib, kutilgan natijaga (Target Output) erishing!
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
              Ball: {circuitScore} XP
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="space-y-3 text-center">
              <span className="text-xs text-slate-400 font-bold block">KIRISH SIGNALLARI:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                  className={`w-14 h-14 rounded-2xl font-mono text-xl font-black border transition-all ${
                    inputA === 1 ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg' : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}
                >
                  A: {inputA}
                </button>
                {gateType !== 'NOT' && (
                  <button
                    onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                    className={`w-14 h-14 rounded-2xl font-mono text-xl font-black border transition-all ${
                      inputB === 1 ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg' : 'bg-slate-900 text-slate-400 border-slate-700'
                    }`}
                  >
                    B: {inputB}
                  </button>
                )}
              </div>
            </div>

            {/* Gate selector */}
            <div className="space-y-2 text-center">
              <span className="text-xs text-slate-400 font-bold block">DARVOZA TURI:</span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {(['AND', 'OR', 'NOT', 'XOR', 'NAND'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGateType(g)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs border ${
                      gateType === g ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Target and Result */}
            <div className="space-y-2 text-center">
              <span className="text-xs text-slate-400 font-bold block">KUTILGAN CHIQISH:</span>
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 font-mono text-3xl font-black flex items-center justify-center mx-auto">
                {gateTargetOutput}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-300">{circuitMessage}</span>
            <button
              onClick={checkCircuit}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
            >
              Signallarni Tekshirish
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* GAME 3: ALGORITHM PUZZLE */}
      {activeGame === 'algorithm' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Algoritm Qadamlari — To'g'ri Tartiblash Boshqotirmasi
              </h3>
              <p className="text-xs text-slate-400">
                Algoritm qoidasi: Harakatlar ketma-ket, mantiqiy va to'g'ri joylashishi lozim!
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-400">
              Mavzu: {ALGORITHM_LEVELS[algLevel].title}
            </span>
          </div>

          <div className="space-y-2.5">
            {algSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-200 font-mono"
              >
                <span>{step}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => moveAlgStep(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white"
                  >
                    ⬆️
                  </button>
                  <button
                    onClick={() => moveAlgStep(idx, 'down')}
                    disabled={idx === algSteps.length - 1}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white"
                  >
                    ⬇️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {algSolved && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center justify-between">
              <span>🎉 Qoyilmaqom! Algoritm to'g'ri tartiblandi (+50 XP).</span>
              <button
                onClick={() => {
                  const nextLvl = (algLevel + 1) % ALGORITHM_LEVELS.length;
                  setAlgLevel(nextLvl);
                  setAlgSteps(ALGORITHM_LEVELS[nextLvl].initial);
                  setAlgSolved(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Keyingi algoritm
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 4: PYTHON BUG HUNTER */}
      {activeGame === 'bughunter' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bug className="w-5 h-5 text-rose-400" />
                Python Bug Hunter — Koddagi Xatoni Aniqlash
              </h3>
              <p className="text-xs text-slate-400">
                Dasturchi kodi xato bermoqda! Qaysi qatorda qanday kamchilik borligini toping.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300">
              Bug Ball: {bugScore} XP
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-rose-400">XATOLI KOD:</span>
            <pre className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40 font-mono text-sm text-rose-300 overflow-x-auto">
              <code>{currentBug.code}</code>
            </pre>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300">Xatolik sababini tanlang:</span>
            <div className="space-y-2">
              {currentBug.options.map((opt, i) => {
                let btnClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                if (bugAnswered) {
                  if (i === currentBug.correctIndex) {
                    btnClass = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                  } else if (bugSelectedOpt === i) {
                    btnClass = 'bg-rose-950/70 border-rose-500 text-rose-200';
                  } else {
                    btnClass = 'bg-slate-950/40 text-slate-600 border-slate-900';
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleBugAnswer(i)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {bugAnswered && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                <strong className="text-cyan-400">Izoh: </strong>
                {currentBug.explanation}
              </span>
              <button
                onClick={handleNextBug}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex-shrink-0"
              >
                Keyingi xato
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 5: BINARY BLITZ */}
      {activeGame === 'binary' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Binary className="w-5 h-5 text-cyan-400" />
                Ikkilik Sanoq Tizimi Masteri (Binary Blitz)
              </h3>
              <p className="text-xs text-slate-400">
                Kompyuter tili faqat 0 va 1 dan iborat! Ikkilik kodni 10 lik songa tezkor aylantiring.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
              To'plangan: {binScore} XP
            </span>
          </div>

          <div className="text-center py-6 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              BERILGAN IKKILIK KOD (8-BIT):
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-black text-cyan-400 tracking-wider">
              {currentBin.binary}
            </div>
            <p className="text-xs text-slate-400">
              Yordam: 128, 64, 32, 16, 8, 4, 2, 1 bit og'irliklarini qo'shing.
            </p>
          </div>

          <form onSubmit={handleBinarySubmit} className="max-w-md mx-auto flex gap-3">
            <input
              type="number"
              value={binUserAnswer}
              onChange={(e) => setBinUserAnswer(e.target.value)}
              placeholder="O'nlik sanoq sistemasidagi son..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white font-mono text-base focus:outline-none focus:border-cyan-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg"
            >
              Tekshirish
            </button>
          </form>

          {binStatus && (
            <div className="text-center text-sm font-bold text-amber-400">{binStatus}</div>
          )}
        </div>
      )}

      {/* GAME 6: HARDWARE SORTER */}
      {activeGame === 'hardware' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Kompyuter Qurilmalari Saralovchi (Hardware Sorter)
              </h3>
              <p className="text-xs text-slate-400">
                Berilgan apparat qurilmasini to'g'ri funksional toifaga joylashtiring!
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
              Qurilmalar: {hwIndex + 1}/{HARDWARE_ITEMS.length} • {hwScore} XP
            </span>
          </div>

          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Hozirgi Qurilma:
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {currentHwItem.name}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => handleHardwareSort('input')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 hover:bg-blue-950/40 text-slate-200 font-bold text-xs flex flex-col items-center gap-2 transition-all"
            >
              <span className="text-2xl">📥</span>
              <span>Kiritish Qurilmasi</span>
            </button>

            <button
              onClick={() => handleHardwareSort('output')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-950/40 text-slate-200 font-bold text-xs flex flex-col items-center gap-2 transition-all"
            >
              <span className="text-2xl">📤</span>
              <span>Chiqarish Qurilmasi</span>
            </button>

            <button
              onClick={() => handleHardwareSort('storage')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500 hover:bg-amber-950/40 text-slate-200 font-bold text-xs flex flex-col items-center gap-2 transition-all"
            >
              <span className="text-2xl">💾</span>
              <span>Xotira Qurilmasi</span>
            </button>

            <button
              onClick={() => handleHardwareSort('cpu')}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500 hover:bg-purple-950/40 text-slate-200 font-bold text-xs flex flex-col items-center gap-2 transition-all"
            >
              <span className="text-2xl">⚙️</span>
              <span>Markaziy Ishlovchi (CPU/GPU)</span>
            </button>
          </div>

          {hwFeedback && (
            <div className="text-center text-xs font-bold text-cyan-400">{hwFeedback}</div>
          )}
        </div>
      )}
    </div>
  );
};
