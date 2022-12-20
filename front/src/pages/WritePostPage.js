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
            thumbnail: null,
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
                    thumbnail: post.thumbnail,
                    tags: res.data.tags,
                    isLoading: false
                });
            });
        }
        //window.scrollTo(0, 0);
    }

    changeTextHandler(event) {
        this.setState({ text: event });
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    createdTags = (prop) => {
        console.log("createdTags prop => " + prop);
        this.setState({tags: prop});
    }

    dataURLtoFile = (dataurl) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const filename = this.state.memberId + new Date().getTime() + '.' + mime.substring(6)
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
          u8arr[n - 1] = bstr.charCodeAt(n - 1)
          n -= 1 
        }
        return new File([u8arr], filename, { type: mime })
    }

    createPost(event) {
        event.preventDefault();

        let imgUrl = document.getElementsByClassName('ql-editor')[0].getElementsByTagName('img');
        let form;

        let post = {
            memberId: this.state.memberId,
            category: this.state.curCate,
            text: this.state.text,
            title: this.state.title,
            views: this.state.views,
            thumbnail: this.state.thumbnail
        };

        let data = {
            post: post,
            tags: this.state.tags
        }

        // 글 생성
        if (this.state.no === '_create') {
            /* 이미지 업로드 */
            if(imgUrl.length > 0) {
                form = new FormData();
                // base64 -> 파일 형태로 바꿔서 form에 저장
                for (let i = 0; i < imgUrl.length; i++) { 
                    const filename = this.state.memberId + new Date().getTime();
                    const file =  this.dataURLtoFile(imgUrl[i].src, filename);
                    form.append("file", file); 
                }
                // 썸네일 이미지 가장 첫번째 사진으로 설정
                post.thumbnail = '/img/' + form.get('file').name;

                PostService.imgUpload(form).then(res => {
                    // img의 src속성 이미지 저장한 경로로 변경
                    for(let i = 0; i < res.data.length; i++) 
                        document.getElementsByClassName('ql-editor')[0].getElementsByTagName('img')[i].src = `${process.env.PUBLIC_URL}/img/${res.data[i].fileName}`;
                    
                    this.setState({
                        text: document.getElementsByClassName('ql-editor')[0].innerHTML
                    });
                    // db에 저장할 텍스트 변경
                    data.post.text = document.getElementsByClassName('ql-editor')[0].innerHTML;
                }).then(res => {
                    PostService.createPost(data).then(res => {
                        this.props.history.push(`/blog/${this.state.memberId}`);
                    })
                }) 
            }
            else {
                 /* 이미지 업로드 x */
                 PostService.createPost(data).then(res => {
                    this.props.history.push(`/blog/${this.state.memberId}`);
               });
            }
        
        } else {   // 글 수정 
            // 새로 추가된 이미지가 있는지 여부 체크
            let imgCheck = false;
            for(let i = 0; i < imgUrl.length; i++) {
                if(imgUrl[i].getAttribute('src').startsWith('data')) {
                    imgCheck = true; // 하나라도 추가된 이미지가 있으면 체크
                    break;
                }
            }
            /* 이미지 업로드 */ 
            // 본문에 이미지가 존재하면서 새로 추가된 이미지가 있는 경우
            if(imgUrl.length > 0 && imgCheck) {
                form = new FormData();
                // 이미지의 형식이 base64인 경우 변경해준 뒤 form에 추가
                for (let i = 0; i < imgUrl.length; i++) { 
                    if(imgUrl[i].getAttribute('src').startsWith('data')) {
                        const filename = this.state.memberId + new Date().getTime();
                        const file =  this.dataURLtoFile(imgUrl[i].src, filename);
                        form.append("file", file); 
                        imgUrl[i].setAttribute('src', '/img/'+file.name);
                    }
                }
                // 썸네일 변경
                post.thumbnail = imgUrl[0].getAttribute('src');

                PostService.imgUpload(form).then(res => {
                    const imgSrc = document.getElementsByClassName('ql-editor')[0].getElementsByTagName('img');
                    for(let i = 0; i < res.data.length; i++) {
                        // 새로 업로드 된 이미지의 경로만 수정
                        if(imgSrc[i].getAttribute('src').startsWith('data'))
                            document.getElementsByClassName('ql-editor')[0].getElementsByTagName('img')[i].src = `${process.env.PUBLIC_URL}/img/${res.data[i].fileName}`;
                    }
                    this.setState({
                        text: document.getElementsByClassName('ql-editor')[0].innerHTML
                    });
                    // db에 저장할 텍스트 변경
                    data.post.text = document.getElementsByClassName('ql-editor')[0].innerHTML;
                }).then(res => {
                    PostService.updatePost(this.state.no, data).then(res => {
                        this.props.history.push(`/blog/${this.state.memberId}`);
                    })
                })  
            }
            else {
                data.post.thumbnail = 
                /* 이미지 업로드 X */
                PostService.updatePost(this.state.no, data).then(res => {
                    this.props.history.push(`/blog/${this.state.memberId}`);
                });
            }
        }
    }

    checkValid = (event) => {
        const text = document.getElementsByClassName('ql-editor')[0].textContent.length;
        const img = document.getElementsByClassName('ql-editor')[0].getElementsByTagName('img').length
        // 본문에 텍스트 또는 이미지가 존재하는 경우 채워진 것으로 간주
        { !(this.state.title.length > 1 && (text > 0 || img > 0)) ?
            alert("제목 또는 내용을 작성하세요.") : this.createPost(event); }
    }

     /* 취소버튼 클릭 시 목록으로 이동 */
     cancel() {
        this.props.history.push(`/blog/${this.state.memberId}`);
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
                            <Button color="success" onClick={this.checkValid}> 작성</Button>
                            <Button color="danger" onClick={() => this.props.history.goBack()}>취소</Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WritePostPage;