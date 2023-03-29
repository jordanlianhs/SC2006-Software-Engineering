import { useState, useEffect } from "react";
import getResaleFlats from "../../data/comparePricing";

const ComparePricing = () => {
    const [flats, setFlats] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFlats, setSelectedFlats] = useState([]);

    useEffect(() => {
        const fetchFlats = async () => {
            const data = await getResaleFlats();
            setFlats(data);
        };
        fetchFlats();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSelect = (flat) => {
        if (selectedFlats.length < 2) {
            setSelectedFlats([...selectedFlats, flat]);
        }
    };

    const handleRemove = (flat) => {
        const newSelectedFlats = selectedFlats.filter((selectedFlat) => selectedFlat.id !== flat.id);
        setSelectedFlats(newSelectedFlats);
    };

    // Filter flats based on searchQuery and whether the searchQuery is empty or not
    const filteredFlats = flats.filter((flat) =>
        flat.streetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flat.flatType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flat.blockNumber.toLowerCase().includes(searchQuery.toLowerCase())
    ).filter((flat) => searchQuery.length > 0);

    return (
        <>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by street name or flat type"
                />
            </div>
            <div>
                {filteredFlats.map((flat) => (
                    <li
                        className="list-inline-item"
                        key={flat.id}
                        onClick={() => handleSelect(flat)}
                    >
                        <ul className="mc_child_list two text-center">
                            <li>
                                <div className="membership_header">
                                    <div className="thumb">
                                        <a href="#">
                                            <span className="flaticon-close"></span>
                                        </a>
                                        <img
                                            className="img-fluid w100"
                                            src={flat.img}
                                            alt="1.jpg"
                                        />
                                        <div className="price">
                                            ${flat.price}
                                        </div>
                                    </div>
                                    <div className="flat_type">
                                        <h4>{flat.streetName}</h4>
                                        <p>BLK {flat.blockNumber}</p>
                                        <p>{flat.flatType}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                ))}
            </div>
            {searchQuery.length === 0 && selectedFlats.length === 0 ? null : (
                <div>
                    {selectedFlats.map((flat) => (
                        <div key={flat.id}>
                            <h4>{flat.streetName}</h4>
                            <p>BLK {flat.blockNumber}</p>
                            <p>{flat.flatType}</p>
                            <button onClick={() => handleRemove(flat)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ComparePricing;


