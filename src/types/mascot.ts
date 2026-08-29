export type MascotMood = 
  | 'idle' 
  | 'watching-email' 
  | 'shy-password' 
  | 'peek-password' 
  | 'celebrating' 
  | 'confused';

export interface GazePosition {
  x: number; // -1 (left) to 1 (right)
  y: number; // -1 (up) to 1 (down)
}

export interface CharacterHoverState {
  pinkTall: boolean;
  pinkBig: boolean;
  tealCloud: boolean;
  blueBlob: boolean;
}
