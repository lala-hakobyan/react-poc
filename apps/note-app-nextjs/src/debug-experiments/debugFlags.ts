const enableAllDebugExperiments = process.env.NEXT_PUBLIC_ENABLE_ALL_DEBUG_EXPERIMENTS === 'true';

export const debugFlags = {
  enableMockStorageData: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_MOCK_STORAGE_DATA === 'true',
  enableSpeculationRules: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_SPECULATION_RULES === 'true',
  enableRenderBlockingScript: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_RENDER_BLOCKING_SCRIPT === 'true',
  enableNoteEditDelay: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_NOTE_EDIT_DELAY === 'true',
  enableActionsProfiler: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_ACTIONS_PROFILER === 'true',
  enableReactUnnecessaryRerender: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_REACT_UNNECESSARY_RERENDER === 'true',
  enableLoadMoreCustomPerformanceTrack: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_LOAD_MORE_CUSTOM_PERFORMANCE_TRACK === 'true',
  enableBrowserCompatibilityInfo: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_BROWSER_COMPATIBILITY_INFO === 'true',
  enableCSPViolationScript: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_CSP_VIOLATION_SCRIPT === 'true',
  enableSuspenseBanner: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_SUSPENSE_BANNER === 'true',
  enableDeleteAuthAPIError: enableAllDebugExperiments || process.env.NEXT_PUBLIC_ENABLE_DELETE_AUTH_API_ERROR === 'true',
}
