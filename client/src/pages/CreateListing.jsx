import Header from "@/components/Header.jsx";

export const CreateListing = () => {
    return (
        <div>
            <Header/>
            <form className={"font-extrabold"}>
                <div className={'text-4xl text-center my-8'}>
                    Create a Listing
                </div>
                <div className={"flex flex-col sm:flex-row items-center justify-center mt-8 gap-4"}>
                    <div className={"flex flex-col items-center justify-center gap-4 w-[32rem]"}>
                        <input type={"text"} placeholder={"Name"} className={"rounded-lg h-12 p-2 w-full"}
                               maxLength={62}
                               id={'name'}
                               minLength={10} required/>
                        <textarea
                            id={'description'}
                            placeholder={"Description"} className={"rounded-lg h-32 p-2 w-full"} required/>
                        <input
                            id={'address'}
                            type={"text"} placeholder={"Address"} className={"rounded-lg h-12 p-2 w-full"} required/>
                        <div className={'flex items-center gap-4 w-full text-left'}>
                            <label>
                                <input className={'mr-1'} type={"checkbox"} id={'sell'}/>
                                <span>Sell</span>
                            </label>
                            <label>
                                <input className={'mr-1'} type={"checkbox"} id={'rent'}/>
                                <span>Rent</span>
                            </label>
                            <label>
                                <input className={'mr-1'} type={"checkbox"} id={'parking'}/>
                                <span>Parking Spot</span>
                            </label>
                            <label>
                                <input className={'mr-1'} type={"checkbox"} id={'furnished'}/>
                                <span>Furnished</span>
                            </label>
                            <label>
                                <input className={'mr-1'} type={"checkbox"} id={'offer'}/>
                                <span>Offer</span>
                            </label>
                        </div>
                        <div className={'flex flex-row items-center w-full text-left gap-4'}>
                            <div>
                                <input id={'bedrooms'} type={"number"} min={'0'} max={"10"}
                                       className={"rounded-lg w-16 mr-2 h-8 p-2"}/>
                                <span>Beds</span>
                            </div>
                            <div>
                                <input id={'bathrooms'} type={"number"} min={'0'} max={"10"}
                                       className={"rounded-lg w-16 mr-2 h-8 p-2"}/>
                                <span>Baths</span>
                            </div>
                        </div>
                        <div className={'flex flex-col w-full justify-center'}>
                            <div className={'mb-4'}>
                                <input id={'regularPrice'} type={"number"} min={'0'} max={"10"}
                                       className={"rounded-lg w-24 mr-2 h-8 p-2"}/>
                                <span>Regular price</span>
                                <span>($/Month)</span>
                            </div>
                            <div>
                                <input id={'discountPrice'} type={"number"} min={'0'} max={"10"}
                                       className={"rounded-lg w-24 mr-2 h-8 p-2"}/>
                                <span>Discounted price</span>
                                <span>($/Month)</span>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col w-[32rem] justify-center gap-4'}>
                        <span>Images: The first image will be the cover(max 6).</span>
                        <input id={'images'} type={"file"} multiple={true} accept={'image/*'}/>
                        <button
                            className={'font-extrabold text-white rounded-lg p-2 max-w-lg w-96 uppercase bg-cyan-700 hover:bg-cyan-900'}>Upload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
