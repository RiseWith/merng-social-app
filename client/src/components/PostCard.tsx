import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

import { IPost } from '../models/post';

const PostCard = (props: any) => {
  const { body, username, createdAt, id, likeCount, commentCount} = props.post;
  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='//react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}

export default PostCard
