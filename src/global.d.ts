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

  type Postslist = {
    posts: Post[],
    isLoading: boolean,
    startDate: Date,
    endDate: Date
  }
  export interface State {
    postslist: Postslist;
    currentuser: User;
  }
}