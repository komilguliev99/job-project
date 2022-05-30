import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Filter } from '../../components/Filter'
import { IPost } from '../../store/posts/index.typing'
import { Post } from '../../components/Post'
import './index.scss'
import { Pagination } from '../../components/Pagination'
import { Select } from '../../components/Select'
import { Modal } from '../../components/Modal'
import { PostDetail } from '../../components/PostDetail'
import { Badge } from '../../components/Badge'

interface IPostsProps {
  posts?: IPost[];
  tags?: string[];
}

interface IPostsState {
  selectedPerPageIdx: number;
  currPage: number;
  options: number[];
  posts: IPost[];
  showDetailIdx: number;
  selectedTags: Record<number, boolean>;
  selectedTagNames: string[];
  isTagSelected: Record<string, boolean>;
  searchText: string;
}

class Posts extends Component<IPostsProps, IPostsState> {
  constructor (props: IPostsProps) {
    super(props)
    this.state = {
      selectedPerPageIdx: 0,
      selectedTags: {},
      selectedTagNames: [],
      currPage: 1,
      options: [10, 20, 50],
      posts: props.posts || [],
      showDetailIdx: -1,
      searchText: '',
      isTagSelected: {}
    }

    this.setPage = this.setPage.bind(this)
    this.selectOnChange = this.selectOnChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.postSelected = this.postSelected.bind(this)
    this.hidePost = this.hidePost.bind(this)
    this.tagsChange = this.tagsChange.bind(this)
    this.badgeClick = this.badgeClick.bind(this)
  }

  postSelected (showDetailIdx: number) {
    this.setState({ showDetailIdx })
  }

  getPosts (posts: IPost[]) {
    const { currPage, selectedPerPageIdx, options } = this.state
    const perPage = options[selectedPerPageIdx]
    const start = (currPage - 1) * perPage
    const end = start + perPage
    return posts.slice(start, end).map((item, idx) => {
      return (
        <div key={item.title} className="col-lg-3 col-md-4 col-sm-6 mb-4">
           <Post
            title={item.title}
            tag={item.tag}
            body={item.body}
            index={idx}
            onClick={this.postSelected} />
        </div>
      )
    })
  }

  setPage (page: number) {
    this.setState({ currPage: page })
  }

  selectOnChange (selectedPerPageIdx: number) {
    this.setState({ selectedPerPageIdx, currPage: 1 })
  }

  tagsChange (selectedIdx: number) {
    this.setState((prev, props) => {
      const { selectedTags } = prev as IPostsState
      const { tags, posts } = props
      selectedTags[selectedIdx] = !selectedTags[selectedIdx]
      let oneOrMoreSelected = false
      const isTagSelected = Object.keys(selectedTags).reduce<any>((acc: any, val: string) => {
        const key = parseInt(val)
        if (selectedTags[key] && tags) {
          oneOrMoreSelected = true
          acc[tags[key]] = true
        }
        return acc
      }, {})
      const newState: any = { selectedTags }
      if (posts && oneOrMoreSelected) {
        newState.selectedTagNames = Object.keys(isTagSelected)
      } else {
        newState.selectedTagNames = []
      }
      newState.isTagSelected = isTagSelected
      return newState
    })
  }

  badgeClick (tag: string) {
    this.setState((prev, props) => {
      let { selectedTags, selectedTagNames, isTagSelected } = prev
      const { tags } = props
      selectedTagNames = selectedTagNames.filter(item => item !== tag)
      if (tags) {
        selectedTags[tags.findIndex(item => item === tag)] = false
      }
      isTagSelected[tag] = false
      return ({ selectedTags, selectedTagNames, isTagSelected })
    })
  }

  onSearch (searchText: string) {
    this.setState({ searchText })
  }

  hidePost () {
    this.setState({ showDetailIdx: -1 })
  }

  getModal () {
    const { showDetailIdx, posts } = this.state
    if (showDetailIdx <= -1) return null
    const post = posts[showDetailIdx]
    return (
            <Modal hidePost={this.hidePost}>
                <PostDetail title={post.title} body={post.body} />
            </Modal>
    )
  }

  render () {
    const {
      selectedPerPageIdx,
      searchText,
      currPage,
      options,
      selectedTags,
      isTagSelected,
      selectedTagNames
    } = this.state
    let { posts } = this.props
    const perPage = options[selectedPerPageIdx]
    const selectedObj = { [selectedPerPageIdx]: true }

    if (selectedTagNames.length > 0 && posts) {
      posts = posts.filter(item => isTagSelected[item.tag])
    }
    if (searchText && posts) {
      posts = posts.filter(post => post.title.includes(searchText))
    }
    return (
            <div className="Posts">
                <h1 className="Posts__title" >Posts</h1>
                <hr />
                <Filter onSearch={this.onSearch}>
                    <div className="d-flex">
                      <Select
                        multiSelect
                        label="Tags"
                        options={this.props.tags as string[]}
                        selected={selectedTags}
                        onChange={this.tagsChange} />
                      <Select
                        label="Show by"
                        options={options}
                        selected={selectedObj}
                        onChange={this.selectOnChange} />
                    </div>
                </Filter>
                <div className="Posts__badges">
                  { selectedTagNames.map(tag => (
                    <Badge key={tag} label={tag} onClick={this.badgeClick} />)) }
                </div>
                <div className="row">
                    { this.getPosts(posts || []) }
                </div>
                <Pagination
                    perPage={perPage}
                    currPage={currPage}
                    total={ (posts && posts.length > 0 && posts.length) || 0}
                    setPage={this.setPage}
                />
                { this.getModal() }
            </div>
    )
  }
}

function MapStateToProps (state: any) {
  return {
    posts: state.posts.data,
    tags: state.posts.tags
  }
}

export default connect(MapStateToProps, null)(Posts)
