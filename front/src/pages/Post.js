import React, { Component } from 'react';
import '../assets/css/post.css';
import PostService from '../service/PostService.js';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state ={
            id: this.props.match.params.id,
            post: {}
        }
    }
    componentDidMount() {
        PostService.getPost(this.state.id).then(res => {
            this.setState({ post: res.data });
        })
    }

    render() {
        return (
            <>
                <div className='header'> H E A D E R </div>
                <div className='post-wrapper'> 
                    <div className='post-header'>
                        <h3 className='post-title'>
                            {this.state.post.title}
                        </h3>
                        <span className='post-profile'></span>
                        <span className='post-nickname'>{this.state.post.memberId}</span>&nbsp;&nbsp;
                        <span className='post-date'>{this.state.post.createTime}</span>
                        <span className='post-views'>{this.state.post.views}</span>
                        <hr />
                    </div>
                    <div className='post-contents'>
                        {this.state.post.text}
                    
                    </div>
                    <br /><br />
                    <div className='post-btn'>
                        <button className="post-btn-edit btn-round ml-1" color="info" type="button">
                            수정
                        </button>
                        <button className="post-btn-cancel btn-round ml-1" color="info" type="button">
                            삭제
                        </button>
                    </div>
                    <hr />
                </div>
            </>
        );
    }
}

export default Post;