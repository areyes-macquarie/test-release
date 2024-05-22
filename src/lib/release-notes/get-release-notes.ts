import fs from 'fs';
import path from 'path';
import semver from 'semver';

const releaseNotesDirectory = path.join(process.cwd(), 'public/release-notes');

export interface ReleaseNote {
  version: string;
  content: string;
}

export function getReleaseNotes(): ReleaseNote[] {
  try {
    const fileNames = fs.readdirSync(releaseNotesDirectory);
    const allNotesData = fileNames.map((fileName) => {
      const filePath = path.join(releaseNotesDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');

      return {
        version: fileName.replace(/\.md$/, ''),
        content: fileContents,
      };
    });

    allNotesData.sort((a, b) => semver.compare(b.version, a.version));

    return allNotesData;
  } catch (error) {
    console.error('Error reading release notes directory:', error);
    return [];
  }
}
