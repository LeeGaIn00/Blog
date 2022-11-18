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
            memberId: "juhye",
            text: '',
            title: '',
            views: 0
        }
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.createPost = this.createPost.bind(this);
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
        // 글 생성
        PostService.createPost(post).then(res => {
            this.props.history.push('/myblog');
        });
    }


    render() {
        return (
            <div className="wr-main">
                <MyBlogHeader/>
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