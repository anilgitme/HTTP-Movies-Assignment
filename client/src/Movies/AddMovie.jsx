import React, { useState } from 'react';
import axios from 'axios';

const initialValues = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: '',
}
const AddMovie = () => {
    const [formData, setFormData] = useState(initialValues);

    const changeHandler = event => {
        event.preventDefault();
        setFormData({...formData, [event.target.name]: event.target.value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMovieData = {
            ...formData, stars: formData.stars.split(',')
        };

        axios.post('http://localhost:5000/api/movies', newMovieData)
        .then((result) => console.log(result))
        .catch((error) => console.log('error posting', error.message))
    };

    return(
        <div>
        <form onSubmit={handleSubmit}>
        <label>Title</label>
        <div>
            <input type='text' name='title' placeholder='title'
            value={formData.title} onChange={changeHandler} />
        </div>

        <label>Director</label>
        <div>
            <input type='text' name='director' placeholder='director'
            value={formData.director} onChange={changeHandler} />
        </div>

        <label>Metascore</label>
        <div>
            <input type='text' name='metascore' placeholder='meta'
            value={formData.metascore} onChange={changeHandler} />
        </div>

        <label>Stars</label>
        <div>
            <input type='text' name='stars' placeholder='stars'
            value={formData.stars} onChange={changeHandler} />
        </div>
        <button>Add Movie</button>
    </form>
    </div>

    )
}
export default AddMovie;