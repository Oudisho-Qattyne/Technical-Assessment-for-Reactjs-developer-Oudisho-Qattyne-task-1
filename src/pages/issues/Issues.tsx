import { useEffect, useState } from "react"
import { GitHubSpinner } from "../../components/GithubSpinner"
import Search from "../../components/Search"
import { useApi } from "../../hooks/useApi"
import { FaRegComment } from "react-icons/fa6";
import { LuCircleDot, LuCircleCheck, LuCircleSlash } from "react-icons/lu";
import { Link } from "react-router"
import Select from "../../components/input/Select"
import TimeAgo from "../../components/TimeAgo"
import Pagination from "../../components/Pagination"
import ErrorComponent from "../../components/ErrorComponent"

interface IssueState {
    id: number,
    item: string
}

interface Label {
    name: string;
    color: string;
}

interface Issue {
    number: number;
    title: string;
    state: string;
    labels: Label[];
    user: {
        login: string;
    };
    created_at: string;
    comments: number;
}

const Issues = () => {
    const issues_state: IssueState[] = [
        {
            id: 1,
            item: "all",
        },
        {
            id: 2,
            item: "open",
        },
        {
            id: 3,
            item: "closed",
        },
    ]

    const [state, setState] = useState<IssueState>(issues_state[0])
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const { data: issues, loading: loadingIssues, error: issuesError, get: getIssues, linkHeader: issueHeaders } = useApi("https://api.github.com/repos/facebook/react/issues");
    const { data: repoInfo, loading: loadingRepoInfo, get: getRepoInfo } = useApi("https://api.github.com/repos/facebook/react");

    useEffect(() => {
        getIssues("", { state: state.item, per_page: 33, page: page })
        getRepoInfo()
    }, [state, page])

    return (
        <div className="relative w-full ">
            <div className="relative w-full p-5 lg:px-40 md:px-5">
                <Search value={search} onChange={setSearch} doSearch={() =>
                    getIssues("https://api.github.com/repos/facebook/react/issues", { state: state.item, q: search })
                } />
                {
                    issuesError ?
                        <ErrorComponent errorMessage="Someting Went Wrong" onRetry={() => getIssues("", { state: state.item, per_page: 33, page: page })} />
                        :
                        loadingIssues ?
                            <GitHubSpinner />
                            :
                            <>
                                <div className="relative w-full border border-custom-gray rounded-md overflow-hidden mt-3">
                                    <div className="relative w-full flex flex-row justify-between items-center bg-leight dark:bg-dark-foreground border border-custom-gray-border p-3">
                                        {
                                            loadingRepoInfo ?
                                                <></>
                                                :
                                                <div className="relative gap-2 flex flex-row">
                                                    <div className="relative flex flex-row gap-1 dark:hover:bg-custom-gray-hover hover:bg-leight-foreground rounded-md p-1 duration-150 ">
                                                        <p className="relative p-1 font-bold text-xs">Open</p>
                                                        <p className="relative p-1 font-bold text-xs text-white bg-custom-gray-border dark:bg-custom-gray rounded-full">{repoInfo.open_issues_count}</p>
                                                    </div>
                                                    <div className="relative flex flex-row gap-1 dark:hover:bg-custom-gray-hover hover:bg-leight-foreground rounded-md p-1 duration-150 ">
                                                        <p className="relative p-1 font-bold text-xs">Closed</p>
                                                        <p className="relative p-1 font-bold text-xs text-white bg-custom-gray-border dark:bg-custom-gray rounded-full">{repoInfo.closed}</p>
                                                    </div>
                                                </div>
                                        }
                                        <Select
                                            value={state}
                                            data={issues_state}
                                            onChange={(state) => {
                                                setPage(1)
                                                setState(state)
                                            }}
                                            placeholder="state" />
                                    </div>
                                    <div className="realative w-full divide-y divide-custom-gray-border ">
                                        {
                                            issues.map((issue: Issue) =>
                                                <div className="relative w-full flex flex-row p-3  dark:hover:bg-custom-gray-hover hover:bg-leight duration-150 " >
                                                    <div className="relative flex justify-center items-center ">
                                                        {
                                                            issue.state == "open" ?
                                                                <LuCircleDot className="text-custom-green text-xl" />
                                                                :
                                                                issue.state == 'closed'
                                                                    ?
                                                                    <LuCircleCheck className="text-custom-purple text-xl" />
                                                                    :
                                                                    <LuCircleSlash className="text-secondary text-xl" />

                                                        }
                                                    </div>
                                                    <div className="relative px-2 w-[80%] gap-1">

                                                        <div className="relative  flex flex-row flex-wrap gap-1">
                                                            <Link className="relative font-bold hover:text-blue-700 hover:underline hover:cursor-pointer duration-150" to={`/${issue.number}`}>
                                                                {issue.title}
                                                            </Link>
                                                            {issue.labels.map((label: Label) =>
                                                                <span className="relative flex justify-center items-center w-fit h-fit rounded-full overflow-hidden p-1 py-0.5" style={{ borderWidth: 1, borderColor: `#${label.color}` }}>
                                                                    <div className="absolute w-full h-full opacity-15" style={{ background: `#${label.color}` }} />
                                                                    <p className="relative text-xs text-current/5 whitespace-nowrap font-bold " style={{ color: `#${label.color}` }}>
                                                                        {label.name}
                                                                    </p>
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="relative text-xs text-secondary pt-1">
                                                            #{issue.number} . {issue.user.login} . <span> <TimeAgo date={issue.created_at} /></span>
                                                        </p>
                                                    </div>
                                                    {
                                                        issue.comments > 0 &&
                                                        <p className="relative text-xs text-secondary flex flex-row justify-center items-center gap-1">
                                                            <FaRegComment /> {issue.comments}
                                                        </p>
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>
                                <Pagination links={issueHeaders?.link ? issueHeaders.link.toString() : ""} pageNumber={page} onSelect={setPage} />

                            </>
                }

            </div>

        </div>
    )
}

export default Issues