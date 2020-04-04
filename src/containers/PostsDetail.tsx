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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      margin: 10,
    },
    textLeft: {
      textAlign: 'left',
    },
    paragraph: {
      marginTop: 10,
      marginBottom: 10,
    },
    title: {
      fontWeight: 'bold',
      wordWrap: 'break-word',
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
      fontWeight: 'bold',
      margin: "30px"
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

  }
  type Posts = {
    posts: Post[],
    tmp_posts: Post[],
    fetch_posts: Post[],
  }
  // const [posts, setPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useGlobal("posts");
  const [currentuser, setCurrentuser] = useGlobal("currentuser");

  const [displaypost, setDisplaypost] = useState<Post>({
    content: "",
    title: "",
    created_at: new Date(),
    channelId: "",
    channelTitle: "",
    thumbnailUrl: "",
  });

  async function selectPosts() {
    var index = posts.findIndex(({ post_id }) => post_id === props.match.params.id);
    if (index === -1) {
      const snapShot = await firestore.collection('posts')
        .where('post_id', '==', props.match.params.id)
        .limit(10)
        .get()
      snapShot.forEach(doc => {
        let data = {
          content: doc.data().content,
          created_at: doc.data().created_at,
          channelId: doc.data().channelId,
          thumbnailUrl: doc.data().thumbnailUrl,
          title: doc.data().title,
          post_id: doc.data().post_id,
          channelTitle: doc.data().channelTitle
        }
        setDisplaypost(data);
      })
    } else {
      setDisplaypost(posts[index]);
    }
  };


  useEffect(() => {
    selectPosts();
    console.log(currentuser);
  }, []);

  return (
    <Scrollbars>
      <div className={classes.textLeft}>
        <Paper className={classes.root} elevation={1}>
          <div className={classes.liimg}>
            <img src={displaypost.thumbnailUrl} width="240" height="135" />
          </div>
          <Typography variant="subtitle1" className={classes.title}>
            {displaypost.title}
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
      </div>
    </Scrollbars >

  );
}



export default PostsDetail;