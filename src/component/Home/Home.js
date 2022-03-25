import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css';
import { Input, Space } from 'antd';

const BASE_URL_API_ENGLISH = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const { Search } = Input;

const Home = (props) => {


    const [word, setWord] = useState("hello");
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [data, setData] = useState([])

    const getData = () => {
        setLoading(true);
        let url = BASE_URL_API_ENGLISH + word;
        axios.get(url)
            .then(res => res.data)
            .then(json => {
                setData(json)
                console.log(json)
                setError("")
            })
            .catch(err => {
                console.log(err)
                setError("An error occurred, please check input")
            })
        setLoading(false);
    }

    const getDataWord = () => {
        getData()
    }

    const onChangeInput = (e) => {
        setWord(e.target.value);
    }

    useEffect(() => {
        getData()
    }, [])


    const startAudio = (url) => {
        console.log("url", url);
        let audio = new Audio(url)
        audio.play()
    }

    return (
        <div>
            <h1>NDV DICTIONARY WITH API</h1>
            <Search placeholder="Enter your word" enterButton loading={isLoading} onChange={onChangeInput} value={word} onPressEnter={() => getDataWord()} />
            {
                error ?
                    <span className="text-error">{error}</span>
                    :
                    isLoading || data.length < 1 ?
                        <span>Loading...</span> :
                        <div className="body-content">
                            {console.log("hahalo", data)}
                            <span className="text-success">{data?.[0].word}</span>
                            <h3>{data.length > 0 ? data[0].meanings.map((el, index) => <i dataIndex={index}>{el.partOfSpeech}, </i>) : null}</h3>
                            <span style={{display: "flex"}}>{
                                data.length > 0 ? data[0].phonetics.map((value, index) => {
                                    return (
                                        <span key="index" style={{ display: "flex", }}>
                                            {value.audio ?
                                                <button key={index} onClick={() => startAudio(value.audio)}>ok</button>
                                                : "[]"
                                            }
                                            {value.text ? value.text : "//"}
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                        </span>
                                    )
                                }) : null
                            }
                            </span>
                            <span className="text-example">Example</span>
                            <ul style={{textAlign: 'left'}}>{data.length > 0 ? data[0].meanings.map((el, index) => <li className={index} key={index}>{el.definitions[0].definition}</li>) : null}</ul>
                        </div>
            }


        </div >
    )
}

export default Home