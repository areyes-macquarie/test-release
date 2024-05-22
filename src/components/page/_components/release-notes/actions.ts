'use server';

import {
  ReleaseNote,
  getReleaseNotes,
} from '@/lib/release-notes/get-release-notes';

export async function getAllReleaseNotes(): Promise<ReleaseNote[]> {
  return new Promise((resolve, reject) => {
    try {
      const result = getReleaseNotes();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
