import { useState, useCallback } from 'react';
import { QuizStep, QuizAnswers, MfoOffer } from '@/types/quiz';
import { quizQuestions } from '@/data/quizQuestions';
import { useMfoOffers } from '@/hooks/useMfoOffers';
import { useQuizSession } from '@/hooks/useQuizSession';
import { WelcomeScreen } from '@/components/quiz/WelcomeScreen';
import { DisclaimerScreen } from '@/components/quiz/DisclaimerScreen';
import { QuizScreen } from '@/components/quiz/QuizScreen';
import { AnalyzingScreen } from '@/components/quiz/AnalyzingScreen';
import { ResultScreen } from '@/components/quiz/ResultScreen';
import { ConfirmScreen } from '@/components/quiz/ConfirmScreen';
import { OffersScreen } from '@/components/quiz/OffersScreen';

const Index = () => {
  const [step, setStep] = useState<QuizStep>('welcome');
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);

  const { data: offers = [] } = useMfoOffers();
  const { saveSession, markOfferSelected } = useQuizSession();

  const getPriority = (a: Partial<QuizAnswers>): string => {
    if (a.purpose === 'browsing' || a.urgency === 'browsing') return 'low';
    if (a.urgency === 'today' && a.purpose !== 'browsing') return 'high';
    return 'normal';
  };

  const handleSelectAnswer = useCallback((key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    // Auto-advance after selection
    setTimeout(() => {
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex((prev) => prev + 1);
      } else {
        setStep('analyzing');
      }
    }, 300);
  }, [quizIndex]);

  const handleAnalysisComplete = useCallback(async () => {
    try {
      const priority = getPriority(answers);
      const id = await saveSession(answers, priority);
      setSessionId(id);
    } catch {
      // continue even if save fails
    }
    setStep('result');
  }, [answers, saveSession]);

  const handleSelectOffer = async (offer: MfoOffer) => {
    if (sessionId) {
      try {
        await markOfferSelected(sessionId, offer.id);
      } catch {
        // non-blocking
      }
    }
    window.open(offer.referral_url, '_blank');
  };

  const handleQuizBack = () => {
    if (quizIndex > 0) {
      setQuizIndex((prev) => prev - 1);
    } else {
      setStep('disclaimer');
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto">
      {step === 'welcome' && <WelcomeScreen onStart={() => setStep('disclaimer')} />}
      {step === 'disclaimer' && (
        <DisclaimerScreen onContinue={() => setStep('quiz')} onBack={() => setStep('welcome')} />
      )}
      {step === 'quiz' && (
        <QuizScreen
          question={quizQuestions[quizIndex]}
          currentIndex={quizIndex}
          totalQuestions={quizQuestions.length}
          selectedValue={answers[quizQuestions[quizIndex].key]}
          onSelect={handleSelectAnswer}
          onBack={handleQuizBack}
        />
      )}
      {step === 'analyzing' && <AnalyzingScreen onComplete={handleAnalysisComplete} />}
      {step === 'result' && <ResultScreen answers={answers} onContinue={() => setStep('confirm')} />}
      {step === 'confirm' && (
        <ConfirmScreen onConfirm={() => setStep('offers')} onBack={() => setStep('result')} />
      )}
      {step === 'offers' && <OffersScreen offers={offers} onSelectOffer={handleSelectOffer} />}
    </div>
  );
};

export default Index;
