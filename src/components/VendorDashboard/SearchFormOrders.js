import React from 'react';
import {connect} from "react-redux";
import {SetOrderFilters} from "../../redux/filters/filters-actions";
import {createStructuredSelector} from "reselect";
import {select_order_filters} from "../../redux/filters/filters-selectors";

    const SearchFormOrders = ({ SetOrderFilters,order_filters }) => {

        const handleDateChange = (e) => {
            SetOrderFilters(
                {
                    date: e.target.value,
                });
        }
        const clearFilters = () => {
            SetOrderFilters(
                {
                    date: '',
                    status :'all',
                    customer :'',
                    orderId:''
                });
        }

        return (
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <input type="date" className="form-control" placeholder="Filter by Date"
                       style={{maxWidth: "206px", marginRight: "10px"}}
                       value={order_filters.date}
                onChange={handleDateChange}/>

                <input type="text" className="form-control" placeholder="Filter by customer"
                       value={order_filters.customer}
                       style={{maxWidth: "206px", marginRight: "10px"}}
                       onChange={(event) =>SetOrderFilters({customer : event.target.value})}/>
                <select className="form-control form-control-sm"
                        style={{height: "38px",width :"200px", marginRight :"10px"}}
                        onChange={(event) => {SetOrderFilters({status : event.target.value})}}>
                    <option value="all">All</option>
                    <option key="pending" value='pending'>Pending</option>
                    <option key="processing" value='processing'>Processing</option>
                    <option key="completed" value='completed'>Completed</option>
                    <option key="canceled" value='canceled'>Canceled</option>
                </select>
                <input type="text" className="form-control" placeholder="Search order" style={{maxWidth: "206px", marginRight: "10px"}}
                       onChange={(event) =>SetOrderFilters({orderId : event.target.value})}
                       value={order_filters.orderId}/>
                <button type="submit" className="btn btn-dark mb-2" style={{marginRight: "10px"}} onClick={clearFilters}>Clear Filter</button>
            </div>
        </div>
    );
}

const mapDispathtoProps = dispatch => ({
    SetOrderFilters :filters => dispatch(SetOrderFilters(filters)),
});
const mapStatetoProps = createStructuredSelector({
    order_filters : select_order_filters
});


export default connect(mapStatetoProps, mapDispathtoProps)(SearchFormOrders);