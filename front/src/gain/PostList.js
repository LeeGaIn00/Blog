import React, { Component } from 'react';
import Service from './service.js';


class PostList extends Component {
    constructor(props) {
        super(props);

        this.state ={
            posts: []
        }
    }
    componentDidMount() {
        Service.getAllPost().then(res => {
            this.setState({ posts: res.data });
        })
    }

    /* 글 상세보기로 이동 */
    readPost(no) {
    /* 조회수 증가 */
        Service.getPost(no);
        this.props.history.push(`/post-detail/${no}`);
    }

    render() {
        return (
            <>
                <div>
                    <div className="postList-wrap">
                        <table className="community-pl-tb table">
                        {/* <table className="community-pl-tb table">
                            <thead className="community-pl-thead">
                                <tr>
                                    <th scope="col" style={{ width: "8%" }}>번호</th>
                                    <th scope="col" style={{ width: "60%" }}>제목</th>
                                    <th scope="col" style={{ width: "10%" }}>작성자</th>
                                    <th scope="col" style={{ width: "10%" }}>작성일</th>
                                    <th scope="col" style={{ width: "6%" }}>조회수</th>
                                </tr>
                            </thead> */}
                            <tbody className="postList">
                                {
                                    this.state.posts.map(
                                        post =>
                                        <tr key={post.id}>
                                            <td>{post.id}</td>
                                            <td className="postList-title" onClick={() => this.readPost(post.id)}>{post.title}</td>
                                            <td>{post.memberId}</td>
                                            <td>{post.createTime}</td>
                                            <td>{post.views}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default PostList;