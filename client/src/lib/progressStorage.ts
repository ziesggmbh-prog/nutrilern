// Utility functions for persisting quest progress in localStorage

const LEVEL2_PROGRESS_KEY = 'nutri-app-level2-progress';

export interface QuestProgress {
  lessonId: number;
  isCompleted: boolean;
}

// Default progress state for Level 2 (all quests start as incomplete)
const defaultLevel2Progress: QuestProgress[] = [
  { lessonId: 10, isCompleted: false },
  { lessonId: 11, isCompleted: false },
  { lessonId: 12, isCompleted: false },
  { lessonId: 13, isCompleted: false },
  { lessonId: 14, isCompleted: false },
  { lessonId: 15, isCompleted: false }
];

export function getLevel2Progress(): QuestProgress[] {
  try {
    const saved = localStorage.getItem(LEVEL2_PROGRESS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate that the structure is correct
      if (Array.isArray(parsed) && parsed.every(item => 
        typeof item === 'object' && 
        typeof item.lessonId === 'number' && 
        typeof item.isCompleted === 'boolean'
      )) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Error loading Level 2 progress from localStorage:', error);
  }
  
  // Return default progress if no valid data found
  return [...defaultLevel2Progress];
}

export function saveLevel2Progress(progress: QuestProgress[]): void {
  try {
    localStorage.setItem(LEVEL2_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn('Error saving Level 2 progress to localStorage:', error);
  }
}

export function resetLevel2Progress(): void {
  try {
    localStorage.removeItem(LEVEL2_PROGRESS_KEY);
  } catch (error) {
    console.warn('Error resetting Level 2 progress:', error);
  }
}

export function markQuestCompleted(lessonId: number): void {
  const currentProgress = getLevel2Progress();
  const updatedProgress = currentProgress.map(p => 
    p.lessonId === lessonId 
      ? { ...p, isCompleted: true }
      : p
  );
  saveLevel2Progress(updatedProgress);
}