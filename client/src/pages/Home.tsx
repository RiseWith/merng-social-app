import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import { IPost } from '../models/post';
// Components
import PostCard from '../components/PostCard';


const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    if(data?.getPosts) {
      setPosts(data.getPosts);
    }
  }, [data]);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1 className="page-title">Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {
          loading ? (
            <h4>Loading posts...</h4>
          ):
          (
            posts.length &&
            posts.map((post:any) => (
              <Grid.Column key={post.id} style={{marginBottom: '1rem'}}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )
        }
      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
  query{
    getPosts{
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes{
        username
      }
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`

export default Home
