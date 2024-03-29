import React from 'react'
import { graphql } from 'react-apollo'
import { getAllPosts, getMorePosts } from '../graphql/queries/posts'
import Layout from '../components/Layout/index'
import Loader from '../components/Loader'
import GridRenderer from '../components/GridTypes/GridRenderer'
import { Helmet } from 'react-helmet'
import Error from '../components/Error'

const Home = ({ data, viewtype, searchposts }) => {

  return (
    <Layout>
      <RenderHome data={data} viewtype={viewtype} searchposts={searchposts}/>
      <span/>
    </Layout>
  )
}

const RenderHome = ({ data, viewtype, searchposts }) => {
  const posts = searchposts || data.posts
  return (
    <div>
      <Helmet>
        <title>Home | Bulletin - Franciscan University of Steubenville</title>
      </Helmet>
      {!data.error && !posts && <Loader />}
      {data.error && <Error error={data.error.message} />}
      {posts && <GridRenderer posts={posts} viewtype={viewtype} query={getAllPosts} />}
    </div>
  )
}

export default graphql(getAllPosts)(Home)
