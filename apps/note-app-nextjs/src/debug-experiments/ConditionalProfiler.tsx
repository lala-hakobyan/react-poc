import { Profiler, ReactNode } from 'react';
import { debugFlags } from '@/debug-experiments/debugFlags';

type ProfilerPhase = 'mount' | 'update' | 'nested-update';

export function ConditionalProfiler({ children } : {children: ReactNode}) {
  if(debugFlags.enableActionsProfiler) {
    function onRender(id: string, phase: ProfilerPhase, actualDuration: number, baseDuration: number, startTime: number, commitTime: number): void {
      const slowThreshold = 1; // ms
      if (actualDuration > slowThreshold) {
        console.warn(`[Profiler Actions][${id}] ${phase} render took ${actualDuration.toFixed(2)}ms`, {
          baseDuration: baseDuration.toFixed(2),
          startedAt: startTime.toFixed(2),
          committedAt: commitTime.toFixed(2)
        });
      }
    }

    return (
      <Profiler id="profilerActions" onRender={onRender}>
        {children}
      </Profiler>
    )
  }
  return (
    children
  )
}
