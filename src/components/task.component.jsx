export default function Task() {
    return (
        <div className="relative bg-slate-200 basis-1/5 rounded-md z-1 h-fit p-4 space-y-2">
            <div className="rounded-full bg-white h-6 w-6 absolute -top-2 -left-2"></div>
            <div className="w-full h-fit space-y-2">
                <h2 className="text-3xl">Title</h2>
                <p>Description</p>
            </div>
        </div>
    );
}