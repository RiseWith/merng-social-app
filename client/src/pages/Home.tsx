import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import { IPost } from '../models/post';
// Components
import PostCard from '../components/PostCard';


const Home = () => {
  const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);
  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {
          loading ? (
            <h4>Loading posts...</h4>
          ):
          (
            posts.map((post:any) => (
              <Grid.Column key={post.id}>
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
