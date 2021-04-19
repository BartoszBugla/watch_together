export type RoomType = {
  id: number;
  current_video: string;
  current_second: number;
  isPlaying: boolean;
  host: number;
  users: number[];
};
