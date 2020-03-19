import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function DetailScreen() {
    const { word } = useParams();
    useEffect(() => {
        getPlace(word)
    }, [word])

    const getPlace = async name => {
        const parseName = name.split(' ').join('+');

        const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=top+cities+in+${parseName}&language=en&key=AIzaSyCIgN9ldGaq_O6BXoIcrVh0ZNtqFnnP2l4`);
        const responseJson = await response.json();
        const { results } = responseJson;
        const placeNames = results.map(({ formatted_address }) => formatted_address)

        setLoading(false);
        setPlaceData(placeNames);

    };

    const [loading, setLoading] = useState(true);
    const [placeData, setPlaceData] = useState([])

    if (loading) {
        return <span><h3>Loading...</h3></span>
    }


    const placeMap = placeData.map((place) => (
        <h4 key={place}>
            {place}
        </h4>

    ))

    console.log(placeMap)

    return (
        <div >
            <span>
                {placeMap}
            </span>
        </div>

    )
}

export default DetailScreen;