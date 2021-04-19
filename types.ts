export type RoomType = {
  id: string;
  current_video: string;
  current_second: number;
  isPlaying: boolean;
  host: number;
  users: number[];
};
