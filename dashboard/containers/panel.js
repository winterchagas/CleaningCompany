import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Panel extends Component {
    render() {
        return (
            <div>
                {this.props.cust}
                {this.props.house}
                {this.props.contract}
                {this.props.service}
                {this.props.activeOption}
            </div>
        );
    }
}

function mapStateToProps({activeOption}) {
    return {activeOption}
}

//
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ selectOption: selectOption }, dispatch);
// }

export default connect(mapStateToProps)(Panel);
