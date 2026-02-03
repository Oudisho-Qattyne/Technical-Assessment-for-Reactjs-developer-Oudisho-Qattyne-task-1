import { useNavigate, useParams } from "react-router"
import { useApi } from "../../hooks/useApi";
import { useEffect } from "react";
import { GitHubSpinner } from "../../components/GithubSpinner";
import { FaCodeFork } from "react-icons/fa6";
import FormattedText from "../../components/FormattedText";
import Event from "../../components/TimelineEvents/Event";
import { FaArrowLeft } from "react-icons/fa"
import { LuCircleCheck } from "react-icons/lu";
import ErrorComponent from "../../components/ErrorComponent";

const Issue = () => {
    const { id } = useParams()
    const { data: issue, loading: loadingIssue, error: issueError, get: getIssue } = useApi();
    const { data: issuTimeLine, loading: loadingTimeLineIssue, error: issueTimeLineError, get: getIssueTimeLine } = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        getIssue(`https://api.github.com/repos/facebook/react/issues/${id}`)
        getIssueTimeLine(`https://api.github.com/repos/facebook/react/issues/${id}/timeline`)
    }, [id]) // Added id to dependency array

    return (
        <div className="relative w-full">
            {
                loadingIssue
                    ? <GitHubSpinner />
                    : issueError
                        ? <ErrorComponent
                            errorMessage="Something Went Wrong"
                            onRetry={() => { getIssue(`https://api.github.com/repos/facebook/react/issues/${id}`) }}
                        />
                        : <div className="relative w-full p-4 sm:p-5 lg:px-40 md:px-5 flex flex-col ">
                            <div className="relative w-full flex flex-row gap-3 p-4">
                                <FaArrowLeft
                                    className="relative cursor-pointer text-2xl sm:text-3xl top-1"
                                    onClick={() => navigate(-1)}
                                />
                                <div className="relative flex flex-col gap-4">
                                    <div className="relative w-full flex flex-row flex-wrap gap-2 justify-start items-center">
                                        <h1 className="relative text-xl sm:text-2xl lg:text-3xl wrap-break-words">{issue.title}</h1>
                                        <h1 className="relative text-xl sm:text-2xl lg:text-3xl text-secondary">#{id}</h1>
                                    </div>

                                    <div className={`relative rounded-full w-fit ${issue.state == "open" ? "bg-custom-green" : "bg-custom-purple"} py-1 px-3 flex flex-row items-center gap-2`}>
                                        {
                                            issue.state == "open"
                                                ? <FaCodeFork className="relative text-white" />
                                                : <LuCircleCheck className="relative text-white" />
                                        }
                                        {issue.state}
                                    </div>
                                </div>
                            </div>

                            <hr className="relative w-full text-custom-gray-border" />

                            <div className="relative w-full flex flex-col sm:flex-row pt-4 gap-4">
                                {/* Avatar - fixed width on mobile, auto on larger screens */}
                                <div className="shrink-0">
                                    <img
                                        src={issue.user?.avatar_url}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-custom-gray"
                                        alt={issue.user?.login}
                                    />
                                </div>

                                {/* Comment container - full width on mobile, flexible on larger screens */}
                                <div className="relative w-full sm:flex-1 min-w-0"> {/* min-w-0 is crucial for text wrapping */}
                                    <div className="relative border border-custom-gray-border rounded-lg overflow-hidden">
                                        {/* Comment header */}
                                        <div className="relative bg-leight dark:bg-dark-foreground border-b border-custom-gray-border px-3 py-2">
                                            <p className="relative font-medium wrap-break-words">
                                                {issue.user?.login}
                                            </p>
                                        </div>

                                        {/* Comment body */}
                                        <div className="relative p-4 sm:p-5">
                                            <FormattedText
                                                className="relative wrap-break-words overflow-wrap-anywhere hyphens-auto"
                                                text={issue.body}
                                            />
                                        </div>
                                    </div>

                                    {/* Timeline events */}
                                    {
                                        loadingTimeLineIssue
                                            ? <div className="relative mt-4">
                                                <p className="text-center py-4">Loading timeline...</p>
                                            </div>
                                            : issueTimeLineError
                                                ? <ErrorComponent
                                                    errorMessage="Failed to load timeline"
                                                    onRetry={() => getIssueTimeLine(`https://api.github.com/repos/facebook/react/issues/${id}/timeline`)}
                                                />
                                                : <div className="relative mt-4">
                                                    {
                                                        issuTimeLine?.map((event: any, index: number) =>
                                                            <Event
                                                                key={event.id || index}
                                                                {...event}
                                                                isFirst={index == 0}
                                                                isLast={index == issuTimeLine.length - 1}
                                                            />
                                                        )
                                                    }
                                                </div>
                                    }
                                </div>
                            </div>
                        </div>
            }
        </div>
    )
}

export default Issue