import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

// components
import MyBlogHeader from "../components/MyBlogHeader";

// styles
import '../assets/scss/post.scss';

// service
import PostService from '../service/PostService.js';

import AuthContext from '../service/AuthContext';

const Post = (props) => {
    const id = props.location.state.id;
    const no = props.match.params.no;
    const [post, setPost] = useState({});
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [updating, setUpdating] = useState({now:false, commentNo:''});
    const authCtx = useContext(AuthContext);
    let isLogin = authCtx.isLoggedIn;
    
    useEffect(() => {
        PostService.getPost(no).then(res => {
            setPost(res.data.post);
            setTags(res.data.tags);
        })
        PostService.getAllComment(no).then(res => {
            setComments(res.data);
            console.log(res.data);
        })
        window.scrollTo(0, 0);
        // document.querySelector('.post-comment-btn').disabled = true;
    }, []);

    useEffect(() => {
        if(isLogin) {
            authCtx.getUser();
            console.log(authCtx.user.id);
        }
    }, [isLogin]);
    
    /* 글 수정으로 이동 */
    const goToUpdate = (event) => {
        event.preventDefault();
        props.history.push({
            pathname: `/create-post/${no}`,
            state: {id: id}
        });
    }

     /* 글 삭제 */
    const deleteView = async function () {
         if (window.confirm("글을 삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다")) {
            let tagList = document.querySelector('.post-contents').getElementsByTagName('img');
            let imgSrc = [];
            for(let i = 0; i < tagList.length; i++) 
                imgSrc.push(tagList[i].getAttribute('src'))

            let data = { filePath: imgSrc }
            
            PostService.deletePost(no, {data}).then(res => {
                if (res.status === 200) {
                    props.history.push(`/myblog/${id}`);
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });
        }
    }

    /* 댓글 create */
    const createComment = () => {
        let comment = {
            postNo: no,
            memberId: authCtx.user.id,
            text: text,
            orgText: text
        }
        console.log("comment => " + JSON.stringify(comment));
        PostService.createComment(comment).then(res => {
            window.location.reload();
        })
    }

    const checkValid = () => {
        const btn = document.querySelector('.post-comment-btn');
        { text.length > 0 ? 
            btn.disabled = false : btn.disabled = true; }
    }
    
    const checkUpdateValid = () => {
        const btn = document.querySelector('.post-commentupdate-btn');
        { text.length > 0 ? 
            btn.disabled = false : btn.disabled = true; }
    }

    /* 댓글 update */
    const updateComment = (commentNo) => {
        let comment = {
            postNo: no,
            memberId: authCtx.user.id,
            //text: text
            text: document.querySelector('#post-updatecomment').value
        }
        PostService.updateComment(commentNo, comment).then(res => {
            window.location.reload();
        })
        console.log(text);
    }

    /* onChange 이벤트 발생 시 댓글 내용 저장 */
    const changeTextHandler = (event) => {
        setText(event.target.value); // 아무것도 입력 안하고 등록 누르면 원래 댓글 내용 사라짐
    }

    /* 댓글 수정 상태로 업데이트 */
    const changeUpdating = (commentNo) => {
        setUpdating({now: !updating.now, commentNo: commentNo});
    }

    /* 댓글 delete */
    const deleteComment = async function (commentNo) { 
        if (window.confirm("댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구할 수 없습니다")) {
            PostService.deleteComment(no, commentNo).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                window.location.reload();
            }).catch(error => alert("댓글 삭제가 실패했습니다."));
        }
    }

     /* 목록으로 돌아가기 */
    const goToList = () => {
        props.history.goBack();
    }

    return (
        <>
            <MyBlogHeader id={id} />
            <div className='post-main'>
                <div className='post-wrapper'> 
                    <div className='post-header'>
                        <h3 className='post-title'>
                            {post.title}
                        </h3>
                        <span className='post-profile'></span>
                        <span className='post-nickname'>{post.memberId}</span>&nbsp;&nbsp;
                        <span className='post-date'>{post.createdTime}</span>
                        <span className='post-views'>
                            <FontAwesomeIcon icon={faEye} className='post-views-icon'/> 
                            {post.views}
                        </span>
                        <hr />
                    </div>
                    <div className='post-contents' dangerouslySetInnerHTML = {{ __html: post.text }} />
                    <div className='post-tags'>
                        <ul>
                            {tags.map((tag, index) => (
                                <li key={index}>
                                    <span className="tag-title">#{tag}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <br />
                    {
                    (isLogin && authCtx.user.id === id) &&
                        <div className='post-btn'>
                            {/* 작성자만 볼 수 있게 */}
                            <Button size='sm' 
                                    onClick={goToUpdate}>
                                수정
                            </Button> &nbsp;
                            <Button size='sm'
                                    onClick={() => deleteView()}>
                                삭제
                            </Button>
                        </div>
                    }
                    <hr />
                </div>
                
                {/* comment */}
                <div className='post-comment-wrapper'>
                    <div className='post-writecomment-wrapper'>
                        <span className='post-writecomment-name'></span>
                        <textarea
                            id='post-writecomment'
                            placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                            onChange={changeTextHandler} 
                            onKeyUp={checkValid}
                            >
                        </textarea>
                        {
                        isLogin &&
                            <div className='post-commentwrite-btn-wrapper'>
                                {/* 로그인 한 사용자만 작성 가능하게 */}
                                <Button size='sm' className='post-comment-btn'
                                    onClick={() => createComment()}
                                >
                                    등록
                                </Button>
                            </div>
                        }
                    </div>
                    {
                        comments.map((comment) => (
                            <div className='post-comment'>
                                <hr />
                                <div className='post-comment-header'>
                                    <span className='post-comment-name'>{comment.member.id}</span>&nbsp;&nbsp;
                                    {comment.updated_time === null ? 
                                        <span className='post-comment-date'>{comment.created_time.substring(0, 16)}</span>
                                        : <span className='post-comment-date'>{comment.updated_time.substring(0, 16)} <span className='post-comment-updatedmsg'>수정됨</span></span> }
                                </div>
                                <div className='post-comment-contents'>
                                    {!updating.now && <span className='post-comment-text'>{comment.text}</span> }
                                    {updating.now && updating.commentNo === comment.no &&
                                        <div className='post-updatecomment-wrapper'>
                                            <textarea
                                                id='post-updatecomment'
                                                placeholder='불쾌감을 주는 욕설과 악플은 삭제될 수 있습니다.'
                                                defaultValue={comment.text}
                                                onChange={changeTextHandler}
                                                onKeyUp={checkUpdateValid}>
                                            </textarea>
                                            <div className='post-commentupdate-btn-wrapper'>
                                                <Button className="post-commentupdate-btn btn-round ml-1" 
                                                    onClick={() => updateComment(comment.no)}>
                                                    등록
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                    {updating.now && updating.commentNo !== comment.no &&
                                        <span className='post-comment-text'>{comment.text}</span>
                                    }
                                </div>
                                {(!updating.now && isLogin && authCtx.user.id === comment.member.id) &&
                                    <div className='post-comment-btn-wrapper'>
                                        <Button className="post-comment-btn-edit" onClick={() => changeUpdating(comment.no)}>수정</Button>
                                        <Button className="post-comment-btn-cancel" onClick={() => deleteComment(comment.no)}>삭제</Button>
                                    </div>
                                }
                            </div>
                        ))
                    }
                    </div>
                    <div className='post-gotolist-btn-wrapper'>
                        <Button size='sm' className="post-btn"
                            onClick={goToList.bind()}>
                            목록
                        </Button>
                    </div>
            </div>  
        </>
    );
};

export default Post;