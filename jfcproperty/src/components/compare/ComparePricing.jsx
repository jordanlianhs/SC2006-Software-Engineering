import GlobalFilterCompare from "../common/GlobalFilterForCompare";

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

export default comparingPrices;
