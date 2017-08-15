import React, { Component } from "react";
import { connect } from "react-redux";
import { selectOption } from "../actions/index";
import { bindActionCreators } from "redux";

class Dashboard extends Component {

    renderList() {
        return this.props.options.map(option => {
            return (
                <li
                    key={option}
                    onClick={() => this.props.selectOption(option)}
                    className="list-group-item"
                >
                    {option}
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    // inside of BookList
    return {
        options: state.options
    };
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
    // Whenever selectBook is called, the result shoudl be passed
    // to all of our reducers
    return bindActionCreators({ selectOption: selectOption }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
