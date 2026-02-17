
-- МФО офферы (партнёры)
CREATE TABLE public.mfo_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  amount_min INTEGER NOT NULL DEFAULT 1000,
  amount_max INTEGER NOT NULL DEFAULT 30000,
  term_min_days INTEGER NOT NULL DEFAULT 5,
  term_max_days INTEGER NOT NULL DEFAULT 30,
  approval_rate TEXT NOT NULL DEFAULT 'high', -- high, medium, low
  referral_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Сессии квиза (анонимные)
CREATE TABLE public.quiz_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id TEXT,
  answers JSONB NOT NULL DEFAULT '{}',
  priority TEXT NOT NULL DEFAULT 'normal', -- high, normal, low
  selected_offer_id UUID REFERENCES public.mfo_offers(id),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.mfo_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Офферы доступны всем для чтения (публичные данные)
CREATE POLICY "MFO offers are publicly readable"
  ON public.mfo_offers FOR SELECT
  USING (true);

-- Сессии квиза: анонимные пользователи могут создавать и читать свои
CREATE POLICY "Anyone can create quiz sessions"
  ON public.quiz_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read quiz sessions"
  ON public.quiz_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update quiz sessions"
  ON public.quiz_sessions FOR UPDATE
  USING (true);

-- Начальные данные офферов
INSERT INTO public.mfo_offers (name, amount_min, amount_max, term_min_days, term_max_days, approval_rate, referral_url, sort_order) VALUES
  ('Займер', 1000, 30000, 5, 30, 'high', 'https://example.com/zaimer', 1),
  ('MoneyMan', 1000, 80000, 5, 126, 'high', 'https://example.com/moneyman', 2),
  ('Lime', 2000, 100000, 7, 168, 'medium', 'https://example.com/lime', 3);
