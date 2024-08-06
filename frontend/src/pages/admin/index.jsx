import React from 'react'
import { Tabs } from 'antd'
import MovieList from './movieList'
import AdminTheaterList from './adminTheaterList'

function Admin() {

    const tabItems = [
        {
            key: 1,
            label: "Movies",
            children: <MovieList />
        },
        {
            key: 2,
            label: "Theaters",
            children: <AdminTheaterList />
        }
    ]
  return (
    <>
      <div>
        <Tabs defaultActiveKey='1' items={tabItems}></Tabs>
      </div>
    </>
  )
}

export default Admin