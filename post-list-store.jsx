import { createContext, useReducer } from "react";


export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if(action.type ==='DELETE_POST'){
    newPostList = currPostList.filter(post => post.id !== action.payload.postId)
  } else if(action.type ==='ADD_POST'){
      newPostList = [action.payload,...currPostList];
  }
  return newPostList;
  
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POST_LIST);

  const addPost = (userId, postTitle, postBody, reactions, tags) => {dispatchPostList({
    type: "ADD_POST",
    payload: {
      id: Date.now(),
      title: postTitle,
      body: postBody,
      reactions: reactions,
      userId: userId,
      tags: tags,
    },
  });};
    

  const deletePost = (postId) => {
    dispatchPostList({
      type: 'DELETE_POST',
      payload:{
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: '1',
    title: 'Going to Mumbai',
    body: 'Hi friends, I am going to Mumbai to explore the city.',
    reactions: 100,
    userid: 'user-408',
    tags: ['vacations', 'Mumbai', 'Holiday'],
  },
  {
    id: '2', // Changed id to '2' to ensure uniqueness
    title: 'Going to Bangalore',
    body: 'Hi friends, I am going to Bangalore to explore the city.',
    reactions: 150,
    userid: 'user-409',
    tags: ['vacations', 'Bangalore', 'Holiday'],
  },
  {
    id: '3', // Changed id to '2' to ensure uniqueness
    title: 'Going to hydrabad',
    body: 'Hi friends, I am going to hydrabad to explore the city.',
    reactions: 200,
    userid: 'user-409',
    tags: ['vacations', 'hydrabad', 'Holiday'],
  },
];

export default PostListProvider;

