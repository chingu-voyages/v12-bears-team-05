import React from "react";
import TopBar from "../../components/TopBar";
import { connect } from "react-redux";
import { compose } from "redux";

const ConnectedTopBar = ({}) => {
  return <TopBar />;
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ConnectedTopBar);
