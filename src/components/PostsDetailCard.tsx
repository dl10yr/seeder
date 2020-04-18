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
import { AutoSizer } from 'react-virtualized';
import { BackButton, Card, Icon, Page, Tab, Tabbar, Toolbar, ToolbarButton } from "react-onsenui";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      margin: 10,
    },
    container: {
      width: '100%',
      height: '100%'
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
      margin: theme.spacing(2),
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
      margin: theme.spacing(2),
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
      marginRight: theme.spacing(2),
      wordWrap: 'break-word',
      fontSize: "1rem",
      fontWeight: 'bold',
    },
    postsdetailcard: {

    },
    submitbutton: {

    },
    button_wrapper: {

    }
  })
);

interface Props {
  post_id: string,
};

const PostsDetailCard: React.FC<Props> = props => {
  const post_id = props;
  const classes = useStyles();
  type Post = {
    content: string,
    title: string,
    created_at: Date,
    channelId: string,
    channelTitle: string,
    thumbnailUrl: string,
    video_id: string,
    doc_id: string,
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
    video_id: "",
    doc_id: ""
  });

  const [commentslist, setCommentslist] = useState<Commentslist>({
    comments: new Array(),
    startDate: new Date(0),
    endDate: new Date(0),
    isLoading: false,
  });

  async function getComments(post_id) {
    var tmp_comments = new Array();
    var start_date = new Date();
    var end_date = new Date();
    const snapShot = await firestore.collection('comments')
      .where('post_id', '==', props.post_id)
      .limit(10)
      .get()
    snapShot.forEach(doc => {
      var comment = {
        content: doc.data().content,
        created_at: doc.data().created_at.toDate(),
        post_id: doc.data().post_id,
        user_id: doc.data().user_id,
      }
      tmp_comments.push(comment);
    })
    if (tmp_comments.length > 0) {
      start_date = tmp_comments[0].created_at;
      end_date = tmp_comments.slice(-1)[0].created_at;
    }
    console.log(tmp_comments);
    setCommentslist({ comments: tmp_comments, startDate: start_date, endDate: end_date, isLoading: false });
  };

  async function selectPosts() {
    var index = postslist.posts.findIndex(({ post_id }) => post_id === props.post_id);
    if (index === -1) {
      const snapShot = await firestore.collection('posts')
        .where('post_id', '==', props.post_id)
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
          doc_id: doc.id
        }
        setDisplaypost(data);

      })

    } else {
      setDisplaypost(postslist.posts[index]);

    }
  };

  const postLike = () => {
    const batch = firestore.batch()
    batch.set(
      firestore
        .doc(displaypost.doc_id)
        .collection('likedUsers')
        .doc(currentuser.uid),
      {
        id: currentuser.uid,
        createTime: new Date(),
      }
    )
    batch.set(
      firestore
        .doc(displaypost.doc_id)
        .collection('likedUsers')
        .doc(currentuser.uid),
      {
        id: currentuser.uid,
        createTime: new Date(),
      }
    )
  }


  useEffect(() => {
    selectPosts();
  }, [props.post_id]);

  return (
    <div className={classes.container}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <Scrollbars style={{ width: width, height: height }}>
              <div className={classes.postsdetailcard}>
                <BackButton />
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
                  <div className={classes.button_wrapper}>
                    <button
                      color="primary"
                      type="submit"
                      className={classes.submitbutton}
                      onClick={() => { postLike(); }}
                    >
                      like
                    </button>
                  </div>
                </Paper>
                <Comments post_id={props.post_id} commentslist={commentslist} />
              </div>
            </Scrollbars>
          );
        }}
      </AutoSizer>

    </div>
  );
}



export default PostsDetailCard;