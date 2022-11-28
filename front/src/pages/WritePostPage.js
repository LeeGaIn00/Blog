import React, { Component } from 'react';
import Editor from '../components/EditorComponent';
import { Input, Button } from 'reactstrap';

// styles
import '../assets/scss/tagsinput.scss';
import "../assets/scss/writepost.scss"

// components
import MyBlogHeader from "../components/MyBlogHeader";
import TagsInput from "../components/TagsInput";

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
            views: 0,
            tags: []
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
                let post = res.data.post;

                this.setState({
                    title: post.title,
                    text: post.text,
                    memberId: post.memberId,
                    views: post.views
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

    createdTags = (prop) => {
        this.setState({tags: prop});
    }

    createPost = (event) => {
        event.preventDefault();

        let post = {
            memberId: this.state.memberId,
            text: this.state.text,
            title: this.state.title,
            views: this.state.views
        };

        let data = {
            post: post,
            tags: this.state.tags
        }

        console.log("post => "+ JSON.stringify(post));
        console.log("data => " + JSON.stringify(data));

        // // 글 생성
        if (this.state.no === '_create') {
            /* 새 글 생성 */
            PostService.createPost(data).then(res => {
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
        this.props.history.push(`/myblog/${this.state.memberId}`);
    }

    render() {
        return (
            <div className="wr-main">
                <MyBlogHeader id={this.state.memberId} />
                <div className="wr-wrapper">
                    <div className='wr-title'>
                        <Input 
                            placeholder="제목을 입력하세요" 
                            value={this.state.title}
                            onChange={this.changeTitleHandler}
                        />
                    </div>
                    <hr/>
                    <TagsInput createdTags={this.createdTags}/>
                    {/* <div className="wr-ed"> */}
                        <Editor 
                            value={this.state.text}
                            onChange={this.changeTextHandler} 
                        />
                    {/* </div> */}
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