export type RoomType = {
  id: string;
  current_video: string;
  current_second: number;
  isPlaying: boolean;
  host: number;
  users: number[];
};
export type Message =
  | {
      message: string;
      type: "pusher" | "server" | "client";
      element: string;
    }
  | {
      message: string;
      type: "user";
      element: string;
      from: number;
    };
