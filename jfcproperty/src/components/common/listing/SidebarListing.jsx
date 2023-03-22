import Categorie from "./Categorie";
import FeaturedListings from "./FeaturedListings";
import FeatureProperties from "./FeatureProperties";
import FilteringItem from "./FilteringItem";

const SidebarListing = () => {
    return (
        <div className="sidebar_listing_grid1">
            


            <div className="terms_condition_widget">
                <h4 className="title">Most Viewed Locations</h4>
                <div className="widget_list">
                    <ul className="list_details">
                        <Categorie />
                    </ul>
                </div>
            </div>
            {/* End .Categories Property */}

            <div className="sidebar_feature_listing">
                <h4 className="title">Featured Listings</h4>
                <FeaturedListings />
            </div>
            {/* End .Recently Viewed */}
        </div>
    );
};

export default SidebarListing;
