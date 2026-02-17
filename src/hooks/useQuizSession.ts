import { supabase } from '@/integrations/supabase/client';
import { QuizAnswers } from '@/types/quiz';

export const useQuizSession = () => {
  const saveSession = async (answers: Partial<QuizAnswers>, priority: string) => {
    const { data, error } = await supabase
      .from('quiz_sessions')
      .insert([{
        answers: JSON.parse(JSON.stringify(answers)),
        priority,
        completed_at: new Date().toISOString(),
      }])
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  };

  const markOfferSelected = async (sessionId: string, offerId: string) => {
    await supabase
      .from('quiz_sessions')
      .update({ selected_offer_id: offerId })
      .eq('id', sessionId);
  };

  return { saveSession, markOfferSelected };
};
