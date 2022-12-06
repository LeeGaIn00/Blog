import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// styles
import "../assets/scss/myblog.scss"

// components
import MyBlogHeader from "../components/MyBlogHeader";

// service
import PostService from '../service/PostService';
import MemberService from '../service/MemberService';

const cateData = {
    cat0 : '전체',
    cat1 : '일상',
    cat2 : '여행',
    cat3 : '취미',
    cat4 : '게임'
}

let selectCate;

class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            serchClick:false,
            searchInput:'',
            orgs:[],
            id: this.props.match.params.id,
            profile: '',
            posts: [],
            orgPosts: [],
            curCate: cateData['cat0']
        }
		this.createPost = this.createPost.bind(this);
    }

    componentDidMount() {
        // member 별로 curCate 구분하기 위해 id 붙여서 session에 저장
        selectCate = sessionStorage.getItem("curCate"+"_"+this.state.id) === null ? cateData['cat0'] : JSON.parse(sessionStorage.getItem("curCate"+"_"+this.state.id));

        PostService.getAllPost(this.state.id, selectCate).then((res) => {
            this.setState({ 
                posts: res.data,
                orgPosts: res.data,
                curCate: selectCate
            });
        });
    }

    /* input 창에 onChange 이벤트 */
    setSearchHandler = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    /* enter 입력 시 글 제목과 검색 결과 비교 & 필터링 */
    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            {this.state.searchInput.startsWith("#") ? 
            // Tag 검색
            PostService.getSearchPostByTag(this.state.id, this.state.curCate, this.state.searchInput.substring(1)).then((res) => {
                this.setState({
                    posts: res.data
                })
            })
            : PostService.getSearchPost(this.state.id, this.state.curCate, this.state.searchInput).then((res) => {
                this.setState({
                    posts: res.data
                })
           }); } 
        }
    };

     /* 찾기 버튼 클릭 시 글 제목과 검색 결과 비교 & 필터링 */
     setSearchContent = (e) => { 
        {this.state.searchInput.startsWith("#") ? 
            // Tag 검색
            PostService.getSearchPostByTag(this.state.id, this.state.curCate, this.state.searchInput.substring(1)).then((res) => {
                this.setState({
                    posts: res.data
                })
            })
            : PostService.getSearchPost(this.state.id, this.state.curCate, this.state.searchInput).then((res) => {
                this.setState({
                    posts: res.data
                })
           });
        }
    }

    searchInputRemoveHandler = (e) => {
        this.setState({
            searchInput: '',
            posts: this.state.orgPosts
        })
    }

    createPost = () => {
        this.props.history.push({
            pathname: "/create-post/_create",
            state: {id: this.state.id}
        })
    };

    /* 글 상세보기로 이동 */
    readPost(no) {
        /* 조회수 증가 */
        // PostService.getPost(no);
        this.props.history.push({
            pathname: `/post-detail/${no}`,
            state: {id: this.state.id}
        });
    }

     /* 카테고리 onClick 이벤트. 카테고리 변경 및 sessionStorage에 state 저장 */
    changeCate = (e) => {
        this.setState({
            curCate: e.target.textContent,
            searchInput: ''
        });
        PostService.getAllPost(this.state.id, e.target.textContent).then((res) => {
            this.setState({ 
                posts: res.data,
                orgPosts: res.data,
                //curCate: e.target.textContent
            });
        });
        sessionStorage.setItem("curCate"+"_"+this.state.id, JSON.stringify(e.target.textContent));
    };

    render() {
        return (
            <>
                <MyBlogHeader id={this.state.id} />
                <div className="mb-main">
                    <div className="mb-cate">
                        <button 
                            id="cat0" 
                            type="button" 
                            className={`ml-1 btn ${this.state.curCate === cateData['cat0'] ? 'active' : ''}`}
                            onClick = {this.changeCate}
                        >
                            {cateData['cat0']}
                        </button>
                        <button 
                            id="cat1" 
                            type="button" 
                            className={`ml-1 btn ${this.state.curCate === cateData['cat1'] ? 'active' : ''}`}
                            onClick = {this.changeCate}
                        >
                            {cateData['cat1']}
                        </button>
                        <button 
                            id="cat2" 
                            type="button" 
                            className={`ml-1 btn ${this.state.curCate === cateData['cat2'] ? 'active' : ''}`}
                            onClick = {this.changeCate}
                        >
                            {cateData['cat2']}
                        </button>
                        <button 
                            id="cat3" 
                            type="button" 
                            className={`ml-1 btn ${this.state.curCate === cateData['cat3'] ? 'active' : ''}`}
                            onClick = {this.changeCate}
                        >
                            {cateData['cat3']}
                        </button>
                        <button 
                            id="cat4" 
                            type="button" 
                            className={`ml-1 btn ${this.state.curCate === cateData['cat4'] ? 'active' : ''}`}
                            onClick = {this.changeCate}
                        >
                            {cateData['cat4']}
                        </button>
                    </div>
                    <div className="search-bar">
                        <input type="search" placeholder="검색" value={this.state.searchInput}
                            onChange={this.setSearchHandler} onKeyPress={this.handleKeyPress}/>
                            <span className='post-search-icon' onClick={this.setSearchContent} style={{cursor: 'pointer'}}> 
                                <FontAwesomeIcon icon={faMagnifyingGlass} /> 
                            </span>
                        {this.state.searchInput.length !== 0 &&
                            <button className="btn-clear" onClick={this.searchInputRemoveHandler}>
                                <FontAwesomeIcon className="removeIcon" icon={faCircleXmark} />
                            </button>
                        }    
                    </div>
                    <div className="mb-tb-wrap">
                        <div className="mb-tb-capt">
                            <span>
                                전체 글 목록
                            </span>
                            <span>
                                <Button size="sm" onClick={this.createPost}>
                                    글 작성
                                </Button>
                            </span>
                        </div>
                        <Table className="mb-tb" borderless>
                            <tbody>
                                { this.state.posts.map (
                                    post =>
                                    <>
                                        <tr onClick={() => this.readPost(post.no)}>
                                            <th scope="row" rowSpan={2}>
                                                사진
                                            </th>
                                            <td className="mb-tb-title">
                                                {post.title}
                                            </td>
                                            <td className="mb-tb-date" rowSpan={2}>
                                                {post.createdTime.substring(0, 10)}
                                            </td>
                                        </tr>
                                        <tr onClick={() => this.readPost(post.no)}>
                                            <td className="mb-tb-txt" dangerouslySetInnerHTML = {{ __html: post.text }} >
                                            </td>
                                        </tr>
                                    </>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </>
        );
    }
}

export default MyBlog;