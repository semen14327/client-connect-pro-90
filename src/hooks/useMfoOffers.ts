import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MfoOffer } from '@/types/quiz';

export const useMfoOffers = () => {
  return useQuery({
    queryKey: ['mfo-offers'],
    queryFn: async (): Promise<MfoOffer[]> => {
      const { data, error } = await supabase
        .from('mfo_offers')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data as MfoOffer[];
    },
  });
};
