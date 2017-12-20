import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import './search-form.scss';

const ESC_KEY_CODE = 27;

export default class SearchForm extends React.PureComponent {
    static propTypes = {
        searchString: PropTypes.string.isRequired,
        onChangeSearchString: PropTypes.func.isRequired,
        title: PropTypes.string,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        title: 'Github Browser',
        classNames: '',
    };

    onChangeSearchString = (e, val) => {
        this.props.onChangeSearchString(val);
    };

    onHandleESCBtn = (e) => {
        if (e.keyCode === ESC_KEY_CODE) {
            this.props.onChangeSearchString('');
        }
    };

    render() {
        const { title, classNames, searchString } = this.props;

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
                        onKeyDown={this.onHandleESCBtn}
                        fullWidth
                    />
                </Paper>
            </div>
        );
    }
}
