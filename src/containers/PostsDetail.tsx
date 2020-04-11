import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useGlobal } from "reactn";
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';

import firebase from 'firebase';
import { firestore } from '../plugins/firebase';
import Comments from '../components/Comments';
import YouTube from 'react-youtube';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      margin: 10,
    },
    container: {
      [theme.breakpoints.up('md')]: {
        width: `600px`,
      },
      width: '100%'
    },
    textLeft: {
      textAlign: 'left',
    },
    paragraph: {
      marginTop: 10,
      marginBottom: 10,
    },
    title: {
      wordWrap: 'break-word',
      fontSize: "1rem",
      fontWeight: 'bold',
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
      fontweight: "fontWeightBold",
    },
    row: {
      margin: 10,
    },
    content: {
      wordWrap: 'break-word',
      margin: theme.spacing(1),
    },
    twitterbutton: {
      margin: '20px'
    },
    deletebutton: {
      float: 'right',
      margin: '20px',
      marginTop: '30px'
    },
    loginbtn: {
      margin: '10px',
      padding: '10px',
      width: '250px',
      height: '50px',
      borderRadius: '5px',
      textAlign: 'center',
      textDecoration: 'none',
      borderWidth: '0',
      fontWeight: 'bold',
      fontSize: 'large',
      color: 'rgb(255, 255, 255)',
      background: '#00acee',
    },
    liimg: {
      textAlign: 'center',
    },
    channelTitle: {
      textAlign: 'right',
      marginRight: theme.spacing(1),
      wordWrap: 'break-word',
      fontSize: "1rem",
      fontWeight: 'bold',
    }
  })
);

interface Props {
  title: string;
  submitPost: (event: React.FormEvent<HTMLFormElement>) => void
  match: { params: { id: string } };
};

const PostsDetail: React.FC<Props> = props => {
  const classes = useStyles();
  type Post = {
    content: string,
    title: string,
    created_at: Date,
    channelId: string,
    channelTitle: string,
    thumbnailUrl: string,
    video_id: string,
  }
  type Comment = {
    content: string,
    created_at: Date,
    user_id: string,
    post_id: string,
    comment_id: string,
  }
  type Posts = {
    posts: Post[],
    tmp_posts: Post[],
    fetch_posts: Post[],
  }

  type Commentslist = {
    comments: Comment[],
    isLoading: boolean,
    startDate: Date,
    endDate: Date
  }

  // const [posts, setPosts] = useState<Post[]>([]);
  const [postslist, setPostslist] = useGlobal("postslist");
  const [currentuser, setCurrentuser] = useGlobal("currentuser");

  const [displaypost, setDisplaypost] = useState<Post>({
    content: "",
    title: "",
    created_at: new Date(0),
    channelId: "",
    channelTitle: "",
    thumbnailUrl: "",
    video_id: ""
  });

  const [commentslist, setCommentslist] = useState<Commentslist>({
    comments: new Array(),
    startDate: new Date(0),
    endDate: new Date(0),
    isLoading: false,
  });

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1
    }
  };

  async function getComments(post_id) {
    console.log("sss")
    console.log(post_id);
    let tmp_comments = new Array();
    let start_date = new Date();
    let end_date = new Date();
    const snapShot = await firestore.collection('comments')
      .where('post_id', '==', post_id)
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()
    snapShot.forEach(doc => {
      let comment = {
        content: doc.data().content,
        created_at: doc.data().created_at.toDate(),
        post_id: doc.data().post_id,
        user_id: doc.data().user_id,
      }

      tmp_comments.push(comment);
    })
    console.log(tmp_comments);
    if (tmp_comments.length > 0) {
      start_date = tmp_comments[0].created_at;
      end_date = tmp_comments.slice(-1)[0].created_at;
    }
    console.log("comments");
    setCommentslist({ comments: tmp_comments, startDate: start_date, endDate: end_date, isLoading: false });
  };

  async function selectPosts() {
    var index = postslist.posts.findIndex(({ post_id }) => post_id === props.match.params.id);
    if (index === -1) {
      const snapShot = await firestore.collection('posts')
        .where('post_id', '==', props.match.params.id)
        .limit(10)
        .get()
      snapShot.forEach(doc => {
        let data = {
          content: doc.data().content,
          created_at: doc.data().created_at.toDate(),
          channelId: doc.data().channelId,
          thumbnailUrl: doc.data().thumbnailUrl,
          title: doc.data().title,
          post_id: doc.data().post_id,
          channelTitle: doc.data().channelTitle,
          video_id: doc.data().video_id,
        }
        setDisplaypost(data);
      })

    } else {
      setDisplaypost(postslist.posts[index]);
      console.log("comments");

    }
  };


  useEffect(() => {
    selectPosts();
    getComments(props.match.params.id);

    console.log(currentuser);
  }, []);

  return (
    <Scrollbars>
      <div className={classes.container}>
        <Paper className={classes.root} elevation={1}>
          <div className={classes.liimg}>
            {/* <img src={displaypost.thumbnailUrl} width="240" height="135" /> */}
            <YouTube
              videoId={displaypost.video_id}
              opts={{ width: '80%', height: '45%' }}
            />
          </div>
          <Typography component="p" className={classes.title}>
            {displaypost.title}
          </Typography>
          <Typography component="p" className={classes.channelTitle}>
            {displaypost.channelTitle}
          </Typography>
          <Typography component="p" className={classes.content}>
            {displaypost.content}
          </Typography>
          <Typography component="p" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          </Typography>
          <Typography component="p" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          </Typography>
          <Typography component="p" style={{ fontWeight: 'bold' }}>
          </Typography>
        </Paper>
        <Comments post_id={props.match.params.id} commentslist={commentslist} />

      </div>
    </Scrollbars >
  );
}



export default PostsDetail;