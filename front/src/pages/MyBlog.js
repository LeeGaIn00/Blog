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
            orgPosts: []
        }
		this.createPost = this.createPost.bind(this);
    }

    componentDidMount() {
        PostService.getAllPost(this.state.id).then((res) => {
            this.setState({ 
                posts: res.data,
                orgPosts: res.data  
            });
        });
    }

    /* input 창에 onChange 이벤트 */
    setSearchHandler = (e) => {
        this.setState({
            searchInput:e.target.value
        })
    }

    /* enter 입력 시 글 제목과 검색 결과 비교 & 필터링 */
    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            {this.state.searchInput.startsWith("#") ? 
            // Tag 검색
            PostService.getSearchPostByTag(this.state.searchInput.substring(1)).then((res) => {
                this.setState({
                    posts: res.data
                })
            })
            : PostService.getSearchPost(this.state.searchInput).then((res) => {
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
            PostService.getSearchPostByTag(this.state.searchInput.substring(1)).then((res) => {
                this.setState({
                    posts: res.data
                })
            })
            : PostService.getSearchPost(this.state.searchInput).then((res) => {
                this.setState({
                    posts: res.data
                })
           });
        }
    }

    searchInputRemoveHandler = (e) => {
        this.setState({
            searchInput:'',
            posts:this.state.orgPosts
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

    render() {
        return (
            <>
                <MyBlogHeader id={this.state.id} />
                <div className="mb-main">
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