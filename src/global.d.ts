import "reactn";

declare module "reactn/default" {
  type Post = {
    content: string,
    title?: string,
    created_at: Date,
    channelId?: string,
    channelTitle?: string,
    thumbnailUrl: string,
  }

  export interface State {
    posts: Post[];
  }
}