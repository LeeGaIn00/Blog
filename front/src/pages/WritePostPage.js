import React, { Component } from 'react';
import Editor from '../components/EditorComponent';
import { Input, Button } from 'reactstrap';

// styles
import "../assets/scss/writepost.scss"

// components
import MyBlogHeader from "../components/MyBlogHeader";

// service
import PostService from '../service/PostService';

class WritePostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memberId: this.props.location.state.id,
            no: this.props.match.params.no,
            text: '',
            title: '',
            views: 0
        }
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.createPost = this.createPost.bind(this);
    }

     componentDidMount() {
        if (this.state.no === '_create') {
            return;
        } else {
            /* 수정 시 기존 글 내용 불러옴 */
            PostService.getPost(this.state.no).then(res => {
                let post = res.data;
                //console.log("post => " + JSON.stringify(post));

                this.setState({
                    title: post.title,
                    text: post.text,
                    memberId: post.memberId
                });
            });
        }
    }

    changeTextHandler = (event) => {
        this.setState({text: event});
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    createPost = (event) => {
        event.preventDefault();
        let post = {
            memberId: this.state.memberId,
            text: this.state.text,
            title: this.state.title,
            views: this.state.views
        };
        console.log("post => "+ JSON.stringify(post));
        // // 글 생성
        if (this.state.no === '_create') {
            /* 새 글 생성 */
            PostService.createPost(post).then(res => {
                this.props.history.push(`/myblog/${this.state.memberId}`);
            });
        } else {    
            /* 기존 글 수정 */
            PostService.updatePost(this.state.no, post).then(res => {
                this.props.history.push(`/myblog/${this.state.memberId}`);
            });
        }
    }

     /* 취소버튼 클릭 시 목록으로 이동 */
     cancel() {
        this.props.history.push('/myblog');
    }

    render() {
        return (
            <div className="wr-main">
                <MyBlogHeader id={this.state.memberId} />
                <div className="wr-wrapper">
                    <div className='wr-title'>
                        <Input 
                            placeholder="제목을 입력해주세요" 
                            value={this.state.title}
                            onChange={this.changeTitleHandler}
                        />
                    </div>
                    <div className="wr-ed">
                        <Editor 
                            value={this.state.text}
                            onChange={this.changeTextHandler} 
                        />
                    </div>
                    <div className="wr-btn">
                        <Button color="success" onClick={this.createPost}>작성</Button>
                        <Button color="danger" onClick={() => this.props.history.goBack()}>취소</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default WritePostPage;