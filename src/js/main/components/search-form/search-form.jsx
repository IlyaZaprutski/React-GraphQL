import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './search-form.scss';

export default class SearchForm extends React.PureComponent {
    static propTypes = {
        onClickSearchBtn: PropTypes.func.isRequired,
        title: PropTypes.string,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        title: 'Github Browser',
        classNames: '',
    };

    state = {
        searchString: '',
    };

    onChangeSearchString = (e, val) => {
        this.setState({ searchString: val });
    };

    onClickSearchBtn = () => {
        this.props.onClickSearchBtn(this.state.searchString);
    };

    render() {
        const { title, classNames } = this.props;
        const { searchString } = this.state;

        const searchFormClassNames = classnames('search-form', classNames);

        return (
            <div className={searchFormClassNames}>
                <Paper className="search-form__paper-container" zDepth={3}>
                    <h1 className="search-form__title">{title}</h1>
                    <TextField
                        className="search-form__search-input"
                        hintText="Enter github user name"
                        floatingLabelText="Search"
                        value={searchString}
                        onChange={this.onChangeSearchString}
                    />

                    <RaisedButton
                        className="search-form__search-btn"
                        label="Search"
                        primary
                        onClick={this.onClickSearchBtn}
                    />
                </Paper>
            </div>
        );
    }
}
