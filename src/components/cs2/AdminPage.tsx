import { useState } from 'react';
import { PLAYERS } from '@/data/cs2Data';
import { toast } from 'sonner';

type AdminTab = 'create' | 'players' | 'manage';

export const AdminPage = () => {
  const [tab, setTab] = useState<AdminTab>('create');

  return (
    <div className="p-4 animate-fade-in">
      {/* Revenue stats */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {[
          { val: '8 400', label: '⭐ Оборот всего', delta: '↑ +2 840 сегодня' },
          { val: '1 260', label: '⭐ Комиссия (15%)', delta: '↑ +426 сегодня' },
          { val: '63', label: '👥 Пользователей', delta: '↑ +8 сегодня' },
          { val: '3', label: '🏆 Турниров', delta: '1 активный' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-3.5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-primary" />
            <p className="font-display text-2xl font-bold">{s.val}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.label}</p>
            <p className="text-[11px] text-success mt-0.5">{s.delta}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-secondary rounded-lg p-0.5 mb-4">
        {([
          { id: 'create' as const, label: '➕ Турнир' },
          { id: 'players' as const, label: '👾 Игроки' },
          { id: 'manage' as const, label: '⚙️ Управление' },
        ]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all tracking-wide
              ${tab === t.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Create tournament */}
      {tab === 'create' && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <p className="font-display text-[13px] font-semibold tracking-widest uppercase text-muted-foreground">
            ➕ Создать турнир
          </p>
          {[
            { label: 'Название', placeholder: 'ESL Pro League Season 23...', type: 'text' },
            { label: 'Описание', placeholder: 'Групповой этап, 8 команд...', type: 'text' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground block mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary transition-colors"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground block mb-1.5">
                Взнос (Stars)
              </label>
              <input type="number" defaultValue={100} className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground block mb-1.5">
                Макс. участников
              </label>
              <input type="number" defaultValue={100} className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          <button
            onClick={() => toast.success('✅ Турнир создан!')}
            className="w-full bg-gradient-primary text-primary-foreground font-display text-sm font-bold tracking-wider uppercase py-3 rounded-xl active:scale-[0.97] transition-transform"
          >
            🏆 Создать турнир
          </button>
        </div>
      )}

      {/* Players */}
      {tab === 'players' && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <p className="font-display text-[13px] font-semibold tracking-widest uppercase text-muted-foreground">
            👾 Управление игроками
          </p>
          <div>
            <label className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground block mb-1.5">
              Массовое добавление
            </label>
            <textarea
              rows={4}
              placeholder="s1mple, NAVI, AWP, 20&#10;NiKo, G2, Rifler, 18"
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
          <button
            onClick={() => toast.success('➕ Игроки добавлены!')}
            className="w-full bg-secondary border border-border text-foreground font-display text-sm font-bold tracking-wider uppercase py-3 rounded-xl active:scale-[0.97] transition-transform"
          >
            ➕ Добавить игроков
          </button>

          <div className="divide-y divide-border mt-2">
            {PLAYERS.slice(0, 4).map(p => (
              <div key={p.id} className="flex items-center gap-2 py-2">
                <div className="flex-1">
                  <p className="font-display text-[13px] font-semibold">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.team} · {p.role}</p>
                </div>
                <input
                  type="number"
                  defaultValue={p.price}
                  className="w-14 bg-background border border-border rounded-md px-2 py-1 text-center font-display font-bold text-sm text-primary outline-none"
                />
                <span className="text-[11px] text-muted-foreground">кр</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => toast.success('💾 Цены сохранены!')}
            className="w-full bg-secondary border border-border text-foreground font-display text-sm font-bold tracking-wider uppercase py-3 rounded-xl active:scale-[0.97] transition-transform"
          >
            💾 Сохранить цены
          </button>
        </div>
      )}

      {/* Manage */}
      {tab === 'manage' && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <p className="font-display text-[13px] font-semibold tracking-widest uppercase text-muted-foreground">
              ⚙️ Управление турнирами
            </p>
            <select className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary">
              <option>ESL Pro League S23 Finals · #1 · ACTIVE</option>
              <option>IEM Katowice 2025 · #2 · PLANNED</option>
            </select>
            <button onClick={() => toast.success('🟢 Регистрация открыта!')} className="w-full bg-gradient-green text-primary-foreground font-display text-sm font-bold tracking-wider uppercase py-3 rounded-xl active:scale-[0.97] transition-transform">
              🟢 Открыть регистрацию
            </button>
            <button onClick={() => toast.success('🔥 Турнир запущен!')} className="w-full bg-gradient-primary text-primary-foreground font-display text-sm font-bold tracking-wider uppercase py-3 rounded-xl active:scale-[0.97] transition-transform">
              🔥 Запустить турнир
            </button>
            <button onClick={() => toast.info('🔄 Пересчёт запущен...')} className="w-full bg-secondary border border-border text-foreground font-display text-sm font-bold tracking-wider uppercase py-3 rounded-xl active:scale-[0.97] transition-transform">
              🔄 Пересчитать очки
            </button>
            <button onClick={() => toast.success('🏆 Призы выплачены!')} className="w-full bg-gradient-green text-primary-foreground font-display text-sm font-bold tracking-wider uppercase py-3 rounded-xl active:scale-[0.97] transition-transform">
              🏆 Завершить + выплатить
            </button>
            <button className="w-full bg-destructive/15 border border-destructive/30 text-destructive font-display text-sm font-bold tracking-wider uppercase py-3 rounded-xl active:scale-[0.97] transition-transform mt-2">
              🚫 Заблокировать пользователя
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <p className="font-display text-[13px] font-semibold tracking-widest uppercase text-muted-foreground">
              📢 Рассылка уведомлений
            </p>
            <textarea
              rows={3}
              placeholder="Текст сообщения для всех участников..."
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary transition-colors resize-none"
            />
            <button onClick={() => toast.success('📨 Уведомление отправлено!')} className="w-full bg-secondary border border-border text-foreground font-display text-sm font-bold tracking-wider uppercase py-3 rounded-xl active:scale-[0.97] transition-transform">
              📨 Отправить всем участникам
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
