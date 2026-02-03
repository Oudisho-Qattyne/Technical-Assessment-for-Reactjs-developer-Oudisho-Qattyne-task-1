import { FaComment } from "react-icons/fa";
import FormattedText from "../FormattedText";
import TimeAgo from "../TimeAgo";

interface CommentProps {
    user: {
        avatar_url: string;
        login: string;
    };
    created_at: string;
    body: string;
    isFirst: boolean;
    isLast: boolean;
}

const Comment = (event: CommentProps) => {
    return (
        <div className="relative flex w-full min-h-16">
            <div className="relative flex flex-col items-center w-8 sm:w-10 ">
                {!event.isFirst && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-1/2 bg-custom-gray-border" />
                )}

                <div className="relative z-10 w-7 h-7 bg-custom-gray-border rounded-full flex justify-center items-center" >
                    <FaComment className="relative text-white text-xs" />
                </div>

                {!event.isLast && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-1/2 bg-custom-gray-border" />
                )}
            </div>

            <div className="relative flex-1 min-w-0 pb-5 ml-3 sm:ml-4">
                <div className="relative w-full flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                    <img
                        src={event.user.avatar_url}
                        className="hidden sm:block w-6 h-6 rounded-full bg-custom-gray-border "
                        alt={event.user.login}
                    />

                    <div className="relative w-full border border-custom-gray-border rounded-lg overflow-hidden">
                        <div className="relative flex flex-col sm:flex-row sm:items-center flex-wrap gap-1 sm:gap-2 w-full bg-leight dark:bg-dark-foreground border-b border-custom-gray-border px-3 py-2">
                            <div className="flex items-center gap-2 sm:hidden">
                                <img
                                    src={event.user.avatar_url}
                                    className="w-5 h-5 rounded-full bg-custom-gray-border"
                                    alt={event.user.login}
                                />
                                <p className="relative font-medium">{event.user.login}</p>
                            </div>

                            <p className="relative font-medium hidden sm:block">{event.user.login}</p>

                            <TimeAgo
                                date={event.created_at}
                                className="text-secondary text-xs sm:text-sm"
                            />
                        </div>

                        <div className="relative p-3 sm:p-4 md:p-5 min-w-0">
                            <FormattedText
                                text={event.body}
                                className="wrap-break-words overflow-wrap-anywhere hyphens-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;