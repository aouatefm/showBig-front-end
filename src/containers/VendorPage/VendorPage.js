import React, {useEffect, useState} from 'react';
import "./VendorPage.css";
import VendorGrid from "../../components/VendorGrid/VendorGrid";
import VendorService from "../../services/VendorService";
import SearchInput from "../../components/SearchInput/SearchInput";
import {createStructuredSelector} from "reselect";
import {
    selectSearchBarKeywords,

} from "../../redux/filters/filters-selectors";
import {connect} from "react-redux";

const useVendors = () => {
    const [vendors, setVendors] = useState([]);
    useEffect(async () => {
        const newVendors = await VendorService.getVendorList()
        setVendors(newVendors);
    }, [])
    return vendors
}
const VendorPage = ({Keywords}) => {
    const vendors = useVendors()


    const keywordsMatched = (item) => {
        const formattedKeywords = Keywords.trim().replace(/\s/g, '').toLowerCase();
        if (formattedKeywords.length === 0) return true;
        const {name, address} = item;
        const formattedName = name.toLowerCase();
        const formattedAddress = address.toLowerCase();
        return formattedName.includes(formattedKeywords) || formattedAddress.includes(formattedKeywords);

    }


    const applyFiltersCatsTerm = (items) => {
        let itemsToDisplay = items.filter
        (
            item => keywordsMatched(item)
        )
        return itemsToDisplay;
    }
    return (
        <div>
            {
                vendors &&


                <>
                    <div className="container">
                        <SearchInput placeholder="Search by store name or store address .."/>
                    </div>
                    {vendors.length != 0 ?
                        <VendorGrid vendors={applyFiltersCatsTerm(vendors)}/>
                        :
                        <h4 style={{color: 'red', textAlign: 'center', margin: '35px'}}> Sorry ! No Store Found</h4>
                    }
                </>


            }
        </div>
    );
}

const mapStatetoProps = createStructuredSelector({
    Keywords: selectSearchBarKeywords,

});

export default connect(mapStatetoProps)(VendorPage);