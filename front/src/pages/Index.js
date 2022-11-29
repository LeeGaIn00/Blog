import React, { Component } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// styles
import "../assets/scss/index.scss"

// components
import MyBlogHeader from "../components/MyBlogHeader";

class Index extends Component {
      constructor(props) {
        super(props);
        this.state = { 
            serchClick:false,
            searchInput:''
        }
    }

    componentDidMount() {
      
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
        }
    };

    /* 찾기 버튼 클릭 시 글 제목과 검색 결과 비교 & 필터링 */
    setSearchContent = (e) => { 
        
    }

    searchInputRemoveHandler = (e) => {
        this.setState({
            searchInput:'',
            posts:this.state.orgPosts
        })
    }

    render() {
      return (
        
        <div className="main-wrapper">
          <MyBlogHeader id={this.state.id} />
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
        </div>
      );
    }
  }
  
  export default Index;