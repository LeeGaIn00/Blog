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

const cateData = {
    cat0 : '전체',
    cat1 : '일상',
    cat2 : '여행',
    cat3 : '취미',
    cat4 : '게임'
}

class WritePostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memberId: this.props.location.state.id,
            no: this.props.match.params.no,
            text: '',
            title: '',
            views: 0,
            tags: [],
            isLoading: true,
            curCate: cateData['cat1']
        }
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    async componentDidMount() {
        if (this.state.no === '_create') {
            this.setState({isLoading: false})
            return;
        } else {
            /* 수정 시 기존 글 내용 불러옴 */
            await PostService.getPost(this.state.no).then(res => {
                let post = res.data.post;

                this.setState({
                    title: post.title,
                    text: post.text,
                    memberId: post.memberId,
                    views: post.views,
                    tags: res.data.tags,
                    isLoading: false
                });
            });
        }
    }

    changeTextHandler = (event) => {
        this.setState({text: event});
        //console.log(document.getElementsByTagName('p')[0].getElementsByTagName('img')[0].src);
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    createdTags = (prop) => {
        console.log("createdTags prop => " + prop);
        this.setState({tags: prop});
    }

    createPost = (event) => {
        event.preventDefault();

        let post = {
            memberId: this.state.memberId,
            category: this.state.curCate,
            text: this.state.text,
            title: this.state.title,
            views: this.state.views
        };

        let data = {
            post: post,
            tags: this.state.tags
        }
        
        // let form = new FormData();
        // let imgUrl = document.getElementsByTagName('p')[0].getElementsByTagName('img')[0].src;
        
        // form.append("img", imgUrl);
        // form.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

        //console.log("post => "+ JSON.stringify(post));
        //console.log("data => " + JSON.stringify(data));

        // // 글 생성
        if (this.state.no === '_create') {
            /* 새 글 생성 */
            PostService.createPost(data).then(res => {
                this.props.history.push(`/myblog/${this.state.memberId}`);
            });
        } else {    
            /* 기존 글 수정 */
            PostService.updatePost(this.state.no, data).then(res => {
                this.props.history.push(`/myblog/${this.state.memberId}`);
            });
        }
    }

     /* 취소버튼 클릭 시 목록으로 이동 */
     cancel() {
        this.props.history.push(`/myblog/${this.state.memberId}`);
    }

     /* 카테고리 onClick 이벤트. 카테고리 변경 및 sessionStorage에 state 저장 */
     changeCate = (e) => {
        this.setState({ curCate: e.target.textContent });
    };

    render() {
        if (this.state.isLoading) {
            return null
        }
        return (
            <>
                <MyBlogHeader id={this.state.memberId} />
                <div className="wr-main">
                    <div className="wr-wrapper">
                        <div className='wr-category'>
                            <span className='cate-title'>카테고리</span>
                            <button 
                                id="cat1" 
                                type="button" 
                                className={`ml-1 btn ${this.state.curCate === cateData['cat1']? 'active' : ''}`}
                                onClick = {this.changeCate}
                            >{cateData['cat1']}
                            </button>
                            <button 
                                id="cat2" 
                                type="button" 
                                className={`ml-1 btn ${this.state.curCate === cateData['cat2'] ? 'active' : ''}`}
                                onClick = {this.changeCate}
                            >{cateData['cat2']}
                            </button>
                            <button 
                                id="cat3" 
                                type="button" 
                                className={`ml-1 btn ${this.state.curCate === cateData['cat3']? 'active' : ''}`}
                                onClick = {this.changeCate}
                            >{cateData['cat3']}
                            </button>
                            <button 
                                id="cat4" 
                                type="button" 
                                className={`ml-1 btn ${this.state.curCate === cateData['cat4']? 'active' : ''}`}
                                onClick = {this.changeCate}
                            >{cateData['cat4']}
                            </button>
                        </div>
                        <div className='wr-title'>
                            <Input 
                                placeholder="제목을 입력하세요" 
                                value={this.state.title}
                                onChange={this.changeTitleHandler}
                            />
                        </div>
                        <hr/>
                        <TagsInput createdTags={this.createdTags} tags={this.state.tags}/>
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
            </>
        );
    }
}

export default WritePostPage;