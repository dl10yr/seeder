import "reactn";

declare module "reactn/default" {
  type Post = {
    content: string,
    title: string,
    created_at: Date,
    channelId: string,
    post_id: string,
    channelTitle: string,
    thumnailUrl: string,
  }

  export interface State {
    posts: Post[];
  }
}