import { TeamsUserCredential } from '@microsoft/teamsfx';
import { createContext } from 'react';

export const TeamsFxContext = createContext<{
  teamsUserCredential?: TeamsUserCredential;
}>({
  teamsUserCredential: undefined,
});
