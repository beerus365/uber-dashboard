export function Header() {
    return(
        <header className="flex justify-center">
            <div className="w-1/2 flex flex-row justify-center items-center gap-12 rounded-4xl border-2 border-white py-2"> 
                <h1 className="text-3xl font-extrabold">Uber</h1>
                {/*change icons*/}
                <h1 className="text-3xl font-extrabold">Overview</h1> 
                <h1 className="text-3xl font-extrabold">Cancel</h1>
                <h1 className="text-3xl font-extrabold">Wait </h1>
            </div>
        </header>

    )
}