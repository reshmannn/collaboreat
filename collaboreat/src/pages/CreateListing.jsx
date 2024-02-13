import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <h2 className="text-slate-700">
            What type of collaboration are you interested in?
          </h2>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="reviews" className="w-5" />
              <span> Reviews</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sc" className="w-5" />
              <span> Sponsored Content</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="giveaways" className="w-5" />
              <span> Giveaways</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="events" className="w-5" />
              <span> Events</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="regularprice"
              min="1"
              max="100"
              required
              className="p-3 border border-x-gray-300 rounded-lg"
            />
            <p> Regular Price</p>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
