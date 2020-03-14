import React from 'react';
import Post from '../Posts/Post/Post';
import postService from '../../services/post-services';

export default class Detail extends React.Component {
    state = {
        post: null
    };

    componentDidMount() {
        const id = this.match.params.id;
        postService.load(id).then(post => {
            this.setState({ post });
        });
    }

    render() {
        const { post } = this.state;
        return post && <Post description={post.description} author={post.author.username} />
    }
}