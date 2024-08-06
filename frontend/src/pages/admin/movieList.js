import React, { useEffect, useState } from 'react'
import { Table, Divider, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setMovies } from '../../redux/movieSlice'
import { showLoading, hideLoading } from '../../redux/loaderSlice'
import { GetAllMovies } from '../../api/movie'
import moment from 'moment'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import MovieModal from './movieModal'
import DeleteMovieModal from './deleteMovieModal'

function MovieList() {
    
    //state defination
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [formType, setFormType] = useState("add")

    const movies = useSelector(state => state.movies)

    const dispatch = useDispatch()

    const setMoviesFn = async() => {
        try {
          dispatch(showLoading(true))
          const response = await GetAllMovies()
          
          dispatch(setMovies(response))
          dispatch(hideLoading(true))
        } catch (error) {
          console.log(error)
        }
      }
    useEffect(() => {
        setMoviesFn()
    },[])

    console.log("Movies => ", movies.movies.movie)

    const tableHeading = [
        {
            title: "Poster",
            dataIndex: "moviePoster",
            render: (text, data) => {
                return (
                    <img width="85" height="115" style={{objectFit: 'cover'}} src={data.moviePoster} />
                )
            },
            align: "center"
        },
        {
            title: "Movie Title",
            dataIndex: "movieTitle",
            className: "text-color-red"
        },
        {
            title: "Description",
            dataIndex: "description",
            width: "30%"
        },
        {
            title: "Duration",
            dataIndex: "duration",
            render: (text, data) => {
                return (
                    `${text} mins`
                )
            }
        },
        {
            title: "Language",
            dataIndex: "language"
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render: (text, data) => {
                return moment(data.releaseDate).format("DD-MM-YYYY")
            }
        },
        {
            title: "Action",
            render: (text, data) => {
                return (
                    <div>
                        <Button onClick={() => {
                            setIsModalOpen(true)
                            setSelectedMovie(data)
                            setFormType("edit")
                        }}>
                            <EditOutlined />
                        </Button>
                        <Divider type='vertical' />
                        <Button danger onClick={() => {
                            setIsDeleteModalOpen(true)
                            setSelectedMovie(data)
                        }}>
                            <DeleteOutlined />
                        </Button>
                    </div>
                )
            }
        }
    ]

    
  return (
    <div>
        <div className='d-flex justify-content-end'>
            <Button type='primary' onClick={() => {
                setIsModalOpen(true)
                setFormType("add")
            }}><span><PlusOutlined /></span> Add Movie</Button>
        </div>
        <Divider type='horizontal' />
        <Table dataSource={movies.movies.movie} columns={tableHeading}></Table>

        {
            isModalOpen && (
                <MovieModal 
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    formType={formType}
                    setMovieFn={setMoviesFn}/>
            )
        }

        {
            isDeleteModalOpen && (
                <DeleteMovieModal 
                    isDeleteModalOpen={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    />
            ) 
        }
    </div>
    
  )
}

export default MovieList