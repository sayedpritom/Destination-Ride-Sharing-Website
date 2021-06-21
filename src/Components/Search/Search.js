import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Search.css';
import fakeData from '../FakeData/FakeData';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const { category } = useParams()
    const [vehicles, setVehicles] = useState();

    useEffect(() => {
        const newVehicles = fakeData.filter(data => data.category === category);
        setVehicles(newVehicles);
    }, [])

    const [search, setSearch] = useState(false);
    const [destination, setDestination] = useState({ from: '', to: '' });

    const handleBlur = e => {
        e.target.name === 'from' ? setDestination({ ...destination, from: e.target.value }) : setDestination({ ...destination, to: e.target.value })
    }

    const handleSearch = (e) => {
        console.log(destination);
        setSearch(true)
        e.preventDefault()
    }
    return (
        <div className="search">
            {
                search === false ?
                    <div className="search-form-container">
                        <form onSubmit={handleSearch}>
                            <p>Pick From</p>
                            <input type="text" name="from" onBlur={handleBlur} required placeholder="Type your location" />
                            <p>Pick To</p>
                            <input type="text" name="to" onBlur={handleBlur} required placeholder="Type your destination" /> <br />
                            <p>Pick Time</p>
                            <input type="time" id="appt" name="appt"></input>
                            <p>Pick Date</p>
                            <input type="date" id="birthday" name="birthday"></input>
                            <input type="submit" value="Search" />
                        </form>
                    </div>
                    :
                    <div className="search-result-container">

                        <div className="d-flex`">
                            <div id="from-to-line"></div>
                            <div>
                                <p>{destination.from}</p>
                                <p>{destination.to}</p>
                            </div>
                        </div>
                        {vehicles.map(vehicle =>
                            <div className="vehicles">
                                <div className="vehicles-Image"><img src={vehicle.image} alt="" /></div>
                                <h6>{vehicle.category.charAt(0).toUpperCase() + vehicle.category.slice(1)}</h6>
                                <div className="d-flex"><FontAwesomeIcon className="passengerIcon" icon={faUserFriends} /><h6>{vehicle.seat}</h6></div>
                                <h6>${vehicle.price}</h6>
                            </div>
                        )}

                    </div>
            }
            <div className="map">
                <iframe width="900" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=900&amp;height=600&amp;hl=en&amp;q=%20Dhaka+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='http://www.counter-zaehler.de'>besucher counter</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=664a6ce7caceb938169480d719e9ac094c9b589d'></script>
            </div>
        </div>
    );
};

export default Search;