import React from 'react'
import Grid from 'material-ui/Grid'
import PostPreview from '../PostPreview'

class ListView extends React.Component {
  state = {
    loadingFinished: false
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleOnScroll)

  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    if (scrolledToBottom) {
      if (this.props.posts.pageInfo.hasNextPage)
      {
        this.props.onLoadMore()
        this.setState({loadingFinished: false})
      }
      else this.setState({loadingFinished: true})
    }
  }

  render () {
    if (!this.props.posts && this.props.loading) return <div>Loading....</div>

    return (
      <div>
        <Grid container justify='center'>
          <Grid item xs={12} sm={8} md={6}>
            {this.props.posts.edges.map(post => (
              <PostPreview
                view='card'
                key={post.node.slug}
                slug={post.node.slug}
                date={post.node.date}
                imageURL={
                  post.node.featuredImage && post.node.featuredImage.sourceUrl
                }
                title={post.node.title}
                category={post.node.categories.edges[0].node.name}
                content={post.node.content}
              />
            ))}
          </Grid>
        </Grid>
        {(this.props.loading) && <h2>Loading...</h2>}
        {!this.state.loadingFinished && <a href={'#'} onClick={this.props.onLoadMore}>Load more</a>}
      </div>
    )
  }
}

export default ListView
