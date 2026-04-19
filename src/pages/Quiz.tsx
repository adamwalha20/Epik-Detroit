import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { supabase, isMock } from '../lib/supabase';
import { QUIZ_QUESTIONS, calculateAIType } from '../lib/quizData';
import { cn } from '../lib/utils';

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ logic: 0, creativity: 0, risk: 0, empathy: 0 });
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleOptionClick = async (trait: string, value: number, optionText: string) => {
    const newScores = { ...scores, [trait]: scores[trait as keyof typeof scores] + value };
    setScores(newScores);
    
    // Save decision history
    if (!isMock) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('decisions').insert({
          user_id: user.id,
          question_id: question.id,
          selected_answer: optionText,
          trait_impact: { [trait]: value }
        });
      }
    }

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      await finalizeQuiz(newScores);
    }
  };

  const finalizeQuiz = async (finalScores: typeof scores) => {
    setIsSubmitting(true);
    const aiType = calculateAIType(finalScores);
    const totalScore = Object.values(finalScores).reduce((a: number, b: number) => a + b, 0) as number;
    const percentage = Math.round((totalScore / (QUIZ_QUESTIONS.length * 3)) * 100);
    const stabilityIndex = 75 + Math.floor(Math.random() * 20); // Mocked stability
    
    let trustLevel = 'LOW';
    if (percentage > 40) trustLevel = 'MEDIUM';
    if (percentage > 75) trustLevel = 'HIGH';

    if (!isMock) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('quiz_results').upsert({
          user_id: user.id,
          score: percentage,
          ai_type: aiType,
          logic_score: finalScores.logic,
          creativity_score: finalScores.creativity,
          risk_score: finalScores.risk,
          empathy_score: finalScores.empathy,
          stability_index: stabilityIndex,
          trust_level: trustLevel
        }, { onConflict: 'user_id' });
      }
    }
    
    // Store in local storage for preview without auth
    localStorage.setItem('epik_result', JSON.stringify({
      score: percentage, ai_type: aiType, stability_index: stabilityIndex, trust_level: trustLevel
    }));

    navigate('/result');
  };

  const handleEasterEggClick = () => {
    const newClicks = easterEggClicks + 1;
    setEasterEggClicks(newClicks);
    if (newClicks >= 5) {
      navigate('/easter-egg');
    }
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen overflow-hidden antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Navigation />
      
      <main className="relative h-screen w-full flex items-center justify-center p-6 hud-grid" style={{backgroundImage: 'linear-gradient(to right, rgba(62, 72, 80, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(62, 72, 80, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative w-full max-w-2xl h-[600px] flex items-center justify-center">
          <div className="absolute w-[120%] h-[120%] rounded-full border border-outline-variant/10 pointer-events-none"></div>
          <div className="absolute w-[140%] h-[140%] rounded-full border border-outline-variant/5 pointer-events-none border-dashed border-[1px]"></div>
          
          <div className="relative w-80 h-80 rounded-full bg-surface-container-low/80 backdrop-blur-xl flex flex-col items-center justify-center p-8 z-10 box-shadow-[0_0_40px_rgba(0,174,239,0.15),inset_0_0_20px_rgba(0,174,239,0.1)] border border-primary/20">
            <span 
              onClick={handleEasterEggClick}
              className="material-symbols-outlined text-primary-container text-4xl mb-4 cursor-pointer hover:scale-110 transition-transform" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              psychology
            </span>
            <h1 className="font-headline text-lg text-center text-on-surface uppercase tracking-wider mb-2">
              AI EVALUATION PROTOCOL
            </h1>
            <p className="font-body text-sm text-center text-on-surface-variant">
              {question.text}
            </p>
            
            <div className="absolute bottom-6 flex items-center gap-2 bg-surface-container-highest px-4 py-1.5 rounded-full border border-outline-variant/30">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary-container"></div>
              <span className="font-headline text-[10px] text-secondary tracking-widest uppercase">
                {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length} INTEGRATING
              </span>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" viewBox="0 0 600 600">
            <line opacity="0.4" stroke="#00aeef" strokeDasharray="4 4" strokeWidth="1.5" x1="300" x2="100" y1="300" y2="150"></line>
          </svg>

          {/* Options positioned orbitally - mapping to A, B, C, D */}
          <div className="absolute w-full h-full pointer-events-none hidden md:block">
             <button onClick={() => handleOptionClick(question.options[0].trait, question.options[0].value, question.options[0].text)} className="pointer-events-auto absolute top-8 left-16 group flex items-center gap-4 transition-transform hover:scale-105 active:scale-95 focus:outline-none">
              <div className="relative w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center border border-primary z-10 backdrop-blur-sm box-shadow-[0_0_15px_rgba(0,227,253,0.4)]">
                <span className="font-headline text-primary font-bold">A</span>
                <div className="absolute -inset-1 rounded-full border border-primary/40"></div>
              </div>
              <div className="bg-surface-container-low/90 backdrop-blur-md px-4 py-3 rounded-lg border border-primary/30 max-w-[200px] shadow-[0_0_15px_rgba(0,174,239,0.1)]">
                <span className="font-body text-sm text-on-surface block text-left">{question.options[0].text}</span>
              </div>
            </button>

            <button onClick={() => handleOptionClick(question.options[1].trait, question.options[1].value, question.options[1].text)} className="pointer-events-auto absolute top-8 right-16 group flex items-center gap-4 flex-row-reverse transition-transform hover:scale-105 active:scale-95 focus:outline-none">
              <div className="relative w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center border border-outline-variant/50 group-hover:border-primary/50 transition-colors z-10">
                <span className="font-headline text-on-surface-variant group-hover:text-primary transition-colors">B</span>
              </div>
              <div className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-3 rounded-lg border border-outline-variant/20 max-w-[200px] group-hover:border-primary/20 transition-colors">
                <span className="font-body text-sm text-on-surface-variant block text-right">{question.options[1].text}</span>
              </div>
            </button>

            <button onClick={() => handleOptionClick(question.options[2].trait, question.options[2].value, question.options[2].text)} className="pointer-events-auto absolute bottom-12 left-24 group flex items-center gap-4 transition-transform hover:scale-105 active:scale-95 focus:outline-none">
              <div className="relative w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center border border-outline-variant/50 group-hover:border-primary/50 transition-colors z-10">
                <span className="font-headline text-on-surface-variant group-hover:text-primary transition-colors">C</span>
              </div>
              <div className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-3 rounded-lg border border-outline-variant/20 max-w-[200px] group-hover:border-primary/20 transition-colors">
                <span className="font-body text-sm text-on-surface-variant block text-left">{question.options[2].text}</span>
              </div>
            </button>

            <button onClick={() => handleOptionClick(question.options[3].trait, question.options[3].value, question.options[3].text)} className="pointer-events-auto absolute bottom-12 right-24 group flex items-center gap-4 flex-row-reverse transition-transform hover:scale-105 active:scale-95 focus:outline-none">
              <div className="relative w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center border border-outline-variant/50 group-hover:border-primary/50 transition-colors z-10">
                <span className="font-headline text-on-surface-variant group-hover:text-primary transition-colors">D</span>
              </div>
              <div className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-3 rounded-lg border border-outline-variant/20 max-w-[200px] group-hover:border-primary/20 transition-colors">
                <span className="font-body text-sm text-on-surface-variant block text-right">{question.options[3].text}</span>
              </div>
            </button>
          </div>
          
          {/* Mobile Linear Options List */}
          <div className="md:hidden absolute -bottom-32 flex flex-col gap-3 w-full z-20">
            {question.options.map((opt) => (
              <button 
                key={opt.id}
                onClick={() => handleOptionClick(opt.trait, opt.value, opt.text)}
                className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-3 rounded-lg border border-outline-variant/20 flex gap-3 text-left w-full hover:border-primary/50 hover:bg-surface-container-low"
              >
                <span className="font-headline font-bold text-primary">{opt.id}</span>
                <span className="font-body text-sm text-on-surface-variant">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
