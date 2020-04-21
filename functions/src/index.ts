// import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const postLiked = functions
  .firestore.document('users/{userID}/posts/{postID}/likedUsers/{likedUserID}')
  .onCreate((snapshot, context) =>
    admin
      .firestore()
      .collection('users')
      .doc(context.params.userID)
      .collection('posts')
      .doc(context.params.postID)
      .update({ likeCount: admin.firestore.FieldValue.increment(1) })
  )

export const postUnliked = functions
  .firestore.document('users/{userID}/posts/{postID}/likedUsers/{likedUserID}')
  .onDelete((snapshot, context) =>
    admin
      .firestore()
      .collection('users')
      .doc(context.params.userID)
      .collection('posts')
      .doc(context.params.postID)
      .update({ likeCount: admin.firestore.FieldValue.increment(-1) })
  )

export const likePost = functions
  .runWith({ memory: '1GB' })
  .firestore.document('users/{userID}/likedPosts/{likedPostID}')
  .onCreate((snapshot, context) =>
    admin
      .firestore()
      .collection('users')
      .doc(context.params.userID)
      .update({ likePostCount: admin.firestore.FieldValue.increment(1) })
  )

export const unlikePost = functions
  .firestore.document('users/{userID}/likedPosts/{likedPostID}')
  .onDelete((snapshot, context) =>
    admin
      .firestore()
      .collection('users')
      .doc(context.params.userID)
      .update({ likePostCount: admin.firestore.FieldValue.increment(-1) })
  )


admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

interface Post {
  readonly title: string;
  readonly body: string;
}

interface RootPost extends Post {
  authorRef?: FirebaseFirestore.DocumentReference;
}

export const onUsersPostCreate = functions.firestore.document('/users/{userId}/posts/{postId}').onCreate(async (snapshot, context) => {
  await copyToRootWithUsersPostSnapshot(snapshot, context);
});
export const onUsersPostUpdate = functions.firestore.document('/users/{userId}/posts/{postId}').onUpdate(async (change, context) => {
  await copyToRootWithUsersPostSnapshot(change.after, context);
});

async function copyToRootWithUsersPostSnapshot(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {
  const postId = snapshot.id;
  const userId = context.params.userId;
  const post = snapshot.data() as RootPost;
  post.authorRef = firestore.collection('users').doc(userId);
  await firestore.collection('posts').doc(postId).set(post, { merge: true });
}