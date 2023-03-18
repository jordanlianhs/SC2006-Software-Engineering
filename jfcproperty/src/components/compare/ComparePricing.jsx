import { useState, useEffect } from "react";
import getResaleFlats from "../../data/comparePricing";

const ComparePricing = () => {
    const [flats, setFlats] = useState([]);

    useEffect(() => {
        const fetchFlats = async () => {
            const data = await getResaleFlats();
            setFlats(data);
        };
        fetchFlats();
    }, []);
    return (
        <>
        {flats.map((flat) => (
            <li className="list-inline-item" key={flat.id}>
            <ul className="mc_child_list two text-center">
                <li>
                <div className="membership_header">
                    <div className="thumb">
                    <a href="#">
                        <span className="flaticon-close"></span>
                    </a>
                    <img className="img-fluid w100" src={flat.img} alt="1.jpg" />
                    <div className="price">
                        ${flat.price}
                    </div>
                    </div>
                    <div className="flat_type">
                    <h4>{flat.streetName}</h4>
                    <p>{flat.flatType}</p>
                    </div>
                </div>
                </li>
            </ul>
            </li>
        ))}
        </>
    );
};

export default ComparePricing;


/*import GlobalFilterCompare from "../common/GlobalFilterForCompare";

const comparingPrices = ({ className = "" }) => {
    return (
        <div className={`home_adv_srch_opt ${className}`}>
            

            <div className="tab-content home1_adsrchfrm" id="pills-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                >
                    <GlobalFilterCompare />
                </div>
            </div>
        </div>
    );
};

export default comparingPrices;*/
