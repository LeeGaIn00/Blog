import React, { Component } from "react";
import { Table } from 'reactstrap';

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// styles
import "../assets/scss/index.scss"

// components
import HeaderNav from "../components/HeaderNavs"; 
import MemberService from "../service/MemberService";

class Index extends Component {
      constructor(props) {
        super(props);
        this.state = { 
            members: [],
            serchClick: false,
            searchInput: '',
            orgMembers: [],
            isLoading: true
        }
    }

    componentDidMount() {
      // category관련 sessionStorage 삭제
      Object.keys(sessionStorage).filter(x => 
        { sessionStorage.key(x).startsWith('curCate') &&
        sessionStorage.removeItem(x) }
      );

      MemberService.getAllMember().then((res) => {
        this.setState({
          members: res.data,
          orgMembers: res.data,
          isLoading: false
        })
      });
    }

    /* Blog 불러오기 */
    readBlog = (id) => {
      this.props.history.push({
        pathname: `/blog/${id}`,
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
        if (e.key === "Enter"  ) {
          // 검색어가 입력되지 않았을 경우
          if(this.state.searchInput.length < 1) alert('검색어를 입력하세요.')
          else {
            MemberService.getSearchMember(this.state.searchInput).then((res) => {
              this.setState({
                members: res.data
              })
            });
          }
        }
    };

    /* 찾기 버튼 클릭 시 글 제목과 검색 결과 비교 & 필터링 */
    setSearchContent = (e) => { 
      // 검색어가 입력되지 않았을 경우
      if(this.state.searchInput.length < 1) alert('검색어를 입력하세요.')
      else {
        MemberService.getSearchMember(this.state.searchInput).then((res) => {
          this.setState({
            members: res.data
          })
        });
      }
    }

    searchInputRemoveHandler = (e) => {
        this.setState({
            searchInput:'',
            members: this.state.orgMembers
        })
    }

    render() {
      return (
        <div className="main-wrapper">
          <HeaderNav id={this.state.id} />
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
          <div className="index-tb-wrap">
            <div className="index-tb-capt">
              <span> 모든 블로그 </span>  
            </div>
            <Table className="index-tb" borderless>
              { !this.state.isLoading & this.state.members.length === 0 ?
                  <div className="index-noresult"> 검색 결과가 없습니다. </div>
              : <tbody>
                    { this.state.members.map (
                      member =>
                      <>
                        <tr onClick={() => this.readBlog(member.id)}>
                            <th scope="row" rowSpan={2}>
                            <img
                              className="profile"
                              alt="profile"
                              src={`${process.env.PUBLIC_URL}/img/${member.profile}`} 
                            />
                            </th>
                        </tr>
                        <tr onClick={() => this.readBlog(member.id)}>
                        <td className="index-tb-title">
                                {member.id}의 블로그
                            </td>
                        </tr>
                      </>
                    )
                  }
                </tbody>
              }
            </Table>
          </div>
        </div>
      );
    }
  }
  
  export default Index;