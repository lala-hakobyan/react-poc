import { CustomPerformanceTrackActions } from '@/debug-experiments/debugExperiments.data';
import { Note } from '@/types/note.types';
import { getAllVersions, getCompatibleVersions } from 'baseline-browser-mapping';

class DebugService {
  private static instance: DebugService;
  private static publicAccessToken = process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN;

  private constructor() {
  }

  /**
   * Add Test Storage Data for
   * Debugging in Application Panel
   */
  public setAppTestData(): void {
    const csrfToken = 'd9428888-1d2a-47f8-b5c6-993475730b21';

    document.cookie = 'rna_tracking_id=550e8400-e29b-41d4-a716-446655440000; Expires=Thu, 31 Dec 2026 12:00:00 GMT; Path=/; Domain=.react-note-app.com; SameSite=Lax; Secure';

    document.cookie =
      `rna_csrf_token=${csrfToken}; ` +
      `Expires=Thu, 31 Dec 2026 12:00:00 GMT; ` +
      `Path=/; ` +
      `Domain=.react-note-app.com; ` +
      `SameSite=Strict;` +
      `Secure`;

    // Domain=.react-note-app.com → sent to local.react-note-app.com, app.react-note-app.com, etc.
    document.cookie =
      `rna_access_token=${DebugService.publicAccessToken}; ` +
      `Expires=Thu, 31 Dec 2026 12:00:00 GMT; ` +
      `Path=/; ` +
      `Domain=.react-note-app.com; ` +
      `SameSite=Strict;` +
      `Secure`;

    localStorage.setItem('rna_preferences', JSON.stringify({
      language: 'English',
      isDarkTheme: true,
      isTwoPhaseAuth: false,
      numberOfItemsInPage: 9,
      numberOfItemsInDashboard: 5,
      gridType: 'thumbnailView'
    }));

    sessionStorage.setItem('rna_add_modal_unsaved_data', JSON.stringify({ title: 'Dec 17: Todo List', description: 'Complete Front-end debugging handbook' }));
    sessionStorage.setItem('rna_edit_modal_unsaved_data', JSON.stringify({ id: 54, title: 'DIY Cat Toys', description: '- Yarn balls\\n- Cardboard scratchers\\n- Feather wands\\n- Crumpled paper balls\\n- Any empty box or bag :)' }));
  }

  /**
   * Add Custom Performance Track with 'Load More' action example for
   * Debugging in Performance panel
   */
  public addCustomPerformanceTrack(): CustomPerformanceTrackActions {
    const performanceMarkStart = () => {
      performance.mark('load-more-started', {
        detail: 'Load more: loading 9 notes.',
      });
      console.log('yes mark started');
    }

    const performanceMarkEnd = () => {
      performance.mark('load-more-ended', {
        detail: 'Load more: loaded 9 notes.',
      });
      console.log('yes mark ended');
    }

    const performanceMeasureAdd = () => {
      performance.measure('Load More Complete', {
        start: 'load-more-started',
        end: 'load-more-ended',
        detail: {
          // This data appears in the "Summary"
          extraInfo: {
            totalNoteCount: '18',
            newLoadedNotes: '9'
          },
          devtools: {
            dataType: 'track-entry',
            track: 'Notes List Tasks',
            trackGroup: 'My Notes Track',
            color: 'tertiary-dark',
            properties: [
              ['Category', 'Personal'],
            ],
            tooltipText: 'New Notes Loaded Successfully',
          },
        },
      });
      console.log('yes Load More Complete');
    }

    return {
      performanceMarkStart,
      performanceMarkEnd,
      performanceMeasureAdd,
    }
  }

  /**
   * A small function to freeze main thread for given duration using performance.now()
   * @param duration
   */
  public delayRendering (duration: number): void {
    const start = performance.now();
    while (performance.now() - start < duration) {
      // This is a synchronous, blocking loop
    }
  }

  /**
   * Highlight all notes besides the clicked one with different color
   * Apply forced delay during highlighting for each bote with given delay duration
   * @param currentNoteId
   * @param delay
   */
  public highlightOtherNotesWithDelay = (currentNoteId: string, delay = 50): void => {
    // Query for all note elements and type them as HTMLElements
    const allNoteElements = document.querySelectorAll<HTMLElement>('[data-id]');

    allNoteElements.forEach((element: HTMLElement) => {
      // Block main thread to simulate complex logic
      // This delayRendering adds just delay per item, but it adds up quickly.
      this.delayRendering(delay);

      // Add style to all elements different from selected one
      if (element.dataset.noteId !== String(currentNoteId)) {
        const elementArticle = element.querySelector('article');
        if(elementArticle) {
          elementArticle.style.backgroundColor = '#E5E7EB'; // Highlight other notes
        }
      }
    });
  };

  /**
   * Measure performance of getting note by ID API call using performance.now()
   * @param noteId
   * @param callback
   */
  public async measurePerformanceOfGettingNote (noteId: string, callback: (res: Note, open: boolean) => void) {
    const start = performance.now();
    try {
      const response: Response = await fetch(`api/notes/${noteId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN}`,
        }
      });

      if (!response.ok) {
        throw new Error('Could not the find the note.');
      }

      const result = await response.json();

      callback(result, true);
    } catch(error) {
      console.error(error);
    }

    const end = performance.now();
    console.info('getNoteById: Total Time in ms', Math.ceil((end - start) * 1000) / 1000);
  }

  public getBrowserCompatibilityInfo()  {
    console.log('Widely available baseline', getCompatibleVersions());
    console.log('Baseline feature set support of all browser versions',  getAllVersions());
  }

  public static getInstance() {
    if(!DebugService.instance) {
      DebugService.instance = new DebugService();
    }

    return DebugService.instance;
  }
}

const debugService = DebugService.getInstance();

export default debugService;
