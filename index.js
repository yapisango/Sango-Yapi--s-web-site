import React from 'react';
import ReactDOM from 'react-dom';

const { useState, useEffect, useRef } = React;
const clientID = "t-FQWYk2PUt13LidWIblzu7SNd9HVOQsK3QA7Lg1Mg4";
const utm = "?utm_source=scrimba_degree&utm_medium=referral";
const numberOfPhotos = 20;

const loadData = (options) => {
    fetch(options.url)
        .then((response) => response.json())
        .then((data) => {
            if (options.onSuccess) options.onSuccess(data);
        });
};

const App = (props) => {
    const [photos, setPhotos] = useState([]);
    const [query, setQuery] = useState("scientists");
    const queryInput = useRef(null);
    const url = `https://api.unsplash.com/photos/random/?count=${numberOfPhotos}&client_id=${clientID}`;

    useEffect(() => {
        const photosUrl = query ? `${url}&query=${query}` : url;

        loadData({
            url: photosUrl,
            onSuccess: (res) => {
                setPhotos(res);
            },
        });
    }, [query, url]);

    const searchPhotos = (e) => {
        e.preventDefault();
        setQuery(queryInput.current.value);
    };

    return (
        <div className="box">
            <h2>{props.emoji}</h2>
            <h1>{props.name}'s website</h1>
            <form onSubmit={searchPhotos}>
                <input ref={queryInput} type="text" placeholder="Search for photos" />
                <button type="submit">Search</button>
            </form>
            <div className="grid">
                {query && photos.map((photo) => (
                    <div key={photo.id} className="item">
                        <img className="img" src={photo.urls.regular} alt={photo.description} />
                        <div className="caption">
                            <span className="credits">
                                Photo by 
                                <a href={`${photo.user.links.html}${utm}`}> {photo.user.name}</a>
                                <span> on </span>
                                <a href={`https://unsplash.com${utm}`}>Unsplash</a>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App name="Sango Yapi" emoji="🧛‍♂️" />, document.getElementById("root"));

