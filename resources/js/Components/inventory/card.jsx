export default function Card({
    title,
    increase,
    increasePostfix = '',
    description,
    Icon,
    design,
}) {
    return (
        <div
            className={`flex-1 rounded-xl bg-white p-4 shadow dark:bg-neutral-800 ${design}`}
        >
            <div className="flex items-center justify-between pb-3">
                <h3 className="font-semibold">{title}</h3>
                {Icon}
            </div>
            <div>
                <p className="pb-1.5 text-3xl font-bold">asd</p>
                <p className="text-sm text-gray-400">
                    {increase && (
                        <span className="text-green-500">
                            +{increase}
                            {increasePostfix}
                        </span>
                    )}{' '}
                    {description}
                </p>
            </div>
        </div>
    );
}
