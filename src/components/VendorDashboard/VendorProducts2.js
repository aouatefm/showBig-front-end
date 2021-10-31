import React, {Component} from 'react';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {select_v_products_filters, selectSearchBarKeywords} from "../../redux/filters/filters-selectors";
import {connect} from "react-redux";

class VendorProducts2 extends Component {
    constructor() {
        super();
        this.state = {
            data: "",
            filtered: []
        };
    }
    componentDidMount() {
        this.setState({data :this.props.prods })
    }
    _filterColumn = (columnId, value) => {
        const newfilter = {
            id: columnId,
            value
        };
        const filtersWhithoutNew = this.state.filtered.filter(
            (item) => item.id !== columnId
        );
        this.setState({
            filtered: [...filtersWhithoutNew, newfilter]
        });
    };
    _clearAllFilters = () => {
        this.setState({ status: "", filtered: [] });
        this.search.value = this.status.value = "";
    };

    render() {
        const { data } = this.state;

        return (
            <div>
                <input
                    ref={(search) => {
                        this.search = search;
                    }}
                    type="search"
                    placeholder="Search Name"
                    onKeyUp={(event) =>
                        this._filterColumn("Name", event.target.value)
                    }
                />
                <button onClick={this._clearAllFilters}>
                    Clear All filters using setState
                </button>
                {/*<ReactTable*/}
                {/*    data={data}*/}
                {/*    filtered={this.state.filtered}*/}
                {/*    columns={[*/}
                {/*        {*/}
                {/*            Header: "Name",*/}
                {/*            id: "name",*/}
                {/*            accessor: (data) => data.name,*/}
                {/*            filterMethod: this._nameFilter*/}
                {/*        },*/}

                {/*    ]}*/}
                {/*    defaultPageSize={10}*/}
                {/*    className="-striped -highlight"*/}
                {/*/>*/}
                <br />

            </div>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    Keywords:  selectSearchBarKeywords,
    v_products_filters : select_v_products_filters
});
export default connect(mapStateToProps)(VendorProducts2);
