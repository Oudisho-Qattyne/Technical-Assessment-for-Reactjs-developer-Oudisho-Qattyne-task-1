import { FaTag } from "react-icons/fa";

const Labeled = (event: any) => {

    console.log(event.actor.avatar_url);

    return (
        <div className="relative flex w-full min-h-16">
            <div className="relative flex flex-col items-center w-10">
                {!event.isFirst && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-1/2 bg-custom-gray-border" />
                )}

                <div className="relative z-10 w-7 h-7 bg-custom-gray-border rounded-full flex justify-center items-center" >
                    <FaTag className="relative text-white text-xs" />
                </div>

                {!event.isLast && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-1/2 bg-custom-gray-border" />
                )}
            </div>

            <div className="flex-1 ml-4 py-1  pb-5">
                <div className="flex items-start gap-3">
                    <img
                        src={event.actor.avatar_url}
                        className="w-6 h-6 rounded-full bg-custom-gray-border"
                        alt="User"
                    />
                    <div className="relative flex flex-row flex-wrap gap-1">
                        <span className="text-sm  font-bold">{event.actor.login} </span>
                        <span className="text-sm text-custom-gray-border">added the</span>
                        <span className="relative flex justify-center items-center w-fit h-fit rounded-full overflow-hidden p-1 py-0.5" style={{ borderWidth: 1, borderColor: `#${event.label.color}` }}>
                            <div className="absolute w-full h-full opacity-15" style={{ background: `#${event.label.color}` }} />
                            <p className="relative text-xs text-current/5 whitespace-nowrap font-bold " style={{ color: `#${event.label.color}` }}>
                                {event.label.name}
                            </p>
                        </span>
                        <span className="text-sm text-custom-gray-border">label</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Labeled