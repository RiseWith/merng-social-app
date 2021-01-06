import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

import { IPost } from '../models/post';

const PostCard = (props: any) => {
  const { body, username, createdAt, id, likeCount, commentCount} = props.post;

  function likePost() {
    console.log('Post liked!');
  }

  function commentOnPost() {
    console.log('Post commented!');
  }

  return (
    <Card fluid raised>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='//react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic={true}
          color='teal'
          icon='heart'
          label={{ basic: true, color: 'teal', pointing: 'left', content: likeCount }}
          onClick={likePost}
        />
        <Button
          basic={true}
          color='blue'
          icon='comments'
          label={{ basic: true, color: 'blue', pointing: 'left', content: commentCount }}
          onClick={commentOnPost}
        />
      </Card.Content>
    </Card>
  )
}

export default PostCard
