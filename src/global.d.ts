import "reactn";
import { User } from "firebase";

declare module "reactn/default" {
  type Post = {
    content: string,
    title: string,
    created_at: Date,
    channelId: string,
    post_id: string,
    channelTitle: string,
    thumbnailUrl: string,
  }
  type User = {
    uid: string,
    displayName?: string,
    photoURL?: string,
    isAnonymus: boolean,
  }

  export interface State {
    posts: Post[];
    currentuser: User;
  }
}