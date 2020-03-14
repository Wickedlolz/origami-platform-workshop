import React from 'react';
import PropTypes from 'prop-types';
import './Posts.css';
import Post from './Post/Post';
import postService from '../../services/post-services';

// function Posts() {
//     return <div className="Posts">
//         <Post imageUrl="/logo192.png" imageAlt="alt" author="Me">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, ipsa? Optio repudiandae hic, neque voluptatum nesciunt illum, odit placeat quod ipsa a excepturi quos ad ea quis reprehenderit saepe. Vero quam, consequatur corporis iste, saepe, magni accusamus autem architecto quod quisquam ex! Ipsam, odit. Deleniti nam, quibusdam, tenetur reprehenderit, culpa nemo vel quos architecto dolores ducimus autem corporis ea magnam sunt maiores veniam minima dignissimos libero obcaecati exercitationem facere voluptates distinctio quo impedit. Rem velit asperiores provident quos perspiciatis aliquam numquam assumenda error iste consequuntur dolor eius magni, illo ea cum alias nobis vitae temporibus ducimus impedit cumque modi laboriosam sit. Enim eum facere deleniti eaque aliquam fuga sint facilis recusandae dicta in delectus vero maxime officiis tenetur, quam obcaecati quo possimus error doloremque aspernatur ad quas nesciunt quidem. Magnam tempore dolorum ipsam illum doloremque, commodi laborum vero vel in modi reiciendis eligendi fugiat non praesentium, illo, vitae maiores fugit? Assumenda neque nihil ducimus veritatis asperiores tenetur, quis eos, et porro aut sapiente consectetur ipsam sunt consequuntur mollitia nostrum reprehenderit exercitationem. Eius iusto harum et pariatur laborum facilis ut placeat eum voluptatum quam fugit unde saepe reprehenderit sit tempore illum nulla, facere aspernatur deserunt voluptatibus officiis similique! Iure, sed eligendi.</Post>
//     </div>
// }

class Posts extends React.Component {
    state = {
        posts: null
    };
    textInput = null;

    componentDidMount() {
        postService.load(null, this.props.limit).then(posts => {
            this.setState({ posts });
        });
    }

    render() {
        const { posts } = this.state;
    
        return <div>
          {posts ?
            <div className="Posts">
              {posts.map((post) =>
                <Post key={post._id} imageUrl="./origami.svg" imageAlt="alt" author={post.author}>{post.description}</Post>)}
            </div> : <div>Loading...</div>
          }
        </div>
      }
    }



Posts.propTypes = {
    limit: PropTypes.number
}

export default Posts;