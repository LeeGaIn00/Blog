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

class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            posts: []
        }
		this.createPost = this.createPost.bind(this);
    }

    componentDidMount() {
        PostService.getAllPost().then((res) => {
            this.setState({ posts: res.data});
        });
    }

    createPost = () => {
        this.props.history.push("/create-post/")
    };

    /* 글 상세보기로 이동 */
    readPost(no) {
        /* 조회수 증가 */
        PostService.getPost(no);
        this.props.history.push(`/post-detail/${no}`);
    }

    render() {
        return (
            <div className="mb-main">
                <MyBlogHeader />
                <div className="search-bar">
                    <input type="search" placeholder="검색"/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="btn-search"/>
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
                            {
                                this.state.posts.map (
                                    post =>
                                    <>
                                        <tr onClick={() => this.readPost(post.id)}>
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
                                        <tr onClick={() => this.readPost(post.id)}>
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
        );
    }
}

export default MyBlog;