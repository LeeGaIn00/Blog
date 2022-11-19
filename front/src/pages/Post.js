import React, { Component } from 'react';
import '../assets/css/post.css';
import PostService from '../service/PostService.js';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state ={
            id: this.props.location.state.id,
            no: this.props.match.params.no,
            membereId: this.props.location.id,
            post: {}
        }
    }
    componentDidMount() {
        PostService.getPost(this.state.no).then(res => {
            this.setState({ post: res.data });
        })
    }

    /* 글 수정으로 이동 */
    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push({
            pathname: `/create-post/${this.state.no}`,
            state: {id: this.state.id}
        });
    }

     /* 글 삭제 */
     deleteView = async function () {
        if (window.confirm("글을 삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다")) {
            PostService.deletePost(this.state.no).then(res => {
                //console.log("delete result => " + JSON.stringify(res));
                if (res.status == 200) {
                    this.props.history.push(`/myblog/${this.state.id}`);
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
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
                        <button className="post-btn-edit btn-round ml-1" color="info" type="button"
                                onClick={this.goToUpdate}>
                            수정
                        </button>
                        <button className="post-btn-cancel btn-round ml-1" color="info" type="button"
                                onClick={() => this.deleteView()}>
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