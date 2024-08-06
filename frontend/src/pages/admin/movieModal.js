import React from 'react'
import { Modal, Form, Input, Row, Col, Select, DatePicker, Divider, Button, message } from 'antd'
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea'
import { AddMovies, UpdateMovie } from '../../api/movie';
import { showLoading, hideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';

function MovieModal({
    isModalOpen,
    setIsModalOpen,
    selectedMovie,
    setSelectedMovie,
    formType,
    setMovieFn
}) {

    const dispatch = useDispatch()

    const initialMovieValues = selectedMovie
    ? { ...selectedMovie, releaseDate: moment(selectedMovie.releaseDate).format("YYYY-MM-DD") }
    : {};

    const handleCancel = () => {
        setIsModalOpen(false)
        setSelectedMovie(null)
    }

    const handleSubmit = async (values) =>{
       // console.log("values -> ", values)
        try {
            dispatch(showLoading())
            let response = null
            if (formType === "add"){
                response = await AddMovies(values)
            }
            else if (formType === "edit"){
                response = await UpdateMovie({...values, movieId: selectedMovie._id})
            }

            
            if (response.success){
                message.success(response.message)
                setIsModalOpen(false)
            }
            else {
                message.error(response.message)
            }

            setSelectedMovie(null)
            dispatch(hideLoading())
        } catch (error) {
            dispatch(hideLoading())
            message.error(error.message)
        }
    }

  return (
    <>
        <Modal centered title={formType === "add" ? "Add Movie" : "Edit Movie"}
            open={isModalOpen}
            onCancel={handleCancel}
            width={'60%'}
            footer={null}
            >
            
            <Form layout='vertical' initialValues={initialMovieValues} className='px-5'
             onFinish={handleSubmit}>
                <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                    <Col span={12}>
                        <Form.Item label="Movie Poster (URL)" name="moviePoster" rules={[
                                {required: true, message: "Movie poster url is required"}
                            ]}>
                    
                            <Input type='text' placeholder='Enter the movie poster URL'></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Movie Title" name="movieTitle" rules={[
                            {required: true, message: "Movie title is required"}
                        ]}>
                  
                        <Input type='text' placeholder='Enter the movie title'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16}}>
                    <Col span={24}>
                        <Form.Item label="Description" name="description" rules={[
                            {required: true, message: "Movie description is required"}
                        ]}>
                  
                        <TextArea rows={4} placeholder='Enter the movie description'></TextArea>
                        </Form.Item>
                    </Col>                    
                </Row>
                <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16}}>
                    <Col span={12}>
                        <Form.Item label="Duration (in mins)" name="duration" rules={[
                            {required: true, message: "Movie duration is required"}
                        ]}>
                        <Input type='text' placeholder='Enter movie duration (in mins)'></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Genre" name="genre" rules={[
                            {required: true, message: "Genre is required"}
                        ]}>
                        <Select mode='multiple' options={[
                            {value: "Action", label: "Action"},
                            {value: "Adventure", label: "Adventure"},
                            {value: "Comedy", label: "Comedy"},
                            {value: "Romance", label: "Romance"},
                            {value: "Sci-Fi", label: "Sci-Fi"},
                            {value: "Fantasy", label: "Fantasy"},
                            {value: "Drama", label: "Drama"},
                            {value: "Mystery", label: "Mystery"},
                            {value: "Triller", label: "Triller"},
                            {value: "Horror", label: "Horror"},
                            {value: "Historical", label: "Historical"},
                            {value: "True Crime", label: "True Crime"},
                            {value: "Crime", label: "Crime"},
                            {value: "Documentary", label: "Documentary"}
                        ]}>

                        </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16}}>
                    <Col span={12}>
                        <Form.Item label="Language" name="language" rules={[
                            {required: true, message: "Language is required"}
                        ]}>
                        <Select placeholder="Select Movie Language"
                            options={[
                                {value: "English", label: "English"},
                                {value: "Hindi", label: "Hindi"},
                                {value: "Marathi", label: "Marathi"},
                                {value: "Tamil", label: "Tamil"},
                                {value: "Kannada", label: "Kannada"},
                                {value: "Malayalam ", label: "Malayalam"},
                                {value: "Korean ", label: "Koran"},
                                {value: "Japanese ", label: "Japanese"},
                                {value: "German ", label: "German"},
                                {value: "French ", label: "French"},
                            ]}>

                        </Select>
                        </Form.Item>
                    </Col>
                    
                    <Col span={12}>
                        <Form.Item label="Release Date" name="releaseDate" rules={[
                            {required: true, message: "Release date is required"}
                        ]}>

                            <Input type='date' />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider type='horizontal' />
                <Row className='d-flex justify-content-end'>
                    <Button type='primary' htmlType='submit' >
                        Submit
                    </Button>
                    <Divider type='vertical' />
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                </Row>
            </Form>
        </Modal>
    </>
  )
}

export default MovieModal