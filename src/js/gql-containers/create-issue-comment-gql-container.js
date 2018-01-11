import { graphql } from 'react-apollo';

import CreateComment from 'components/create-comment/create-comment';

import { AddIssueComment } from 'mutations/comment-mutations';
import { GetIssueInfo } from 'queries/issue-queries';

const mapDataToProps = ({ mutate, ownProps }) => {
    const a = 3;
    return {
        onCreateComment: (issueId, commentText) =>
            mutate({
                variables: { commentText, issueId },
                refetchQueries: [
                    {
                        query: GetIssueInfo,
                        variables: {
                            issueId,
                        },
                    },
                ],
            }),
        ...ownProps,
    };
};

export default graphql(AddIssueComment, {
    props: mapDataToProps,
})(CreateComment);
