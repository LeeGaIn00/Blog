import React, { useContext, useState, useEffect } from 'react';
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

import AuthContext from '../service/AuthContext';

const cateData = {
    cat0 : '전체',
    cat1 : '일상',
    cat2 : '여행',
    cat3 : '취미',
    cat4 : '게임'
}

let selectCate;

const MyBlog = (props) => {
    const [searchClick, setSearchClick] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [orgs, setOrgs] = useState([]);
    const [profile, setProfile] = useState('');
    const [posts, setPosts] = useState([]);
    const [orgPosts, setOrgPosts] = useState([]);
    const [curCate, setCurCate] = useState('cat0');
    const id = props.match.params.id;
    const authCtx = useContext(AuthContext);
    const isLogin = authCtx.isLoggedIn;

    useEffect(() => {
        // member 별로 curCate 구분하기 위해 id 붙여서 session에 저장
        selectCate = sessionStorage.getItem("curCate"+"_"+id) === null ? cateData['cat0'] : JSON.parse(sessionStorage.getItem("curCate"+"_"+id));
        
        PostService.getAllPost(id, selectCate).then((res) => {
            setPosts(res.data);
            setOrgPosts(res.data);
            setCurCate(selectCate);
        });
        // if(authCtx.isLoggedIn) {
        //     authCtx.getUser();
        //     if(authCtx.user.id === id) {
        //         setIsMe(true)
        //     } else {
        //         setIsMe(false);
        //     }
        // } else {
        //     setIsMe(false);
        // }
    }, []);

    useEffect(() => {
        if(isLogin) {
            authCtx.getUser();
            console.log(authCtx.user.id);
        }
    }, [isLogin]);

     /* input 창에 onChange 이벤트 */
    const setSearchHandler = (e) => {
        setSearchInput(e.target.value);
    }

    /* enter 입력 시 글 제목과 검색 결과 비교 & 필터링 */
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            {searchInput.startsWith("#") ? 
            // Tag 검색
            PostService.getSearchPostByTag(id, curCate, searchInput.substring(1)).then((res) => {
                setPosts(res.data);
            })
            : PostService.getSearchPost(id, curCate, searchInput).then((res) => {
                setPosts(res.data);
           }); } 
        }
    };

    /* 찾기 버튼 클릭 시 글 제목과 검색 결과 비교 & 필터링 */
    const setSearchContent = (e) => { 
        {searchInput.startsWith("#") ? 
            // Tag 검색
            PostService.getSearchPostByTag(id, curCate, searchInput.substring(1)).then((res) => {
                setPosts(res.data);
            })
            : PostService.getSearchPost(id, curCate, searchInput).then((res) => {
                setPosts(res.data);
           });
        }
    }

    const searchInputRemoveHandler = (e) => {
        setSearchInput('');
        setPosts(orgPosts);
    }

    const createPost = () => {
        props.history.push({
            pathname: "/create-post/_create",
            state: {id: id}
        })
    };

    /* 글 상세보기로 이동 */
    const readPost = (no) => {
        /* 조회수 증가 */
        // PostService.getPost(no);
        props.history.push({
            pathname: `/post-detail/${no}`,
            state: {id: id}
        });
    }

     /* 카테고리 onClick 이벤트. 카테고리 변경 및 sessionStorage에 state 저장 */
    const changeCate = (e) => {
        setCurCate(e.target.textContent);
        setSearchInput('');
        PostService.getAllPost(id, e.target.textContent).then((res) => {
            setPosts(res.data);
            setOrgPosts(res.data);
            //setCurCate(e.target.textContent)
        });
        sessionStorage.setItem("curCate"+"_"+id, JSON.stringify(e.target.textContent));
    };

    // 글 목록 미리보기에서 이미지를 제외한 텍스트만 보여지도록 가공
    const textHandler = (text) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, 'text/html');
        return doc.getElementsByTagName('p')[0].textContent;
    }


    return (
        <>
            <MyBlogHeader id={id} />
            <div className="mb-main">
                <div className="mb-cate">
                    <button 
                        id="cat0" 
                        type="button" 
                        className={`ml-1 btn ${curCate === cateData['cat0'] ? 'active' : ''}`}
                        onClick = {changeCate}
                    >
                        {cateData['cat0']}
                    </button>
                    <button 
                        id="cat1" 
                        type="button" 
                        className={`ml-1 btn ${curCate === cateData['cat1'] ? 'active' : ''}`}
                        onClick = {changeCate}
                    >
                        {cateData['cat1']}
                    </button>
                    <button 
                        id="cat2" 
                        type="button" 
                        className={`ml-1 btn ${curCate === cateData['cat2'] ? 'active' : ''}`}
                        onClick = {changeCate}
                    >
                        {cateData['cat2']}
                    </button>
                    <button 
                        id="cat3" 
                        type="button" 
                        className={`ml-1 btn ${curCate === cateData['cat3'] ? 'active' : ''}`}
                        onClick = {changeCate}
                    >
                        {cateData['cat3']}
                    </button>
                    <button 
                        id="cat4" 
                        type="button" 
                        className={`ml-1 btn ${curCate === cateData['cat4'] ? 'active' : ''}`}
                        onClick = {changeCate}
                    >
                        {cateData['cat4']}
                    </button>
                </div>
                <div className="search-bar">
                    <input type="search" placeholder="검색" value={searchInput}
                        onChange={setSearchHandler} onKeyPress={handleKeyPress}/>
                    <span className='post-search-icon' onClick={setSearchContent} style={{cursor: 'pointer'}}> 
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> 
                    </span>
                    {searchInput.length !== 0 &&
                        <button className="btn-clear" onClick={searchInputRemoveHandler}>
                            <FontAwesomeIcon className="removeIcon" icon={faCircleXmark} />
                        </button> 
                    }    
                </div>
                <div className="mb-tb-wrap">
                    <div className="mb-tb-capt">
                        <span>
                            전체 글 목록
                        </span>
                        {
                        (isLogin && authCtx.user.id === id) &&
                            <span>
                                <Button size="sm" onClick={createPost}>
                                    글 작성
                                </Button>
                            </span>
                        }
                    </div>
                    <Table className="mb-tb" borderless>
                        <tbody>
                            { posts.map (
                                post =>
                                <>
                                {post.thumbnail != null ?
                                    <tr onClick={() => readPost(post.no)}>
                                        <th scope="row" rowSpan={2}>
                                            <img src={`${process.env.PUBLIC_URL}${post.thumbnail}`}/> 
                                        </th>
                                        <td className="mb-tb-title">
                                            {post.title}
                                        </td>
                                        <td className="mb-tb-date" rowSpan={2}>
                                            {post.createdTime.substring(0, 10)}
                                        </td>
                                    </tr> :
                                        <tr onClick={() => readPost(post.no)}>
                                        <td className="mb-tb-title">
                                            {post.title}
                                        </td>
                                        <td></td>
                                        <td className="mb-tb-date" rowSpan={2}>
                                            {post.createdTime.substring(0, 10)}
                                        </td>
                                    </tr>  }
                                {post.thumbnail != null ? 
                                    <tr onClick={() => readPost(post.no)}>
                                        <td className="mb-tb-txt"  dangerouslySetInnerHTML = {{ __html: textHandler(post.text) }}>
                                        </td>
                                    </tr> :
                                    <tr onClick={() => readPost(post.no)}>
                                        <td className="mb-tb-txt"  dangerouslySetInnerHTML = {{ __html: textHandler(post.text) }} colSpan={2}>
                                        </td>
                                    </tr> }
                                </>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default MyBlog;