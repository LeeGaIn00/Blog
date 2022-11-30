import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

// components
import MyBlogHeader from "../components/MyBlogHeader";

// styles
import '../assets/scss/post.scss';

// service
import PostService from '../service/PostService.js';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state ={
            id: this.props.location.state.id,
            no: this.props.match.params.no,
            post: {},
            tags: [],
            comments: [],
            text: '',
            updating: {
                now: false,
                commentNo: ''
            }
        }
        this.changeTextHandler = this.changeTextHandler.bind(this);
    }
    componentDidMount() {
        PostService.getPost(this.state.no).then(res => {
            console.log(res.data);
            this.setState({ 
                post: res.data.post,
                tags: res.data.tags
            });
        })
        PostService.getAllComment(this.state.no).then(res => {
            this.setState({ comments: res.data });
            console.log(res.data);
        })

        document.querySelector('.post-comment-btn').disabled = true;
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
                if (res.status === 200) {
                    this.props.history.push(`/myblog/${this.state.id}`);
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
    }

    /* 댓글 create */
    createComment = () => {
        let comment = {
            postNo: this.state.no,
            memberId: this.state.id,
            text: this.state.text,
            orgText: this.state.text
        }
        console.log("comment => " + JSON.stringify(comment));
        PostService.createComment(comment).then(res => {
            window.location.reload();
        })
    }

    checkValid = () => {
        const btn = document.querySelector('.post-comment-btn');
        { this.state.text.length > 0 ? 
            btn.disabled = false : btn.disabled = true; }
    }
    
    checkUpdateValid = () => {
        const btn = document.querySelector('.post-commentupdate-btn');
        { this.state.text.length > 0 ? 
            btn.disabled = false : btn.disabled = true; }
    }

    /* 댓글 update */
    updateComment = (commentNo) => {
        let comment = {
            postNo: this.state.no,
            memberId: this.state.id,
            //text: this.state.text
            text: document.querySelector('#post-updatecomment').value
        }
        PostService.updateComment(commentNo, comment).then(res => {
            window.location.reload();
        })
        console.log(this.state.text);
    }

    /* onChange 이벤트 발생 시 댓글 내용 저장 */
    changeTextHandler = (event) => {
        this.setState({ text: event.target.value }); // 아무것도 입력 안하고 등록 누르면 원래 댓글 내용 사라짐
        
    }

    /* 댓글 수정 상태로 업데이트 */
    changeUpdating = (commentNo) => {
        this.setState({
            updating: {
                now: !this.state.updating.now,
                commentNo: commentNo
            }
        });
    }

    /* 댓글 delete */
    deleteComment = async function (commentNo) { 
        if (window.confirm("댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구할 수 없습니다")) {
            PostService.deleteComment(this.state.no, commentNo).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                window.location.reload();
            }).catch(error => alert("댓글 삭제가 실패했습니다."));
        }
    }

     /* 목록으로 돌아가기 */
     goToList() {
        this.props.history.goBack();
    }

    render() {
        return (
            <>
            <MyBlogHeader id={this.state.id} />
            <div className='post-main'>
                <div className='post-wrapper'> 
                    <div className='post-header'>
                        <h3 className='post-title'>
                            {this.state.post.title}
                        </h3>
                        <span className='post-profile'></span>
                        <span className='post-nickname'>{this.state.post.memberId}</span>&nbsp;&nbsp;
                        <span className='post-date'>{this.state.post.createdTime}</span>
                        <FontAwesomeIcon icon={faEye} /> 
                        <span className='post-views'>{this.state.post.views}</span>
                        <hr />
                    </div>
                    <div className='post-contents' dangerouslySetInnerHTML = {{ __html: this.state.post.text }} />
                    <div className='post-tags'>
                        <ul>
                            {this.state.tags.map((tag, index) => (
                                <li key={index}>
                                    <span className="tag-title">#{tag}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <br /><br />
                    <div className='post-btn'>
                       {/* 작성자만 볼 수 있게 */}
                        <Button size='sm' 
                                onClick={this.goToUpdate}>
                            수정
                        </Button> &nbsp;
                        <Button size='sm'
                                onClick={() => this.deleteView()}>
                            삭제
                        </Button>
                    </div>
                    <hr />
                </div>
                
                {/* comment */}
                <div className='post-comment-wrapper'>
                    <div className='post-writecomment-wrapper'>
                        <span className='post-writecomment-name'></span>
                        <textarea
                            id='post-writecomment'
                            placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                            onChange={this.changeTextHandler} 
                            onKeyUp={this.checkValid}
                            >
                        </textarea>
                        <div className='post-commentwrite-btn-wrapper'>
                            {/* 로그인 한 사용자만 작성 가능하게 */}
                            <Button size='sm' className='post-comment-btn'
                                onClick={() => this.createComment()}
                            >
                                등록
                            </Button>
                        </div>
                    </div>
                    {
                        this.state.comments.map((comment) => (
                            <div className='post-comment'>
                                <hr />
                                <div className='post-comment-header'>
                                    <span className='post-comment-name'>{comment.member.id}</span>&nbsp;&nbsp;
                                    {comment.updated_time === null ? 
                                        <span className='post-comment-date'>{comment.created_time.substring(0, 16)}</span>
                                        : <span className='post-comment-date'>{comment.updated_time.substring(0, 16)} <span className='post-comment-updatedmsg'>수정됨</span></span> }
                                </div>
                                <div className='post-comment-contents'>
                                    {!this.state.updating.now && <span className='post-comment-text'>{comment.text}</span> }
                                    {this.state.updating.now && this.state.updating.commentNo === comment.no &&
                                        <div className='post-updatecomment-wrapper'>
                                            <textarea
                                                id='post-updatecomment'
                                                placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                                                defaultValue={comment.text}
                                                onChange={this.changeTextHandler}
                                                onKeyUp={this.checkUpdateValid}>
                                            </textarea>
                                            <div className='post-commentupdate-btn-wrapper'>
                                                <Button className="post-commentupdate-btn btn-round ml-1" 
                                                    onClick={() => this.updateComment(comment.no)}>
                                                    등록
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                    {this.state.updating.now && this.state.updating.commentNo !== comment.no &&
                                        <span className='post-comment-text'>{comment.text}</span>
                                    }
                                </div>
                                {!this.state.updating.now &&
                                    <div className='post-comment-btn-wrapper'>
                                        <Button className="post-comment-btn-edit" onClick={() => this.changeUpdating(comment.no)}>수정</Button>
                                        <Button className="post-comment-btn-cancel" onClick={() => this.deleteComment(comment.no)}>삭제</Button>
                                    </div>
                                }
                            </div>
                        ))
                    }
                    </div>
                    <div className='post-gotolist-btn-wrapper'>
                        <Button size='sm' className="post-btn"
                            onClick={this.goToList.bind(this)}>
                            목록
                        </Button>
                    </div>
            </div>  
            </>
        );
    }
}

export default Post;