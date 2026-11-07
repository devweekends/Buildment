"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoTip } from "@/components/ui/info-tip";
import { toast } from "@/components/ui/app-toast";
import type { WeeklyQuestsView } from "@/shared/api/quests";

// Weekly quests mission board: effort-based goals that reset every Monday; claim Build Credits once.
export function WeeklyQuests() {
  const router = useRouter();
  const [state, setState] = useState<WeeklyQuestsView | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/learner/quests");
      if (!res.ok) return;
      setState((await res.json()).data);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function claim(id: string) {
    setBusy(id);
    try {
      const res = await fetch(`/api/v1/learner/quests/${id}/claim`, { method: "POST" });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        toast(json?.message ?? "Could not claim this quest", "error");
        return;
      }
      setState(json.data);
      toast("Quest reward claimed", "success");
      router.refresh();
    } catch {
      toast("Could not claim this quest", "error");
    } finally {
      setBusy(null);
    }
  }

  if (!state || state.quests.length === 0) return null;

  return (
    <section className="rounded-2xl border bg-card p-5 sm:p-7" aria-labelledby="quests-heading">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 id="quests-heading" className="flex items-center gap-1.5 text-lg font-semibold tracking-tight">
            Weekly quests
            <InfoTip label="About weekly quests">
              <p>Five quests each week: two core goals plus three that rotate from a pool, so they change week to week.</p>
              <p className="mt-2">Progress resets every Monday (UTC). Claim each completed quest once for Build Credits; unclaimed rewards are not paid automatically.</p>
            </InfoTip>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Effort-based goals that reset every Monday.</p>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium tabular-nums">
          {state.completed} / {state.total} complete
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {state.quests.map((quest) => {
          const percent = Math.min(100, Math.round((quest.progress / Math.max(1, quest.target)) * 100));
          return (
            <li key={quest.id} className="rounded-xl border bg-muted/30 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{quest.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{quest.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <Gift className="size-3.5" aria-hidden /> +{quest.rewardCredits}
                  </span>
                  {quest.completed && !quest.claimed ? (
                    <Button size="sm" disabled={busy === quest.id} loading={busy === quest.id} loadingLabel="Claiming…" onClick={() => void claim(quest.id)}>
                      Claim
                    </Button>
                  ) : quest.claimed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-ok">
                      <CheckCircle2 className="size-3.5" aria-hidden /> Claimed
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-1 text-[11px] tabular-nums text-muted-foreground">
                {quest.progress} / {quest.target}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
