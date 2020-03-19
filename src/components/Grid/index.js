import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { useHistory } from 'react-router';
import './Grid.css';

import ReactCardFlip from 'react-card-flip';

// https://www.npmjs.com/package/react-masonry-css
function Grid({ data }) {
  const history = useHistory();

  const openDetailScreen = (name) => {
    console.log('name:', name)
    history.push('/' + name)
  }


  return (
    <Masonry
      breakpointCols={3}
      className="masonry-grid"
      columnClassName="masonry-grid_column">
      {data.map(({ uri, name }) => (
        <GridItem name={name} uri={uri} onClick={openDetailScreen} />
      ))}
    </Masonry>
  )
}

function GridItem({ name, uri, onClick }) {
  const [flipped, setFlipped] = useState(false);
  const [height, setHeight] = useState(false);

  const onLoad = ({ target: img }) => {
    setHeight(img.offsetHeight);
  }

  return (
    <div style={{ height }} className='grid-item-container' onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)} >
      <ReactCardFlip flipDirection='horizontal' isFlipped={flipped} >
        <img onLoad={onLoad} className='grid-image' src={uri} alt="img1" name={name} onClick={() => onClick(name)} />
        <BackCard name={name} height={height} />
      </ReactCardFlip>
    </div>
  );
}

function BackCard({ name, height }) {
  const [loading, setLoading] = useState(true);
  const [placeData, setPlaceData] = useState([]);

  let expectedResults = Number.parseInt(height / 30);
  expectedResults = expectedResults > 18 ? 18 : expectedResults;

  useEffect(() => {
    getPlace(name);
  }, [name])

  const getPlace = async name => {
    const parseName = name.split(' ').join('+');

    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=top+cities+in+${parseName}&language=en&key=AIzaSyCIgN9ldGaq_O6BXoIcrVh0ZNtqFnnP2l4`);
    const responseJson = await response.json();
    const { results } = responseJson;
    const placeNames = results.map(({ formatted_address }) => formatted_address)

    setLoading(false);
    setPlaceData(placeNames);

  };

  const placeMap = placeData.slice(0, expectedResults).map((place) => (
    <span key={place}>
      {place}
    </span>
  ))

  let content = <span>Loading...</span>;

  if (!loading) {
    content = placeMap;
  }

  return (
    <div style={{ height }} className='back-card-root'>
      <div className='places-container'>
      {content}
      </div>
    </div>
  );
}



export default Grid; 